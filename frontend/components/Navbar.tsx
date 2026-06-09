type NavbarProps = {
  wallet: number;
  onLogout: () => void;
};

export default function Navbar({ wallet, onLogout }: NavbarProps) {
  return (
    <header className="mb-8 rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
            Betz
          </p>
          <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-xl bg-slate-800 px-4 py-2">
            <p className="text-xs font-bold uppercase text-slate-400">
              Wallet
            </p>
            <p className="text-lg font-extrabold text-white">
              ${wallet.toFixed(2)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 px-4 py-2">
            <p className="text-xs font-bold uppercase text-slate-400">
              User
            </p>
            <p className="text-lg font-extrabold text-white">Demo User</p>
          </div>

          <button
            onClick={onLogout}
            className="rounded-xl bg-red-500 px-5 py-3 font-extrabold text-white hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}