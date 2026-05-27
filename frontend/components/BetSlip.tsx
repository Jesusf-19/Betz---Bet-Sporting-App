type BetSlipProps = {
  selection: string | null;
  wallet: number;
};

export default function BetSlip({
  selection,
  wallet,
}: BetSlipProps) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-extrabold">
        Bet Slip
      </h2>

      <div className="mb-4">
        <p className="text-sm font-bold uppercase text-emerald-400">
          Current Selection
        </p>

        <p className="mt-2 text-lg font-bold text-white">
          {selection || "No bet selected"}
        </p>
      </div>

      <div>
        <p className="text-sm font-bold uppercase text-emerald-400">
          Wallet Balance
        </p>

        <p className="mt-2 text-3xl font-extrabold text-white">
          ${wallet}
        </p>
      </div>
    </div>
  );
}