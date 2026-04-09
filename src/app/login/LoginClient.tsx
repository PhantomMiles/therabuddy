"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await signIn("credentials", { email, password, callbackUrl: "/dashboard", redirect: false });
    if (res?.error) { setError("Invalid email or password."); setLoading(false); }
    else window.location.href = "/dashboard";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>

      {/* Glow */}
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "rgba(0,212,170,0.08)", filter: "blur(80px)", top: "20%", left: "30%", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "1.2rem", color: "#fff", margin: "0 auto 1rem",
          }}><img src="/therabuddy.png" alt="Therabuddy" width={48} height={48} /></div>
          <h1 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.4rem" }}>Welcome back</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Continue your wellness journey</p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem" }}>

          {/* Google */}
          <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            padding: "0.8rem", borderRadius: 10, background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0",
            fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", marginBottom: "1.5rem",
            transition: "background 0.2s",
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
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ color: "#475569", fontSize: "0.8rem" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "0.75rem 1rem", color: "#fca5a5", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.4rem" }}>Email</label>
              <input type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: "90%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500, marginBottom: "0.4rem" }}>Password</label>
              <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                style={{ width: "90%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: "0.9rem", outline: "none" }} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "0.85rem", borderRadius: 10,
              background: loading ? "rgba(0,212,170,0.4)" : "#00d4aa",
              color: "#050d1a", fontWeight: 700, fontSize: "0.95rem",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
            }}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "#475569", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#00d4aa", fontWeight: 600, textDecoration: "none" }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
