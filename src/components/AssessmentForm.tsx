"use client";

import { useState } from "react";

const questions = [
  { id: "q1", text: "Overall mood recently?", options: ["Very Good", "Okay", "Low / Sad", "Hopeless"] },
  { id: "q2", text: "How has your sleep been?", options: ["Sleeping well", "Slightly disrupted", "Poor sleep", "Can't sleep at all"] },
  { id: "q3", text: "Enjoying activities you like?", options: ["Yes, fully", "Somewhat", "Barely", "Not at all"] },
  { id: "q4", text: "Your energy levels?", options: ["High energy", "Normal", "Often tired", "Exhausted"] },
  { id: "q5", text: "Feeling anxious or worried?", options: ["Not at all", "Occasionally", "Often", "Almost constantly"] },
];

type Result = { risk: "low" | "moderate" | "high"; summary: string; recommendation: string };

const riskConfig = {
  low: { color: "#10b981", bg: "#dcfce7", label: "Low Risk" },
  moderate: { color: "#f59e0b", bg: "#fef9c3", label: "Moderate Risk" },
  high: { color: "#ef4444", bg: "#fee2e2", label: "High Risk" },
};

export default function AssessmentForm() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const allAnswered = questions.every(q => answers[q.id]);
  const current = questions[step];

  const handleAnswer = (val: string) => {
    const updated = { ...answers, [current.id]: val };
    setAnswers(updated);
    if (step < questions.length - 1) setTimeout(() => setStep(s => s + 1), 200);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/assess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  if (result) {
    const cfg = riskConfig[result.risk];
    return (
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.5rem" }}>
        <div style={{ background: cfg.bg, borderRadius: 12, padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>Check-in Result</h3>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: cfg.color, background: "#fff", padding: "0.2rem 0.65rem", borderRadius: 100 }}>{cfg.label}</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.6 }}>{result.summary}</p>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6, marginBottom: "1rem" }}>
          💡 {result.recommendation}
        </p>
        <button onClick={() => { setResult(null); setAnswers({}); setStep(0); }} style={{
          fontSize: "0.8rem", color: "#00d4aa", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          Take another check-in →
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}>Mental Check-in</h2>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Question {step + 1} of {questions.length}</p>
        </div>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: "0.35rem" }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i < step ? "#00d4aa" : i === step ? "#0284c7" : "#e2e8f0",
              transition: "background 0.2s",
            }} />
          ))}
        </div>
      </div>

      <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0f172a", marginBottom: "1rem" }}>{current.text}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {current.options.map(opt => (
          <button key={opt} onClick={() => handleAnswer(opt)} style={{
            padding: "0.7rem 1rem", borderRadius: 10, textAlign: "left",
            border: answers[current.id] === opt ? "2px solid #00d4aa" : "2px solid #f1f5f9",
            background: answers[current.id] === opt ? "rgba(0,212,170,0.06)" : "#f8fafc",
            color: answers[current.id] === opt ? "#0f172a" : "#64748b",
            fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
          }}>{opt}</button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)} style={{ fontSize: "0.8rem", color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}>← Back</button>
        ) : <div />}
        {allAnswered && (
          <button onClick={handleSubmit} disabled={loading} style={{
            padding: "0.6rem 1.5rem", borderRadius: 10,
            background: "#00d4aa", color: "#050d1a", fontWeight: 700, fontSize: "0.875rem",
            border: "none", cursor: "pointer", opacity: loading ? 0.6 : 1,
          }}>
            {loading ? "Analysing..." : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}
