"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserInjured, faUserMd, faBrain } from "@fortawesome/free-solid-svg-icons";

export default function SignupPage() {
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState<"patient" | "therapist" | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    await signIn("credentials", { email, password, callbackUrl: role === "therapist" ? "/therapist" : "/dashboard" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--warm-100)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "var(--sage-100)", filter: "blur(80px)", bottom: "-50px", left: "-80px", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 102, height: 102, borderRadius: 14,
            background: "linear-gradient(135deg, var(--sage-400), var(--sage-600))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.4rem", margin: "0 auto 0.5rem",
          }}>
            <Image src="/logo.png" alt="Therabuddy Logo" priority width={102} height={102} />

          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", color: "var(--text-primary)", fontWeight: 400 }}>
            {step === "role" ? "Join Therabuddy" : `Sign up as ${role === "therapist" ? "Therapist" : "Patient"}`}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.3rem" }}>
            {step === "role" ? "Who are you joining as?" : "Create your account below"}
          </p>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--sage-100)", borderRadius: 22, padding: "2rem", boxShadow: "var(--shadow-md)" }}>

          {step === "role" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { r: "patient" as const, icon: faUserInjured, title: "I'm a Patient", desc: "Track my mood, chat with AI, get support" },
                { r: "therapist" as const, icon: faUserMd, title: "I'm a Therapist", desc: "Manage patients, sessions & progress" },
              ].map(({ r, icon, title, desc }) => (
                <button key={r} onClick={() => { setRole(r); setStep("form"); }} style={{
                  display: "flex", alignItems: "center", gap: "1.25rem",
                  padding: "1.25rem", borderRadius: 14, textAlign: "left",
                  border: "1.5px solid var(--sage-100)", background: "var(--warm-100)",
                  cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: "var(--sage-100)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <FontAwesomeIcon icon={icon} style={{ fontSize: "1.2rem", color: "var(--sage-600)" }} />
                  </div>
                  <div>
                    <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.95rem", margin: 0 }}>{title}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: "0.2rem 0 0" }}>{desc}</p>
                  </div>
                </button>
              ))}

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "0.25rem 0" }}>
                <div style={{ flex: 1, height: 1, background: "var(--sage-100)" }} />
                <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "var(--sage-100)" }} />
              </div>

              <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                padding: "0.8rem", borderRadius: 12, background: "var(--warm-100)",
                border: "1.5px solid var(--sage-100)", color: "var(--text-primary)",
                fontSize: "0.875rem", fontWeight: 500, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.19 3.6l6.85-6.85C35.82 2.46 30.31 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.32 13.21 17.72 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.21-.43-4.73H24v9h12.46c-.54 2.89-2.19 5.33-4.66 6.99l7.18 5.59C43.99 37.05 46.1 31.31 46.1 24.5z"/>
                  <path fill="#FBBC05" d="M10.54 28.42c-.5-1.49-.79-3.09-.79-4.92s.29-3.43.79-4.92l-7.98-6.2C.92 16.41 0 20.06 0 24c0 3.94.92 7.59 2.56 10.62l7.98-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.31 0 11.62-2.08 15.49-5.66l-7.18-5.59c-2.01 1.35-4.58 2.15-8.31 2.15-6.28 0-11.68-3.71-13.46-9.17l-7.98 6.2C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          ) : (
            <div>
              <button onClick={() => setStep("role")} style={{
                background: "none", border: "none", color: "var(--text-muted)",
                fontSize: "0.8rem", cursor: "pointer", marginBottom: "1.25rem",
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "'DM Sans', sans-serif", padding: 0,
              }}>← Back</button>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--sage-100)", color: "var(--sage-700)",
                padding: "0.3rem 0.9rem", borderRadius: 100, fontSize: "0.75rem",
                fontWeight: 600, marginBottom: "1.25rem",
              }}>
                <FontAwesomeIcon icon={faBrain} style={{ fontSize: "0.72rem" }} /> {role === "therapist" ? "Therapist" : "Patient"} account
              </div>

              {error && (
                <div style={{ background: "#fce4ec", border: "1px solid #f8bbd9", borderRadius: 10, padding: "0.75rem 1rem", color: "#c62828", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Full Name", type: "text", val: name, set: setName, ph: "John Doe" },
                  { label: "Email", type: "email", val: email, set: setEmail, ph: "you@email.com" },
                  { label: "Password", type: "password", val: password, set: setPassword, ph: "At least 8 characters" },
                ].map(({ label, type, val, set, ph }) => (
                  <div key={label}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>{label}</label>
                    <input type={type} required placeholder={ph} value={val} onChange={e => set(e.target.value)} className="tb-input" minLength={type === "password" ? 8 : undefined} />
                  </div>
                ))}
                <button type="submit" disabled={loading} className="tb-btn" style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", marginTop: "0.25rem" }}>
                  {loading ? "Creating account..." : `Create ${role === "therapist" ? "Therapist" : "Patient"} Account`}
                </button>
              </form>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--sage-600)", fontWeight: 600, textDecoration: "none" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
