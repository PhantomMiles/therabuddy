"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserInjured, faUserMd } from "@fortawesome/free-solid-svg-icons";

export default function SignupPage() {
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState<"patient" | "therapist" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (r: "patient" | "therapist") => {
    setRole(r);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error || "Something went wrong.");
      setLoading(false); return;
    }
    await signIn("credentials", {
      email, password,
      callbackUrl: role === "therapist" ? "/therapist" : "/dashboard",
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
    color: "#e2e8f0", fontSize: "0.9rem", outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "rgba(0,212,170,0.07)", filter: "blur(80px)", top: "10%", left: "20%", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "1.2rem", color: "#fff", margin: "0 auto 1rem",
          }}><img src="/therabuddy.png" alt="Therabuddy" width={200} height={48} /></div>
          <h1 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>
            {step === "role" ? "Join Therabuddy" : `Sign up as ${role === "therapist" ? "Therapist" : "Patient"}`}
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.4rem" }}>
            {step === "role" ? "Who are you joining as?" : "Create your account below"}
          </p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem" }}>

          {step === "role" ? (
            /* ROLE SELECTION */
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button onClick={() => handleRoleSelect("patient")} style={{
                display: "flex", alignItems: "center", gap: "1.25rem",
                padding: "1.25rem 1.5rem", borderRadius: 14,
                border: "1.5px solid rgba(0,212,170,0.2)",
                background: "rgba(0,212,170,0.05)",
                cursor: "pointer", transition: "all 0.2s", textAlign: "left",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "rgba(0,212,170,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <FontAwesomeIcon icon={faUserInjured} style={{ fontSize: "1.3rem", color: "#00d4aa" }} />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", margin: 0 }}>I&apos;m a Patient</p>
                  <p style={{ color: "#64748b", fontSize: "0.8rem", margin: "0.2rem 0 0" }}>Track my mood, chat with AI, get support</p>
                </div>
              </button>

              <button onClick={() => handleRoleSelect("therapist")} style={{
                display: "flex", alignItems: "center", gap: "1.25rem",
                padding: "1.25rem 1.5rem", borderRadius: 14,
                border: "1.5px solid rgba(2,132,199,0.2)",
                background: "rgba(2,132,199,0.05)",
                cursor: "pointer", transition: "all 0.2s", textAlign: "left",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "rgba(2,132,199,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <FontAwesomeIcon icon={faUserMd} style={{ fontSize: "1.3rem", color: "#0284c7" }} />
                </div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", margin: 0 }}>I&apos;m a Therapist</p>
                  <p style={{ color: "#64748b", fontSize: "0.8rem", margin: "0.2rem 0 0" }}>Manage patients, sessions & progress</p>
                </div>
              </button>

              
            </div>
          ) : (
            /* SIGN UP FORM */
            <div>
              <button onClick={() => setStep("role")} style={{
                background: "none", border: "none", color: "#64748b",
                fontSize: "0.8rem", cursor: "pointer", marginBottom: "1.25rem",
                display: "flex", alignItems: "center", gap: "0.4rem", padding: 0,
              }}>
                ← Back
              </button>
              

              {/* Role badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: role === "therapist" ? "rgba(2,132,199,0.12)" : "rgba(0,212,170,0.12)",
                border: `1px solid ${role === "therapist" ? "rgba(2,132,199,0.25)" : "rgba(0,212,170,0.25)"}`,
                color: role === "therapist" ? "#38bdf8" : "#00d4aa",
                padding: "0.3rem 0.9rem", borderRadius: 100, fontSize: "0.78rem",
                fontWeight: 600, marginBottom: "1.25rem",
              }}>
                <FontAwesomeIcon icon={role === "therapist" ? faUserMd : faUserInjured} style={{ fontSize: 11 }} />
                {role === "therapist" ? "Therapist" : "Patient"} account
              </div>

              {error && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "0.75rem 1rem", color: "#fca5a5", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                padding: "0.8rem", borderRadius: 10, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0",
                fontSize: "0.9rem", fontWeight: 500, cursor: "pointer",
                }}>
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.19 3.6l6.85-6.85C35.82 2.46 30.31 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.32 13.21 17.72 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.21-.43-4.73H24v9h12.46c-.54 2.89-2.19 5.33-4.66 6.99l7.18 5.59C43.99 37.05 46.1 31.31 46.1 24.5z"/>
                    <path fill="#FBBC05" d="M10.54 28.42c-.5-1.49-.79-3.09-.79-4.92s.29-3.43.79-4.92l-7.98-6.2C.92 16.41 0 20.06 0 24c0 3.94.92 7.59 2.56 10.62l7.98-6.2z"/>
                    <path fill="#34A853" d="M24 48c6.31 0 11.62-2.08 15.49-5.66l-7.18-5.59c-2.01 1.35-4.58 2.15-8.31 2.15-6.28 0-11.68-3.71-13.46-9.17l-7.98 6.2C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "0.5rem 0" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                  <span style={{ color: "#475569", fontSize: "0.8rem" }}>or continue with</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 500, marginBottom: "0.4rem" }}>Full Name</label>
                  <input type="text" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 500, marginBottom: "0.4rem" }}>Email</label>
                  <input type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#94a3b8", fontSize: "0.78rem", fontWeight: 500, marginBottom: "0.4rem" }}>Password</label>
                  <input type="password" required minLength={8} placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                </div>
                <button type="submit" disabled={loading} style={{
                  width: "100%", padding: "0.85rem", borderRadius: 10,
                  background: role === "therapist" ? (loading ? "rgba(2,132,199,0.4)" : "#0284c7") : (loading ? "rgba(0,212,170,0.4)" : "#00d4aa"),
                  color: "#050d1a", fontWeight: 700, fontSize: "0.95rem",
                  border: "none", cursor: loading ? "not-allowed" : "pointer",
                }}>
                  {loading ? "Creating account..." : `Create ${role === "therapist" ? "Therapist" : "Patient"} Account`}
                </button>
              </form>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", color: "#475569", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#00d4aa", fontWeight: 600, textDecoration: "none" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
