"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const questions = [
  { id: "q1", text: "How's your overall mood been lately?", options: ["Very Good", "Okay", "Low / Sad", "Hopeless"] },
  { id: "q2", text: "How has your sleep been?", options: ["Sleeping well", "Slightly disrupted", "Poor sleep", "Can't sleep at all"] },
  { id: "q3", text: "Are you enjoying things you normally like?", options: ["Yes, fully", "Somewhat", "Barely", "Not at all"] },
  { id: "q4", text: "How are your energy levels?", options: ["High energy", "Normal", "Often tired", "Exhausted"] },
  { id: "q5", text: "Have you felt anxious or worried?", options: ["Not at all", "Occasionally", "Often", "Almost constantly"] },
];

type Result = { risk: "low" | "moderate" | "high"; summary: string; recommendation: string };

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
    if (step < questions.length - 1) setTimeout(() => setStep(s => s + 1), 220);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/assess", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    setResult(await res.json());
    setLoading(false);
  };

  const riskStyle = {
    low:      { color: "var(--low-color)",      bg: "var(--low-bg)",      label: "Low Risk"      },
    moderate: { color: "var(--moderate-color)", bg: "var(--moderate-bg)", label: "Moderate Risk" },
    high:     { color: "var(--high-color)",     bg: "var(--high-bg)",     label: "High Risk"     },
  };

  if (result) {
    const rs = riskStyle[result.risk];
    return (
      <div className="tb-card">
        <div style={{ marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: rs.color, background: rs.bg, padding: "0.25rem 0.8rem", borderRadius: 100 }}>
            {rs.label}
          </span>
        </div>
        <p style={{ fontSize: "0.9rem", color: "var(--text-primary)", lineHeight: 1.65, marginBottom: "1rem" }}>{result.summary}</p>
        <div style={{ background: "var(--sage-50)", border: "1px solid var(--sage-100)", borderRadius: 12, padding: "0.9rem 1rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--sage-600)", lineHeight: 1.6 }}>
            <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: "0.4rem", opacity: 0.8 }} />
            {result.recommendation}
          </p>
        </div>
        <button onClick={() => { setResult(null); setAnswers({}); setStep(0); }} style={{
          fontSize: "0.8rem", color: "var(--sage-600)", fontWeight: 600,
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}>← Take another check-in</button>
      </div>
    );
  }

  return (
    <div className="tb-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>Mental Check-in</h2>
          <p style={{ fontSize: "0.775rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
            Question {step + 1} of {questions.length}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 18 : 7, height: 7, borderRadius: 100,
              background: i < step ? "var(--sage-400)" : i === step ? "var(--sage-500)" : "var(--sage-100)",
              transition: "all 0.25s",
            }} />
          ))}
        </div>
      </div>

      <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "1rem", lineHeight: 1.5 }}>
        {current.text}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {current.options.map(opt => {
          const chosen = answers[current.id] === opt;
          return (
            <button key={opt} onClick={() => handleAnswer(opt)} style={{
              padding: "0.7rem 1rem", borderRadius: 11, textAlign: "left",
              border: chosen ? "1.5px solid var(--sage-400)" : "1.5px solid var(--sage-100)",
              background: chosen ? "var(--sage-50)" : "transparent",
              color: chosen ? "var(--sage-700)" : "var(--text-secondary)",
              fontSize: "0.875rem", fontWeight: chosen ? 500 : 400,
              cursor: "pointer", transition: "all 0.15s",
              fontFamily: "'DM Sans', sans-serif",
            }}>{opt}</button>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {step > 0 ? (
          <button onClick={() => setStep(s => s - 1)} style={{
            fontSize: "0.8rem", color: "var(--text-muted)", background: "none",
            border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>← Back</button>
        ) : <div />}
        {allAnswered && (
          <button onClick={handleSubmit} disabled={loading} className="tb-btn" style={{ fontSize: "0.825rem", padding: "0.55rem 1.25rem" }}>
            {loading ? "Analysing..." : "See Results →"}
          </button>
        )}
      </div>
    </div>
  );
}
