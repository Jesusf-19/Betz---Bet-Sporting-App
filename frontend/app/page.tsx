"use client";

import { useEffect, useState } from "react";

import Dashboard from "../components/Dashboard";
import LandingPage from "../components/LandingPage";
import LoginForm from "../components/LoginForm";

type View = "landing" | "login" | "dashboard";

export default function Home() {
  const [view, setView] = useState<View>("landing");

  useEffect(() => {
    const savedLogin = localStorage.getItem("betz_logged_in");

    if (savedLogin === "true") {
      setView("dashboard");
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("betz_logged_in", "true");
    setView("dashboard");
  };

  if (view === "dashboard") {
    return <Dashboard />;
  }

  if (view === "login") {
    return (
      <LoginForm
        onLogin={handleLogin}
        onBack={() => setView("landing")}
      />
    );
  }

  return <LandingPage onLoginClick={() => setView("login")} />;
}