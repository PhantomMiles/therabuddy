"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import AppShell from "@/components/AppShell";

type Profile = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  createdAt: string;
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setProfile(data);
          setName(data.name ?? "");
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError("");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
    else setError("Failed to save.");
    setSaving(false);
  };

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const initials = (name || session?.user?.name || "?")[0]?.toUpperCase();

  return (
    <AppShell>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem 1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
          Profile & Settings
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "2rem" }}>
          Manage your account information.
        </p>

        {/* Avatar card */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          {profile?.image ? (
            <img src={profile.image} alt="Avatar" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "linear-gradient(135deg, #00d4aa, #0284c7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "1.3rem", color: "#fff", flexShrink: 0,
            }}>{initials}</div>
          )}
          <div>
            <p style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", margin: 0 }}>
              {profile?.name || session?.user?.name || "—"}
            </p>
            <p style={{ color: "#64748b", fontSize: "0.825rem", margin: "0.2rem 0 0" }}>
              {profile?.email || session?.user?.email || "—"}
            </p>
            {joinDate && (
              <p style={{ color: "#94a3b8", fontSize: "0.75rem", margin: "0.2rem 0 0" }}>
                Member since {joinDate}
              </p>
            )}
          </div>
        </div>

        {/* Grid: Edit + Preferences */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>

          {/* Edit Profile */}
          <div style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.25rem" }}>Edit Profile</h2>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#64748b", marginBottom: "0.4rem" }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: "0.9rem", color: "#0f172a", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#64748b", marginBottom: "0.4rem" }}>Email</label>
                <input
                  type="email"
                  value={profile?.email || session?.user?.email || ""}
                  disabled
                  style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: "0.9rem", color: "#94a3b8", cursor: "not-allowed", boxSizing: "border-box" }}
                />
                <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.3rem" }}>Email cannot be changed.</p>
              </div>

              {error && <p style={{ fontSize: "0.8rem", color: "#ef4444", margin: 0 }}>{error}</p>}
              {saved && <p style={{ fontSize: "0.8rem", color: "#10b981", margin: 0 }}>✓ Saved!</p>}

              <button type="submit" disabled={saving} style={{
                padding: "0.7rem 1.5rem", borderRadius: 10, alignSelf: "flex-start",
                background: saving ? "rgba(0,212,170,0.4)" : "#00d4aa",
                color: "#050d1a", fontWeight: 700, fontSize: "0.875rem",
                border: "none", cursor: saving ? "not-allowed" : "pointer",
              }}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Preferences */}
          <div style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", marginBottom: "1.25rem" }}>Preferences</h2>
            {[
              { label: "Daily Check-in Reminder", desc: "Get reminded to log your mood each day" },
              { label: "Crisis Alerts", desc: "Show urgent help resources on high-risk signals" },
              { label: "Daily motivations/affirmations", desc: "Encouragement every morning to brighten your day" },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 0", borderBottom: "1px solid #f1f5f9" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0f172a", margin: 0 }}>{label}</p>
                  <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: "0.2rem 0 0" }}>{desc}</p>
                </div>
                <label style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer", flexShrink: 0 }}>
                  <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0, position: "absolute" }} />
                  <div style={{ width: 40, height: 22, background: "#00d4aa", borderRadius: 100, position: "relative" }}>
                    <div style={{ position: "absolute", top: 3, left: 21, width: 16, height: 16, background: "#fff", borderRadius: "50%" }} />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <div style={{ border: "1px solid #fee2e2", background: "#fff", borderRadius: 16, padding: "0.5rem 1.5rem 1rem" }}>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ef4444", marginBottom: "1rem" }}>Account Actions</h2>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1.25rem", marginBottom: "0.25rem" }}>
            <button style={{ width: "40%", margin: "0 auto",  padding: "0.75rem", borderRadius: 10, border: "1px solid #050d1a", background: "#050d1a", color: "#fff", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Save Changes</button>
            <button style={{ width: "40%", margin: "0 auto", padding: "0.75rem", borderRadius: 10, border: "1px solid #ef4444", background: "#ef4444", color: "#fff", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Delete Account</button>

            {/* <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              style={{
                width: "40%", padding: "0.75rem", borderRadius: 10,
                border: "1px solid #fecaca", background: "#ef4444",
                color: "#fff", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer",
              }}
            >
              Sign Out
            </button> */}
          </div>
        </div>
      </div>
    </AppShell>
  );
}