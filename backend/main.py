import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from backend.config import PORT, HOST, ENV, BASE_DIR
from backend.database import (
    init_db,
    record_exercise_attempt,
    record_exam_result,
    get_user_stats,
)
from backend.curriculum import (
    get_all_courses,
    get_course_by_id,
    get_module,
    COURSES_DATA,
)
from backend.math_engine import verify_symbolic_equivalence
from backend.tutor import chat_with_tutor

# Initialisation de la BDD SQLite
init_db()

app = FastAPI(
    title="Teacher API — Préparation Universitaire en Mathématiques",
    version="1.0.0",
    description="API pédagogique pour MAT-0130, MAT-0150 et MAT-0250",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modèles Pydantic pour les requêtes
class VerifyRequest(BaseModel):
    user_input: str
    expected_solution: str
    course_id: Optional[str] = None
    module_id: Optional[str] = None
    exercise_id: Optional[str] = None
    hints_used: int = 0

class TutorMessage(BaseModel):
    role: str
    content: str

class TutorChatRequest(BaseModel):
    messages: List[TutorMessage]
    context: Optional[str] = ""

class ExamSubmission(BaseModel):
    course_id: str
    duration_seconds: int
    answers: Dict[str, str]  # question_id -> user_answer

# --- Endpoints API ---

@app.get("/api/health")
def health_check():
    return {"status": "ok", "env": ENV}

@app.get("/api/courses")
def list_courses():
    return get_all_courses()

@app.get("/api/courses/{course_id}")
def get_course_details(course_id: str):
    course = get_course_by_id(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Cours introuvable")
    return course

@app.get("/api/courses/{course_id}/modules/{module_id}")
def get_module_details(course_id: str, module_id: str):
    module = get_module(course_id, module_id)
    if not module:
        raise HTTPException(status_code=404, detail="Module introuvable")
    return module

@app.post("/api/verify")
def verify_answer(req: VerifyRequest):
    result = verify_symbolic_equivalence(req.user_input, req.expected_solution)
    
    # Enregistrement de l'exercice si identifié
    if req.course_id and req.module_id and req.exercise_id:
        record_exercise_attempt(
            course_id=req.course_id,
            module_id=req.module_id,
            exercise_id=req.exercise_id,
            is_correct=result["correct"],
            user_answer=req.user_input,
            hints_used=req.hints_used,
        )

    return result

@app.get("/api/exam/{course_id}")
def get_exam(course_id: str):
    course = get_course_by_id(course_id)
    if not course or "exam" not in course:
        raise HTTPException(status_code=404, detail="Examen introuvable pour ce cours")
    
    exam = course["exam"]
    # Nettoyer les solutions attendues pour la transmission initiale à l'étudiant
    client_questions = []
    for q in exam["questions"]:
        client_questions.append({
            "id": q["id"],
            "points": q["points"],
            "title": q["title"],
            "question_latex": q["question_latex"],
            "input_type": q["input_type"]
        })
        
    return {
        "course_id": course_id,
        "course_title": course["title"],
        "title": exam["title"],
        "duration_minutes": exam["duration_minutes"],
        "passing_grade": exam["passing_grade"],
        "total_points": sum(q["points"] for q in exam["questions"]),
        "questions": client_questions
    }

@app.post("/api/exam/submit")
def submit_exam(sub: ExamSubmission):
    course = get_course_by_id(sub.course_id)
    if not course or "exam" not in course:
        raise HTTPException(status_code=404, detail="Examen introuvable")

    exam = course["exam"]
    total_score = 0.0
    max_score = sum(q["points"] for q in exam["questions"])
    question_results = []

    for q in exam["questions"]:
        qid = q["id"]
        user_ans = sub.answers.get(qid, "").strip()
        expected = q["expected_solution"]
        
        verification = verify_symbolic_equivalence(user_ans, expected)
        is_correct = verification["correct"]
        points_awarded = q["points"] if is_correct else 0.0
        total_score += points_awarded

        question_results.append({
            "id": qid,
            "title": q["title"],
            "question_latex": q["question_latex"],
            "user_answer": user_ans,
            "expected_solution": expected,
            "explanation": q.get("explanation", ""),
            "is_correct": is_correct,
            "points": points_awarded,
            "max_points": q["points"],
            "details": verification.get("details") or verification.get("message", "")
        })

    percentage = round((total_score / max_score * 100.0), 1) if max_score > 0 else 0.0
    passed = percentage >= exam["passing_grade"]

    # Diagnostic pédagogique
    if percentage >= 85:
        diagnostic = "Excellente maîtrise ! Vous possédez les bases requises pour démarrer votre session universitaire avec confiance."
        status_label = "Prêt pour la session"
    elif percentage >= 60:
        diagnostic = "Réussite globale, mais quelques notions clés nécessitent une consolidation avant la rentrée."
        status_label = "Admis — Révision recommandée"
    else:
        diagnostic = "Score insuffisant. Il est indispensable de reprendre les fiches de cours et les exercices guidés avant de retenter l'examen."
        status_label = "À retravailler"

    breakdown = {
        "status_label": status_label,
        "passed": passed,
        "diagnostic": diagnostic,
        "questions": question_results
    }

    exam_id = record_exam_result(
        course_id=sub.course_id,
        score=total_score,
        max_score=max_score,
        duration_seconds=sub.duration_seconds,
        breakdown=breakdown,
    )

    return {
        "exam_id": exam_id,
        "score": total_score,
        "max_score": max_score,
        "percentage": percentage,
        "passed": passed,
        "status_label": status_label,
        "diagnostic": diagnostic,
        "breakdown": question_results,
    }

@app.post("/api/tutor/chat")
async def chat_tutor(req: TutorChatRequest):
    messages_payload = [{"role": m.role, "content": m.content} for m in req.messages]
    response_text = await chat_with_tutor(messages_payload, req.context or "")
    return {"reply": response_text}

@app.get("/api/stats")
def get_stats(course_id: Optional[str] = None):
    return get_user_stats(course_id)

@app.get("/api/releases")
def get_releases():
    """Notes de version (Release Notes) systématiques."""
    return [
        {
            "version": "1.1.0",
            "date": "2026-09-22",
            "title": "Cours FOND-0100 : Remise à Niveau & Fondations (De Zéro)",
            "tag": "Nouvelle Matière & Pédagogie",
            "description": "Ajout du cours complet de remise à niveau pour les personnes reprenant les mathématiques après plusieurs années : fractions, factorisation, lois des exposants, équations du 2nd degré, droites (y=mx+b), cercle trigonométrique et logarithmes. Ajout de 2 nouveaux laboratoires visuels interactifs et adaptation du tuteur IA."
        },
        {
            "version": "1.0.0",
            "date": "2026-09-22",
            "title": "Lancement officiel de la plateforme Teacher",
            "tag": "Initial Release",
            "description": "Plateforme d'apprentissage complète couvrant MAT-0130 (Algèbre vectorielle), MAT-0150 (Calcul différentiel) et MAT-0250 (Calcul intégral et probabilités). Intègre le moteur mathématique formel SymPy, le rendu KaTeX haute précision, les examens blancs universitaires chronométrés et le tuteur IA pédagogique."
        }
    ]

# Montage des fichiers statiques du frontend Vite si le dossier 'frontend/dist' existe
frontend_dist = BASE_DIR / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/assets", StaticFiles(directory=frontend_dist / "assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Exclure les préfixes /api
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Endpoint introuvable")
        file_path = frontend_dist / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(frontend_dist / "index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host=HOST, port=PORT, reload=True)
