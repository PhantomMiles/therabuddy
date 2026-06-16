"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileBeam, faFaceMeh, faFaceSadTear, faFaceAngry, faFaceTired, faCheck } from "@fortawesome/free-solid-svg-icons";

const moods = [
  { key: "happy", icon: faFaceSmileBeam, label: "Happy", color: "#5a9060", bg: "#e8f5e9" },
  { key: "neutral", icon: faFaceMeh, label: "Okay", color: "#8d6e63", bg: "#efebe9" },
  { key: "sad", icon: faFaceSadTear, label: "Sad", color: "#5c7a9e", bg: "#e8eef5" },
  { key: "angry", icon: faFaceAngry, label: "Stressed", color: "#b56060", bg: "#f5e8e8" },
  { key: "tired", icon: faFaceTired, label: "Tired", color: "#7b6fa0", bg: "#eeeaf5" },
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
    setTimeout(() => setSaved(false), 2500);
  };

  const selectedMood = moods.find(m => m.key === selected);

  return (
    <div className="tb-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>Daily Mood</h2>
          <p style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>How are you feeling right now?</p>
        </div>
        {saved && selectedMood && (
          <span style={{
            fontSize: "0.72rem", fontWeight: 600,
            background: selectedMood.bg, color: selectedMood.color,
            padding: "0.25rem 0.75rem", borderRadius: 100,
          }}>
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: "0.25rem", fontSize: "0.65rem" }} />
            Logged
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
        {moods.map(({ key, icon, label, color, bg }) => {
          const active = selected === key;
          return (
            <button key={key} onClick={() => handleSelect(key)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              gap: "0.5rem", padding: "0.9rem 0.25rem", borderRadius: 14,
              border: active ? `1.5px solid ${color}` : "1.5px solid var(--sage-100)",
              background: active ? bg : "var(--warm-100)",
              cursor: "pointer", transition: "all 0.18s",
              transform: active ? "translateY(-2px)" : "none",
              boxShadow: active ? `0 4px 12px ${color}22` : "none",
            }}>
              <FontAwesomeIcon icon={icon} style={{
                fontSize: "1.5rem",
                color: active ? color : "var(--text-muted)",
                transition: "color 0.18s",
              }} />
              <span style={{
                fontSize: "0.65rem", fontWeight: active ? 600 : 400,
                color: active ? color : "var(--text-muted)",
              }}>{label}</span>
            </button>
          );
        })}
      </div>

      {selected && !saved && selectedMood && (
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem", textAlign: "center" }}>
          Feeling <span style={{ color: selectedMood.color, fontWeight: 600 }}>{selectedMood.label}</span> today
        </p>
      )}
    </div>
  );
}
