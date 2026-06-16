"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) { setError("Invalid email or password."); setLoading(false); return; }
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();
    window.location.href = session?.user?.role === "therapist" ? "/therapist" : "/dashboard";
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--warm-100)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Decorative blob */}
      <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "var(--sage-100)", filter: "blur(80px)", top: "-100px", right: "-100px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image src="/logo.png" alt="Therabuddy Logo" width={90} height={90} priority style={{ margin: "0 auto 1rem", display: "block" }} />
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", color: "var(--text-primary)", fontWeight: 400 }}>Welcome back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.3rem" }}>Sign in to your account</p>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--sage-100)", borderRadius: 22, padding: "2rem", boxShadow: "var(--shadow-md)" }}>

          {/* Google */}
          <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            padding: "0.8rem", borderRadius: 12, background: "var(--warm-100)",
            border: "1.5px solid var(--sage-100)", color: "var(--text-primary)",
            fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", marginBottom: "1.5rem",
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
          }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.19 3.6l6.85-6.85C35.82 2.46 30.31 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.32 13.21 17.72 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.21-.43-4.73H24v9h12.46c-.54 2.89-2.19 5.33-4.66 6.99l7.18 5.59C43.99 37.05 46.1 31.31 46.1 24.5z"/>
              <path fill="#FBBC05" d="M10.54 28.42c-.5-1.49-.79-3.09-.79-4.92s.29-3.43.79-4.92l-7.98-6.2C.92 16.41 0 20.06 0 24c0 3.94.92 7.59 2.56 10.62l7.98-6.2z"/>
              <path fill="#34A853" d="M24 48c6.31 0 11.62-2.08 15.49-5.66l-7.18-5.59c-2.01 1.35-4.58 2.15-8.31 2.15-6.28 0-11.68-3.71-13.46-9.17l-7.98 6.2C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: 1, background: "var(--sage-100)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "var(--sage-100)" }} />
          </div>

          {error && (
            <div style={{ background: "#fce4ec", border: "1px solid #f8bbd9", borderRadius: 10, padding: "0.75rem 1rem", color: "#c62828", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>Email</label>
              <input type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} className="tb-input" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>Password</label>
              <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="tb-input" />
            </div>
            <button type="submit" disabled={loading} className="tb-btn" style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", marginTop: "0.25rem" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "var(--sage-600)", fontWeight: 600, textDecoration: "none" }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
