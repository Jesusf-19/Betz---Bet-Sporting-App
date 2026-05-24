export default function Home() {
  const matches = [
    {
      id: 1,
      homeTeam: "Real Madrid",
      awayTeam: "Manchester City",
      date: "June 1, 2026",
      homeOdds: 2.1,
      drawOdds: 3.4,
      awayOdds: 2.8,
    },
    {
      id: 2,
      homeTeam: "Bayern Munich",
      awayTeam: "PSG",
      date: "June 2, 2026",
      homeOdds: 1.95,
      drawOdds: 3.2,
      awayOdds: 3.1,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 rounded-2xl bg-slate-900 p-8 shadow-lg">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-400">
            UEFA Champions League Betting
          </p>

          <h1 className="text-5xl font-extrabold tracking-tight">
            Betz
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-semibold text-slate-300">
            View UCL matchups, compare simulated odds, and build your bet slip
            using in-app currency.
          </p>
        </div>

        <div className="grid gap-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-emerald-400">
                    Match #{match.id}
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold">
                    {match.homeTeam} vs {match.awayTeam}
                  </h2>
                </div>

                <p className="rounded-full bg-slate-800 px-4 py-2 text-sm font-bold text-slate-200">
                  {match.date}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <button className="rounded-xl bg-emerald-500 px-5 py-4 text-left font-extrabold text-slate-950 hover:bg-emerald-400">
                  <span className="block text-sm uppercase">Home Win</span>
                  <span className="block text-xl">{match.homeTeam}</span>
                  <span className="block text-2xl">{match.homeOdds}</span>
                </button>

                <button className="rounded-xl bg-slate-700 px-5 py-4 text-left font-extrabold text-white hover:bg-slate-600">
                  <span className="block text-sm uppercase">Draw</span>
                  <span className="block text-xl">Tie Game</span>
                  <span className="block text-2xl">{match.drawOdds}</span>
                </button>

                <button className="rounded-xl bg-indigo-500 px-5 py-4 text-left font-extrabold text-white hover:bg-indigo-400">
                  <span className="block text-sm uppercase">Away Win</span>
                  <span className="block text-xl">{match.awayTeam}</span>
                  <span className="block text-2xl">{match.awayOdds}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}