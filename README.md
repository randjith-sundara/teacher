# Teacher — Préparation Universitaire en Mathématiques

Application interactive d'apprentissage, d'entraînement et de validation pour les cours préalables universitaires :
- **MAT-0130** : Algèbre vectorielle et linéaire
- **MAT-0150** : Calcul différentiel
- **MAT-0250** : Calcul intégral et probabilités

---

## Fonctionnalités

1. **Théorie & Synthèse** : Fiches de cours synthétiques, formules clés en LaTeX haute précision (KaTeX), méthodes et pièges d'examen.
2. **Laboratoire Interactif & Visualisation** : Tracés dynamiques de tangentes, projections vectorielles 2D/3D et sommes de Riemann en temps réel sur Canvas HTML5.
3. **Entraînement Pratique pas-à-pas** : Exercices progressifs avec rétroaction immédiate grâce au moteur de calcul formel exact **SymPy**, système d'indices progressifs et démonstrations complètes.
4. **Examens Blancs Universitaires** : Épreuves chronométrées (60 min) simulant les examens réels, notation automatique sur 100 et bilan analytique personnalisé ("Prêt pour la session", "À consolider").
5. **Professeur IA Interactif** : Tuteur contextuel alimenté par Gemini pour débloquer un calcul, demander une analogie ou approfondir une démonstration.
6. **Zéro « IA Slop »** : Interface épurée, sombre, rapide et focalisée sur le travail mathématique réel.

---

## Stack Technique

- **Backend** : Python 3.14 + FastAPI + SymPy + SQLite + Pydantic + Uvicorn
- **Frontend** : React 19 + Vite 8 + Tailwind CSS v4 + KaTeX + Lucide React
- **CI/CD** : GitHub Actions (`.github/workflows/deploy.yml` via SSH `appleboy/ssh-action`) vers VPS Nginx (`teacher.rsundara.ca`) sur le port 8005.

---

## Démarrage Local

### 1. Backend
```powershell
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python -m uvicorn backend.main:app --port 8005 --reload
```

### 2. Frontend
```powershell
cd frontend
npm install
npm run dev
```

Accéder à l'application sur [http://localhost:5173](http://localhost:5173) en mode développement, ou [http://localhost:8005](http://localhost:8005) en mode production.
