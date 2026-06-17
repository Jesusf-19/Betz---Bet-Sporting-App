from app.football_api import get_ucl_matches


TEAM_STRENGTHS = {
    "Real Madrid CF": 92,
    "Manchester City FC": 91,
    "FC Bayern München": 89,
    "Paris Saint-Germain FC": 87,
    "FC Barcelona": 88,
    "Arsenal FC": 86,
    "Liverpool FC": 86,
    "Inter Milan": 85,
    "Club Atlético de Madrid": 84,
    "Borussia Dortmund": 83,
}


def get_team_strength(team_name: str) -> int:
    return TEAM_STRENGTHS.get(team_name, 78)


def calculate_prediction(home_team: str, away_team: str):
    home_strength = get_team_strength(home_team)
    away_strength = get_team_strength(away_team)

    home_advantage = 4
    adjusted_home = home_strength + home_advantage

    total_strength = adjusted_home + away_strength

    home_probability = round((adjusted_home / total_strength) * 75)
    away_probability = round((away_strength / total_strength) * 75)
    draw_probability = 100 - home_probability - away_probability

    if home_probability >= away_probability and home_probability >= draw_probability:
      recommended_pick = f"{home_team} to Win"
      confidence_score = round(home_probability / 10, 1)
    elif away_probability >= home_probability and away_probability >= draw_probability:
      recommended_pick = f"{away_team} to Win"
      confidence_score = round(away_probability / 10, 1)
    else:
      recommended_pick = "Draw"
      confidence_score = round(draw_probability / 10, 1)

    return {
        "home_win_probability": home_probability,
        "draw_probability": draw_probability,
        "away_win_probability": away_probability,
        "recommended_pick": recommended_pick,
        "confidence_score": confidence_score,
    }


def get_ucl_predictions():
    matches = get_ucl_matches()
    predictions = []

    for match in matches:
        prediction = calculate_prediction(
            match["home_team"],
            match["away_team"],
        )

        predictions.append(
            {
                "match_id": match["id"],
                "home_team": match["home_team"],
                "away_team": match["away_team"],
                "match_date": match["match_date"],
                **prediction,
            }
        )

    return predictions