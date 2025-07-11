from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import Feedback, SessionLocal, init_db

app = FastAPI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/submit")
def submit_feedback(name: str, message: str, db: Session = Depends(get_db)):
    feedback = Feedback(name=name, message=message)
    db.add(feedback)
    db.commit()
    return {"status": "success"}

@app.get("/feedbacks")
def get_feedbacks(db: Session = Depends(get_db)):
    return db.query(Feedback).all()
