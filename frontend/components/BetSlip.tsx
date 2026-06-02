"use client";

import { useState } from "react";

type Selection = {
  label: string;
  odds: number;
};

type BetSlipProps = {
  selection: Selection | null;
  wallet: number;
  placeBet: (amount: number) => void;
};

export default function BetSlip({
  selection,
  wallet,
  placeBet,
}: BetSlipProps) {
  const [amount, setAmount] = useState("");

  const wagerAmount = Number(amount);
  const potentialWin =
    selection && wagerAmount > 0 ? wagerAmount * selection.odds : 0;

  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-extrabold">Bet Slip</h2>

      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-emerald-400">
          Current Selection
        </p>
        <p className="mt-2 text-lg font-bold text-white">
          {selection ? selection.label : "No bet selected"}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-emerald-400">Odds</p>
        <p className="mt-2 text-2xl font-extrabold text-white">
          {selection ? selection.odds : "--"}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-emerald-400">
          Wallet Balance
        </p>
        <p className="mt-2 text-3xl font-extrabold text-white">${wallet}</p>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-bold uppercase text-emerald-400">
          Wager Amount
        </label>

        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter wager"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none"
        />
      </div>

      <div className="mb-4 rounded-lg bg-slate-800 p-4">
        <p className="text-sm font-bold uppercase text-emerald-400">
          Potential Win
        </p>
        <p className="mt-1 text-2xl font-extrabold text-white">
          ${potentialWin.toFixed(2)}
        </p>
      </div>

      <button
        disabled={!selection}
        onClick={() => {
          placeBet(Number(amount));
          setAmount("");
        }}
        className="w-full rounded-xl bg-emerald-500 py-3 font-extrabold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        Place Bet
      </button>
    </div>
  );
}