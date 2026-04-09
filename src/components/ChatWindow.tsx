"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Msg = { role: "user" | "ai"; content: string };
type Diagnostic = { risk: "low" | "moderate" | "high"; recommendation: string };

const riskBadge = {
  low: { bg: "#dcfce7", color: "#15803d", label: "Low risk" },
  moderate: { bg: "#fef9c3", color: "#a16207", label: "Moderate risk" },
  high: { bg: "#fee2e2", color: "#dc2626", label: "High risk" },
};

export default function ChatWindow() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", content: "Hi! I'm Therabuddy 💙 This is a safe, private space. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [diagnostic, setDiagnostic] = useState<Diagnostic | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput(""); setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
        if (data.diagnostic) setDiagnostic(data.diagnostic);
      }
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I had trouble responding. Please try again." }]);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden" }}>

      {/* Header */}
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #00d4aa, #0284c7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem",
          }}>🧠</div>
          <div>
            <p style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.9rem" }}>Therabuddy AI</p>
            <p style={{ fontSize: "0.72rem", color: "#10b981" }}>● Online · Ready to listen</p>
          </div>
        </div>
        {diagnostic && (
          <span style={{
            fontSize: "0.72rem", fontWeight: 700, padding: "0.25rem 0.75rem", borderRadius: 100,
            background: riskBadge[diagnostic.risk].bg, color: riskBadge[diagnostic.risk].color,
          }}>
            {riskBadge[diagnostic.risk].label}
          </span>
        )}
      </div>

      {/* Messages */}
      <div style={{ height: 380, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%", padding: "0.75rem 1rem", borderRadius: 16, fontSize: "0.875rem", lineHeight: 1.6,
              ...(m.role === "user"
                ? { background: "#0f172a", color: "#f1f5f9", borderBottomRightRadius: 4 }
                : { background: "#f8fafc", color: "#1e293b", border: "1px solid #f1f5f9", borderBottomLeftRadius: 4 }
              ),
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "0.75rem 1rem", background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 16, borderBottomLeftRadius: 4, color: "#94a3b8", fontSize: "0.85rem" }}>
              Therabuddy is typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Recommendation bar */}
      {diagnostic?.recommendation && (
        <div style={{ padding: "0.65rem 1.5rem", background: "#f0fdf4", borderTop: "1px solid #dcfce7" }}>
          <p style={{ fontSize: "0.78rem", color: "#15803d" }}>💡 {diagnostic.recommendation}</p>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #f1f5f9", display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Tell me how you're feeling..."
          disabled={loading}
          style={{
            flex: 1, padding: "0.75rem 1rem", borderRadius: 12,
            border: "1px solid #e2e8f0", background: "#f8fafc",
            fontSize: "0.875rem", color: "#0f172a", outline: "none",
          }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          width: 42, height: 42, borderRadius: "50%",
          background: loading || !input.trim() ? "#e2e8f0" : "#00d4aa",
          border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: loading || !input.trim() ? "#94a3b8" : "#050d1a",
          fontSize: "0.85rem", transition: "all 0.2s",
        }}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
