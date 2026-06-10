from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data import matches, odds
from app.database import Base, engine
from app.models import User, Wallet
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import UserCreate, UserResponse, WalletResponse

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

@app.get("/users/{user_id}/wallet", response_model=WalletResponse)
def get_wallet(user_id: int, db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()

    if wallet:
        return wallet

    new_wallet = Wallet(user_id=user_id, balance=5000.0)
    db.add(new_wallet)
    db.commit()
    db.refresh(new_wallet)

    return new_wallet


@app.put("/users/{user_id}/wallet", response_model=WalletResponse)
def update_wallet(user_id: int, balance: float, db: Session = Depends(get_db)):
    wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()

    if not wallet:
        wallet = Wallet(user_id=user_id, balance=balance)
        db.add(wallet)
    else:
        wallet.balance = balance

    db.commit()
    db.refresh(wallet)

    return wallet

@app.get("/")
def root():
    return {"message": "Welcome to the Betz API"}


@app.get("/matches")
def get_matches():
    return matches


@app.get("/odds")
def get_odds():
    return odds