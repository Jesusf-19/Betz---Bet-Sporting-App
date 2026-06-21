# ⚽ Betz

Betz is a full-stack sports betting platform focused on UEFA Champions League football. Users can browse match odds, build parlays, manage a virtual betting wallet, track betting history, and simulate wager outcomes through an interactive dashboard.

## Overview

Betz was developed as a portfolio project to demonstrate full-stack software engineering skills using modern web technologies. The platform combines a FastAPI backend with a Next.js frontend and includes realistic sportsbook features such as parlays, wallet management, persistent user data, and bet tracking.

## Features
### Live UEFA Champions League Fixtures
- Live Champions League fixtures powered by the Football-Data.org API
- Automatic fixture updates
- Interactive match cards
### AI Betting Predictions
- AI prediction engine for every match
- Home, Draw, and Away win probabilities
- Recommended betting pick
- Confidence score for each prediction
### Betting Platform
- Single bets
- Multi-leg parlays
- Real-time potential winnings calculation
- Prevention of conflicting selections from the same match
### Wallet Management
- Virtual betting wallet
- Automatic payout calculations
- Persistent wallet balance stored in PostgreSQL
- Wallet reset functionality
### Bet History
- Persistent betting history
- Pending, Won, and Lost bet tracking
- Multi-selection ticket support
- Historical wager storage in PostgreSQL
## Technology Stack
- Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
### Backend
- FastAPI
- Python
- SQLAlchemy
- REST API
### Database
- PostgreSQL
- Docker
### External APIs
- Football-Data.org (UEFA Champions League fixtures)

## Project Architecture

                Football-Data.org API
                         │
                         ▼
                  FastAPI Backend
         ┌───────────────┴───────────────┐
         │                               │
         |                               |
    Prediction Engine                PostgreSQL Database
         │                              ├── Users
         │                              ├── Wallets
         |                              ├── Bets
    Betting Predictions                 └── Bet Selections
         │
         |
     Next.js Frontend
         │
         |
    Interactive Betting Dashboard

## Running the Project
### Clone the repository
    git clone https://github.com/Jesusf-19/Betz---Bet-Sporting-App.git
    cd Betz_Sporting_App
### Backend
    cd backend
    source .venv/bin/activate

    pip install -r requirements.txt

    uvicorn app.main:app --reload

Backend runs at:

    http://127.0.0.1:8000

### Frontend
    cd frontend

    npm install

    npm run dev

Frontend runs at:

    http://localhost:3000

### Database

Start PostgreSQL with Docker:

    docker-compose up -d

### Environment Variables

Create a .env file inside the backend/ directory:

    FOOTBALL_DATA_API_KEY=33eb6e4b0b254bb1be6279dc54491643

You can obtain a free API key from Football-Data.org.

## Current Functionality
- Live Champions League fixtures
- AI match predictions
- Simulated betting odds
- Multi-leg parlays
- Wallet persistence
- Bet history persistence
- PostgreSQL database integration
- Dockerized database
- Landing page
- Login screen
- Interactive betting dashboard

## Acknowledgements
This repository is a personal portfolio evolution of a collaborative software engineering project completed during CPSC 491 at California State University, Fullerton.

The original project was developed by:

- Elizabeth M.
- Jessica F.
- Jesus Fierro (this repository)

This version has been independently redesigned and significantly expanded with a modern full-stack architecture, persistent PostgreSQL storage, Docker integration, live football data, and an AI-powered prediction engine.