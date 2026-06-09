"use client";

import { useEffect, useState } from "react";
import BetSlip from "./BetSlip";
import Navbar from "./Navbar";

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

type BetSelection = {
  id: string;
  label: string;
  odds: number;
};

type BetStatus = "Pending" | "Won" | "Lost";

type BetTicket = {
  id: number;
  selections: BetSelection[];
  odds: number;
  wager: number;
  potentialWin: number;
  status: BetStatus;
};

type DashboardProps = {
  onLogout: () => void;
};

export default function Dashboard({
  onLogout,
}: DashboardProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [odds, setOdds] = useState<Odds[]>([]);
  const [selections, setSelections] = useState<BetSelection[]>([]);
  const [wallet, setWallet] = useState<number>(5000);
  const [betHistory, setBetHistory] = useState<BetTicket[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data));

    fetch("http://127.0.0.1:8000/odds")
      .then((res) => res.json())
      .then((data) => setOdds(data));

    const savedWallet = localStorage.getItem("betz_wallet");
    const savedBetHistory = localStorage.getItem("betz_bet_history");

    if (savedWallet) {
      setWallet(Number(savedWallet));
    }

    if (savedBetHistory) {
      setBetHistory(JSON.parse(savedBetHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("betz_wallet", wallet.toString());
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem("betz_bet_history", JSON.stringify(betHistory));
  }, [betHistory]);

  const toggleSelection = (selection: BetSelection) => {
    const alreadySelected = selections.some((item) => item.id === selection.id);

    if (alreadySelected) {
      setSelections(selections.filter((item) => item.id !== selection.id));
      return;
    }

    const matchId = selection.id.split("-")[0];

    const selectionsFromOtherMatches = selections.filter(
      (item) => item.id.split("-")[0] !== matchId
    );

    setSelections([...selectionsFromOtherMatches, selection]);
  };

  const removeSelection = (selectionId: string) => {
    setSelections(selections.filter((selection) => selection.id !== selectionId));
  };

  const clearSelections = () => {
    setSelections([]);
  };

  const isSelected = (selectionId: string) => {
    return selections.some((selection) => selection.id === selectionId);
  };

  const getCombinedOdds = () => {
    return selections.reduce((total, selection) => total * selection.odds, 1);
  };

  const placeBet = (amount: number) => {
    if (selections.length === 0) return;

    if (amount <= 0) {
      alert("Enter a valid wager amount");
      return;
    }

    if (amount > wallet) {
      alert("Insufficient wallet balance");
      return;
    }

    const combinedOdds = getCombinedOdds();

    const ticket: BetTicket = {
      id: Date.now(),
      selections,
      odds: combinedOdds,
      wager: amount,
      potentialWin: amount * combinedOdds,
      status: "Pending",
    };

    setWallet(Number((wallet - amount).toFixed(2)));
    setBetHistory([ticket, ...betHistory]);
    setSelections([]);
  };

  const resetWallet = () => {
    setWallet(5000);
    setBetHistory([]);
    setSelections([]);
    localStorage.removeItem("betz_wallet");
    localStorage.removeItem("betz_bet_history");
  };

  const updateBetStatus = (ticketId: number, status: BetStatus) => {
    setBetHistory((currentHistory) =>
      currentHistory.map((ticket) => {
        if (ticket.id !== ticketId || ticket.status !== "Pending") {
          return ticket;
        }

        if (status === "Won") {
          setWallet((currentWallet) =>
            Number((currentWallet + ticket.potentialWin).toFixed(2))
          );
        }

        return {
          ...ticket,
          status,
        };
      })
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <Navbar wallet={wallet} onLogout={onLogout} />
        
        <div className="mb-10 rounded-2xl bg-slate-900 p-8 shadow-lg">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-400">
            UEFA Champions League Betting
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight">Betz</h1>

          <p className="mt-4 max-w-2xl font-semibold text-slate-300">
            View UCL matchups, compare simulated odds, and build your bet slip
            using in-app currency.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6">
            {matches.map((match) => {
              const matchOdds = odds.find((o) => o.match_id === match.id);

              const homeSelection = {
                id: `${match.id}-home`,
                label: `${match.home_team} to Win`,
                odds: matchOdds?.home_odds ?? 0,
              };

              const drawSelection = {
                id: `${match.id}-draw`,
                label: `${match.home_team} vs ${match.away_team} Draw`,
                odds: matchOdds?.draw_odds ?? 0,
              };

              const awaySelection = {
                id: `${match.id}-away`,
                label: `${match.away_team} to Win`,
                odds: matchOdds?.away_odds ?? 0,
              };

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
                        onClick={() => toggleSelection(homeSelection)}
                        className={`rounded-xl px-5 py-4 text-left font-extrabold hover:bg-emerald-400 ${
                          isSelected(homeSelection.id)
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
                        onClick={() => toggleSelection(drawSelection)}
                        className={`rounded-xl px-5 py-4 text-left font-extrabold hover:bg-slate-600 ${
                          isSelected(drawSelection.id)
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
                        onClick={() => toggleSelection(awaySelection)}
                        className={`rounded-xl px-5 py-4 text-left font-extrabold hover:bg-indigo-400 ${
                          isSelected(awaySelection.id)
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
            <BetSlip
              selections={selections}
              wallet={wallet}
              placeBet={placeBet}
              resetWallet={resetWallet}
              removeSelection={removeSelection}
              clearSelections={clearSelections}
            />

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
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                            {bet.selections.length > 1 ? "Parlay Ticket" : "Single Bet"}
                          </p>

                          <span className="rounded-full bg-slate-700 px-2 py-1 text-xs font-bold">
                            {bet.selections.length} Pick
                            {bet.selections.length > 1 ? "s" : ""}
                          </span>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase ${
                            bet.status === "Won"
                              ? "bg-emerald-500 text-slate-950"
                              : bet.status === "Lost"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-400 text-slate-950"
                          }`}
                        >
                          {bet.status}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">
                        {(bet.selections ?? []).map((selection) => (
                          <p
                            key={selection.id}
                            className="rounded-lg bg-slate-900 p-2 text-sm font-extrabold text-white"
                          >
                            {selection.label} ({selection.odds})
                          </p>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="font-bold uppercase text-slate-400">
                            {bet.selections.length > 1
                              ? "Combined Odds"
                              : "Odds"}
                          </p>
                          <p className="text-lg font-extrabold">
                            {bet.odds.toFixed(2)}
                          </p>
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

                      {bet.status === "Pending" && (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <button
                            onClick={() => updateBetStatus(bet.id, "Won")}
                            className="rounded-lg bg-emerald-500 py-2 font-extrabold text-slate-950 hover:bg-emerald-400"
                          >
                            Mark Won
                          </button>

                          <button
                            onClick={() => updateBetStatus(bet.id, "Lost")}
                            className="rounded-lg bg-red-500 py-2 font-extrabold text-white hover:bg-red-400"
                          >
                            Mark Lost
                          </button>
                        </div>
                      )}
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