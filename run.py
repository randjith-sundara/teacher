import uvicorn
from backend.config import PORT, HOST

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=HOST, port=PORT)
