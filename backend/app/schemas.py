from pydantic import BaseModel


class Match(BaseModel):
    id: int
    home_team: str
    away_team: str
    match_date: str


class Odds(BaseModel):
    match_id: int
    home_odds: float
    draw_odds: float
    away_odds: float

class UserCreate(BaseModel):
    email: str


class UserResponse(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True