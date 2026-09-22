import sqlite3
import json
from datetime import datetime
from typing import Dict, Any, List, Optional
from backend.config import DB_PATH

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS exercise_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id TEXT NOT NULL,
                module_id TEXT NOT NULL,
                exercise_id TEXT NOT NULL,
                is_correct INTEGER NOT NULL,
                user_answer TEXT,
                hints_used INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS exam_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                course_id TEXT NOT NULL,
                score REAL NOT NULL,
                max_score REAL NOT NULL,
                percentage REAL NOT NULL,
                duration_seconds INTEGER NOT NULL,
                breakdown_json TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS notes_changelog (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                version TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                release_date TEXT NOT NULL
            )
        """)
        conn.commit()

def record_exercise_attempt(course_id: str, module_id: str, exercise_id: str, is_correct: bool, user_answer: str, hints_used: int = 0):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO exercise_history (course_id, module_id, exercise_id, is_correct, user_answer, hints_used)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (course_id, module_id, exercise_id, 1 if is_correct else 0, user_answer, hints_used))
        conn.commit()

def record_exam_result(course_id: str, score: float, max_score: float, duration_seconds: int, breakdown: Dict[str, Any]) -> int:
    percentage = (score / max_score * 100.0) if max_score > 0 else 0.0
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO exam_results (course_id, score, max_score, percentage, duration_seconds, breakdown_json)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (course_id, score, max_score, percentage, duration_seconds, json.dumps(breakdown)))
        conn.commit()
        return cursor.lastrowid

def get_user_stats(course_id: Optional[str] = None) -> Dict[str, Any]:
    with get_connection() as conn:
        cursor = conn.cursor()
        if course_id:
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_attempts,
                    SUM(is_correct) as correct_attempts,
                    COUNT(DISTINCT exercise_id) as unique_exercises_completed
                FROM exercise_history
                WHERE course_id = ?
            """, (course_id,))
            ex_stat = dict(cursor.fetchone() or {})
            
            cursor.execute("""
                SELECT id, score, max_score, percentage, duration_seconds, created_at
                FROM exam_results
                WHERE course_id = ?
                ORDER BY created_at DESC
                LIMIT 10
            """, (course_id,))
            exams = [dict(r) for r in cursor.fetchall()]
        else:
            cursor.execute("""
                SELECT 
                    course_id,
                    COUNT(*) as total_attempts,
                    SUM(is_correct) as correct_attempts,
                    COUNT(DISTINCT exercise_id) as unique_exercises_completed
                FROM exercise_history
                GROUP BY course_id
            """)
            ex_stat = [dict(r) for r in cursor.fetchall()]
            
            cursor.execute("""
                SELECT id, course_id, score, max_score, percentage, duration_seconds, created_at
                FROM exam_results
                ORDER BY created_at DESC
                LIMIT 15
            """)
            exams = [dict(r) for r in cursor.fetchall()]

        return {
            "exercise_stats": ex_stat,
            "recent_exams": exams
        }

def get_course_exercise_progress(course_id: str) -> Dict[str, Any]:
    """Récupère l'état d'avancement de tous les exercices résolus pour un cours donné."""
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT 
                module_id,
                exercise_id,
                user_answer,
                is_correct,
                created_at
            FROM exercise_history
            WHERE course_id = ? AND is_correct = 1
            ORDER BY id ASC
        """, (course_id,))
        rows = cursor.fetchall()
        
        progress = {}
        for r in rows:
            progress[r["exercise_id"]] = {
                "module_id": r["module_id"],
                "exercise_id": r["exercise_id"],
                "is_correct": True,
                "user_answer": r["user_answer"],
                "completed_at": r["created_at"]
            }
        return progress

