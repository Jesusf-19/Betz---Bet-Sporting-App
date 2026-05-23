from fastapi import FastAPI
from app.data import matches, odds

app = FastAPI(title="Betz API")


@app.get("/")
def root():
    return {"message": "Welcome to the Betz API"}


@app.get("/matches")
def get_matches():
    return matches


@app.get("/odds")
def get_odds():
    return odds