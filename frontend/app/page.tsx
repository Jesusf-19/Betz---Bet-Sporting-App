"use client";

import { useEffect, useState } from "react";
import BetSlip from "../components/BetSlip";

type Match = {
  id: number;
  home_team: string;
  away_team: string;
  match_date: string;
};

type Odds = {
  match_id: number;
  home_odds: number;
  draw_odds: number;
  away_odds: number;
};

type Selection = {
  label: string;
  odds: number;
};

type BetTicket = {
  id: number;
  selection: string;
  odds: number;
  wager: number;
  potentialWin: number;
};

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [odds, setOdds] = useState<Odds[]>([]);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [wallet, setWallet] = useState<number>(5000);
  const [betHistory, setBetHistory] = useState<BetTicket[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data));

    fetch("http://127.0.0.1:8000/odds")
      .then((res) => res.json())
      .then((data) => setOdds(data));
  }, []);

  const placeBet = (amount: number) => {
    if (!selection) return;

    if (amount <= 0) {
      alert("Enter a valid wager amount");
      return;
    }

    if (amount > wallet) {
      alert("Insufficient wallet balance");
      return;
    }

    const ticket: BetTicket = {
      id: Date.now(),
      selection: selection.label,
      odds: selection.odds,
      wager: amount,
      potentialWin: amount * selection.odds,
    };

    setWallet(wallet - amount);
    setBetHistory([ticket, ...betHistory]);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-2xl bg-slate-900 p-8 shadow-lg">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-400">
            UEFA Champions League Betting
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight">Betz</h1>

          <p className="mt-4 max-w-2xl text-lg font-semibold text-slate-300">
            View UCL matchups, compare simulated odds, and build your bet slip
            using in-app currency.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6">
            {matches.map((match) => {
              const matchOdds = odds.find((o) => o.match_id === match.id);

              return (
                <div
                  key={match.id}
                  className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-emerald-400">
                        Match #{match.id}
                      </p>

                      <h2 className="mt-2 text-3xl font-extrabold">
                        {match.home_team} vs {match.away_team}
                      </h2>
                    </div>

                    <p className="rounded-full bg-slate-800 px-4 py-2 text-sm font-bold text-slate-200">
                      {match.match_date}
                    </p>
                  </div>

                  {matchOdds && (
                    <div className="grid gap-4 md:grid-cols-3">
                      <button
                        onClick={() =>
                          setSelection({
                            label: `${match.home_team} to Win`,
                            odds: matchOdds.home_odds,
                          })
                        }
                        className={`rounded-xl px-5 py-4 text-left font-extrabold hover:bg-emerald-400 ${
                          selection?.label === `${match.home_team} to Win`
                            ? "bg-yellow-400 text-slate-950 ring-4 ring-yellow-200"
                            : "bg-emerald-500 text-slate-950"
                        }`}
                      >
                        <span className="block text-sm uppercase">
                          Home Win
                        </span>
                        <span className="block text-xl">{match.home_team}</span>
                        <span className="block text-2xl">
                          {matchOdds.home_odds}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          setSelection({
                            label: "Draw",
                            odds: matchOdds.draw_odds,
                          })
                        }
                        className={`rounded-xl px-5 py-4 text-left font-extrabold hover:bg-slate-600 ${
                          selection?.label === "Draw"
                            ? "bg-yellow-400 text-slate-950 ring-4 ring-yellow-200"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        <span className="block text-sm uppercase">Draw</span>
                        <span className="block text-xl">Tie Game</span>
                        <span className="block text-2xl">
                          {matchOdds.draw_odds}
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          setSelection({
                            label: `${match.away_team} to Win`,
                            odds: matchOdds.away_odds,
                          })
                        }
                        className={`rounded-xl px-5 py-4 text-left font-extrabold hover:bg-indigo-400 ${
                          selection?.label === `${match.away_team} to Win`
                            ? "bg-yellow-400 text-slate-950 ring-4 ring-yellow-200"
                            : "bg-indigo-500 text-white"
                        }`}
                      >
                        <span className="block text-sm uppercase">
                          Away Win
                        </span>
                        <span className="block text-xl">{match.away_team}</span>
                        <span className="block text-2xl">
                          {matchOdds.away_odds}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div>
            <BetSlip selection={selection} wallet={wallet} placeBet={placeBet} />

            <div className="mt-6 rounded-2xl bg-slate-900 p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-extrabold">Bet History</h2>

              <div className="space-y-4">
                {betHistory.length === 0 ? (
                  <p className="text-slate-400">No bets placed yet.</p>
                ) : (
                  betHistory.map((bet) => (
                    <div
                      key={bet.id}
                      className="rounded-xl border border-slate-700 bg-slate-800 p-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                        Bet Ticket
                      </p>

                      <p className="mt-2 text-lg font-extrabold text-white">
                        {bet.selection}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="font-bold uppercase text-slate-400">
                            Odds
                          </p>
                          <p className="text-lg font-extrabold">{bet.odds}</p>
                        </div>

                        <div>
                          <p className="font-bold uppercase text-slate-400">
                            Wager
                          </p>
                          <p className="text-lg font-extrabold">
                            ${bet.wager.toFixed(2)}
                          </p>
                        </div>

                        <div className="col-span-2 rounded-lg bg-slate-900 p-3">
                          <p className="font-bold uppercase text-emerald-400">
                            Potential Win
                          </p>
                          <p className="text-2xl font-extrabold">
                            ${bet.potentialWin.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}