from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data import matches, odds
from app.database import Base, engine
from app.models import User
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import UserCreate, UserResponse

app = FastAPI(title="Betz API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return existing_user

    new_user = User(email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@app.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.get("/")
def root():
    return {"message": "Welcome to the Betz API"}


@app.get("/matches")
def get_matches():
    return matches


@app.get("/odds")
def get_odds():
    return odds