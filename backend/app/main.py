from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data import matches, odds

app = FastAPI(title="Betz API")

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


@app.get("/")
def root():
    return {"message": "Welcome to the Betz API"}


@app.get("/matches")
def get_matches():
    return matches


@app.get("/odds")
def get_odds():
    return odds