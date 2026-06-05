"use client";

import { useState } from "react";

type BetSelection = {
  id: string;
  label: string;
  odds: number;
};

type BetSlipProps = {
  selections: BetSelection[];
  wallet: number;
  placeBet: (amount: number) => void;
  resetWallet: () => void;
  removeSelection: (selectionId: string) => void;
};

export default function BetSlip({
  selections,
  wallet,
  placeBet,
  resetWallet,
  removeSelection,
}: BetSlipProps) {
  const [amount, setAmount] = useState("");

  const wagerAmount = Number(amount);
  const combinedOdds = selections.reduce(
    (total, selection) => total * selection.odds,
    1
  );

  const potentialWin =
    selections.length > 0 && wagerAmount > 0 ? wagerAmount * combinedOdds : 0;

  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-extrabold">Bet Slip</h2>

      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-emerald-400">
          Current Selections
        </p>

        {selections.length === 0 ? (
          <p className="mt-2 text-lg font-bold text-white">No bets selected</p>
        ) : (
          <div className="mt-3 space-y-3">
            {selections.map((selection) => (
              <div
                key={selection.id}
                className="rounded-lg bg-slate-800 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-white">
                      {selection.label}
                    </p>
                    <p className="text-sm font-bold text-emerald-400">
                      Odds: {selection.odds}
                    </p>
                  </div>

                  <button
                    onClick={() => removeSelection(selection.id)}
                    className="rounded-md bg-red-500 px-2 py-1 text-xs font-extrabold text-white hover:bg-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-emerald-400">
          Combined Odds
        </p>
        <p className="mt-2 text-2xl font-extrabold text-white">
          {selections.length > 0 ? combinedOdds.toFixed(2) : "--"}
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
        disabled={selections.length === 0}
        onClick={() => {
          placeBet(Number(amount));
          setAmount("");
        }}
        className="w-full rounded-xl bg-emerald-500 py-3 font-extrabold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        Place Bet
      </button>

      <button
        onClick={resetWallet}
        className="mt-3 w-full rounded-xl bg-red-500 py-3 font-extrabold text-white hover:bg-red-400"
      >
        Reset Wallet
      </button>
    </div>
  );
}