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

class WalletResponse(BaseModel):
    id: int
    user_id: int
    balance: float

    class Config:
        from_attributes = True

class BetSelectionCreate(BaseModel):
    id: str
    label: str
    odds: float


class BetCreate(BaseModel):
    selections: list[BetSelectionCreate]
    odds: float
    wager: float
    potentialWin: float
    status: str = "Pending"


class BetSelectionResponse(BaseModel):
    id: int
    selection_id: str
    label: str
    odds: float

    class Config:
        from_attributes = True


class BetResponse(BaseModel):
    id: int
    odds: float
    wager: float
    potential_win: float
    status: str
    user_id: int
    selections: list[BetSelectionResponse]

    class Config:
        from_attributes = True