import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
PORT = int(os.getenv("PORT", "8005"))
HOST = os.getenv("HOST", "0.0.0.0")
ENV = os.getenv("ENV", "development")
DB_PATH = BASE_DIR / "teacher.db"
