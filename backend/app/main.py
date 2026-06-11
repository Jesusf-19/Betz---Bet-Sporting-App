from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data import matches, odds
from app.database import Base, engine
from app.models import Bet, BetSelection, User, Wallet
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import BetCreate, BetResponse, UserCreate, UserResponse, WalletResponse

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

@app.post("/users/{user_id}/bets", response_model=BetResponse)
def create_bet(user_id: int, bet: BetCreate, db: Session = Depends(get_db)):
    new_bet = Bet(
        user_id=user_id,
        odds=bet.odds,
        wager=bet.wager,
        potential_win=bet.potentialWin,
        status=bet.status,
    )

    db.add(new_bet)
    db.commit()
    db.refresh(new_bet)

    for selection in bet.selections:
        new_selection = BetSelection(
            bet_id=new_bet.id,
            selection_id=selection.id,
            label=selection.label,
            odds=selection.odds,
        )
        db.add(new_selection)

    db.commit()
    db.refresh(new_bet)

    return new_bet


@app.get("/users/{user_id}/bets", response_model=list[BetResponse])
def get_bets(user_id: int, db: Session = Depends(get_db)):
    return db.query(Bet).filter(Bet.user_id == user_id).all()


@app.put("/bets/{bet_id}/status", response_model=BetResponse)
def update_bet_status(
    bet_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    bet = db.query(Bet).filter(Bet.id == bet_id).first()

    if not bet:
        raise Exception("bet not found")

    bet.status = status
    db.commit()
    db.refresh(bet)

    return bet


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