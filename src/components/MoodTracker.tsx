"use client";

import { useState } from "react";

const moods = [
  { key: "happy", emoji: "😊", label: "Happy", color: "#10b981" },
  { key: "neutral", emoji: "😐", label: "Okay", color: "#f59e0b" },
  { key: "sad", emoji: "😢", label: "Sad", color: "#3b82f6" },
  { key: "angry", emoji: "😠", label: "Stressed", color: "#ef4444" },
  { key: "tired", emoji: "😴", label: "Tired", color: "#8b5cf6" },
];

export default function MoodTracker() {
  const [selected, setSelected] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSelect = async (key: string) => {
    setSelected(key); setSaved(false);
    await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: key }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}>Daily Mood</h2>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>How are you feeling right now?</p>
        </div>
        {saved && (
          <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 600, background: "#dcfce7", padding: "0.25rem 0.75rem", borderRadius: 100 }}>
            ✓ Logged
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {moods.map(({ key, emoji, label, color }) => {
          const active = selected === key;
          return (
            <button key={key} onClick={() => handleSelect(key)} style={{
              flex: 1, minWidth: 64,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
              padding: "0.85rem 0.5rem", borderRadius: 12,
              border: active ? `2px solid ${color}` : "2px solid #f1f5f9",
              background: active ? `${color}15` : "#f8fafc",
              cursor: "pointer", transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "1.6rem", lineHeight: 1 }}>{emoji}</span>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: active ? color : "#94a3b8" }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
