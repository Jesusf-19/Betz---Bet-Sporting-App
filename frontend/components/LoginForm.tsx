"use client";

import { useState } from "react";

type LoginFormProps = {
  onLogin: () => void;
  onBack: () => void;
};

export default function LoginForm({
  onLogin,
  onBack,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please enter an email and password");
      return;
    }

    onLogin();
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl bg-slate-900 p-8 shadow-lg">
          <h1 className="mb-2 text-4xl font-extrabold">
            Welcome Back
          </h1>

          <p className="mb-8 font-semibold text-slate-400">
            Sign in to access your Betz dashboard.
          </p>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold uppercase text-emerald-400">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase text-emerald-400">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 outline-none"
                placeholder="Password"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-emerald-500 py-3 font-extrabold text-slate-950 hover:bg-emerald-400"
            >
              Sign In
            </button>

            <button
              onClick={onBack}
              className="w-full rounded-xl bg-slate-700 py-3 font-extrabold hover:bg-slate-600"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}