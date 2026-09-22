import os
import httpx
from typing import List, Dict
from backend.config import GEMINI_API_KEY

SYSTEM_PROMPT = """Tu es un professeur de mathématiques universitaire bienveillant, rigoureux et stimulant.
Tu enseignes trois cours fondamentaux préalables aux études universitaires :
1. MAT-0130 : Algèbre vectorielle et linéaire (vecteurs R2/R3, droites et plans, Gauss-Jordan, matrices, déterminants).
2. MAT-0150 : Calcul différentiel (limites, continuité, règles de dérivation, optimisation, taux liés, L'Hôpital).
3. MAT-0250 : Calcul intégral et probabilités (intégrales définies/indéfinies, techniques d'intégration, lois de probabilités).

Consignes pédagogiques impératives :
- Formate TOUTES les formules mathématiques en LaTeX : `$formule$` pour l'inline et `$$formule$$` pour les blocs display.
- Ne donne pas immédiatement la réponse brute si l'étudiant est bloqué : pose-lui une question intermédiaire ou donne-lui un premier indice conceptuel pour l'aider à raisonner par lui-même.
- Si l'étudiant te demande explicitement la solution ou l'explication complète, fournis-la avec une grande clarté étape par étape, en expliquant la logique derrière chaque manipulation.
- Sois encourageant, concis et précis. Pas de blabla inutile ("zéro slop"), va droit au but mathématique.
- Réponds toujours en français.
"""

async def chat_with_tutor(messages: List[Dict[str, str]], context: str = "") -> str:
    """Communique avec l'API Gemini pour fournir des réponses pédagogiques."""
    if not GEMINI_API_KEY:
        return "⚠️ La clé GEMINI_API_KEY n'est pas configurée. Le mode professeur IA requiert une clé valide."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"

    contents = []
    
    # Message système injecté
    sys_instruction = SYSTEM_PROMPT
    if context:
        sys_instruction += f"\n\n[CONTEXTE ACTUEL DE L'ÉTUDIANT] :\n{context}"

    formatted_contents = [
        {"role": "user", "parts": [{"text": f"[Instruction Système]\n{sys_instruction}"}]},
        {"role": "model", "parts": [{"text": "Compris. Je suis prêt à vous guider avec rigueur et clarté sur vos cours de mathématiques."}]}
    ]

    for msg in messages:
        role = "user" if msg.get("role") == "user" else "model"
        formatted_contents.append({
            "role": role,
            "parts": [{"text": msg.get("content", "")}]
        })

    payload = {
        "contents": formatted_contents,
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 2048,
        }
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code != 200:
                # Fallback to gemini-2.0-flash
                fallback_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
                resp2 = await client.post(fallback_url, json=payload)
                if resp2.status_code != 200:
                    return f"Erreur de communication avec le professeur IA ({resp.status_code}): {resp.text}"
                resp = resp2

            data = resp.json()
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "Pas de réponse générée.")
            return "Aucune réponse reçue du modèle."
    except Exception as e:
        return f"Erreur réseau lors de la communication avec le professeur : {str(e)}"
