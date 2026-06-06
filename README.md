# Betz

Betz is a full-stack sports betting platform focused on UEFA Champions League football. Users can browse match odds, build parlays, manage a virtual betting wallet, track betting history, and simulate wager outcomes through an interactive dashboard.

## Overview

Betz was developed as a portfolio project to demonstrate full-stack software engineering skills using modern web technologies. The platform combines a FastAPI backend with a Next.js frontend and includes realistic sportsbook features such as parlays, wallet management, persistent user data, and bet tracking.

## Features

### Betting Platform

* Browse UEFA Champions League fixtures
* View simulated betting odds
* Build single bets and multi-leg parlays
* Calculate potential winnings in real time
* Prevent invalid selections from the same match

### Wallet Management

* Virtual wallet balance tracking
* Automatic payout calculation for winning bets
* Wallet persistence using local storage
* Wallet reset functionality

### Bet Tracking

* Interactive bet slip
* Bet history and ticket generation
* Pending, Won, and Lost bet statuses
* Historical wager tracking

### User Experience

* Landing page experience
* Dashboard interface
* Responsive design
* Real-time selection updates

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python

### Development Tools

* Git
* GitHub
* Vercel (planned deployment)

## Project Structure

```text
frontend/
├── app/
├── components/
│   ├── Dashboard.tsx
│   ├── LandingPage.tsx
│   └── BetSlip.tsx

backend/
├── app/
├── tests/
```

## Running the Project

### Backend

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

## Future Enhancements

* User authentication
* PostgreSQL database integration
* Live football data APIs
* Additional leagues and competitions
* User profiles and statistics
* Cloud deployment

## Acknowledgements

This project is a personal portfolio evolution of a collaborative software engineering project originally developed during CPSC 491. The application has been redesigned and expanded with additional features, architecture improvements, and portfolio-focused enhancements.
