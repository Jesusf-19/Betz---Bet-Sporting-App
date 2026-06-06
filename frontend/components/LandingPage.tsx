type LandingPageProps = {
  onLoginClick: () => void;
};

export default function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-400">
          UEFA Champions League Betting
        </p>

        <h1 className="text-6xl font-extrabold tracking-tight">Betz</h1>

        <p className="mt-6 max-w-3xl text-xl font-semibold text-slate-300">
            Welcome to Betz, a sports betting platform built for football enthusiasts.
            Compare match odds, create custom parlays, track your wagers, and manage
            your betting portfolio through an intuitive dashboard. Betz currently
            features UEFA Champions League fixtures, with support for additional
            competitions coming soon.
        </p>

        <button
          onClick={onLoginClick}
          className="mt-10 rounded-xl bg-emerald-500 px-8 py-4 text-lg font-extrabold text-slate-950 hover:bg-emerald-400"
        >
          Get Started
        </button>
      </section>
    </main>
  );
}