from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_route():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Betz API"}


def test_get_matches():
    response = client.get("/matches")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "home_team" in data[0]
    assert "away_team" in data[0]


def test_get_odds():
    response = client.get("/odds")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "home_odds" in data[0]
    assert "draw_odds" in data[0]
    assert "away_odds" in data[0]