import os
import requests

from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

API_KEY = os.getenv("FOOTBALL_DATA_API_KEY")
BASE_URL = "https://api.football-data.org/v4"


def get_ucl_matches():
    if not API_KEY:
        raise HTTPException(
            status_code=500,
            detail="FOOTBALL_DATA_API_KEY is missing",
        )

    response = requests.get(
        f"{BASE_URL}/competitions/CL/matches",
        headers={"X-Auth-Token": API_KEY},
        timeout=10,
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.text,
        )

    data = response.json()

    matches = []

    for match in data.get("matches", [])[:20]:
        matches.append(
            {
                "id": match["id"],
                "home_team": match["homeTeam"]["name"],
                "away_team": match["awayTeam"]["name"],
                "match_date": match["utcDate"][:10],
            }
        )

    return matches