"use client";

import { useState } from "react";

import Dashboard from "../components/Dashboard";
import LandingPage from "../components/LandingPage";
import LoginForm from "../components/LoginForm";

type View = "landing" | "login" | "dashboard";

export default function Home() {
  const [view, setView] = useState<View>("landing");

  if (view === "dashboard") {
    return <Dashboard />;
  }

  if (view === "login") {
    return (
      <LoginForm
        onLogin={() => setView("dashboard")}
        onBack={() => setView("landing")}
      />
    );
  }

  return (
    <LandingPage
      onLoginClick={() => setView("login")}
    />
  );
}