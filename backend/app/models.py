from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)

    wallet = relationship("Wallet", back_populates="user", uselist=False)
    bets = relationship("Bet", back_populates="user")


class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True, index=True)
    balance = Column(Float, default=5000.0)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    user = relationship("User", back_populates="wallet")


class Bet(Base):
    __tablename__ = "bets"

    id = Column(Integer, primary_key=True, index=True)
    odds = Column(Float, nullable=False)
    wager = Column(Float, nullable=False)
    potential_win = Column(Float, nullable=False)
    status = Column(String, default="Pending")

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="bets")
    selections = relationship("BetSelection", back_populates="bet")


class BetSelection(Base):
    __tablename__ = "bet_selections"

    id = Column(Integer, primary_key=True, index=True)
    selection_id = Column(String, nullable=False)
    label = Column(String, nullable=False)
    odds = Column(Float, nullable=False)

    bet_id = Column(Integer, ForeignKey("bets.id"))
    bet = relationship("Bet", back_populates="selections")