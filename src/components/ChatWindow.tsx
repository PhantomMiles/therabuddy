"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faBrain, faLightbulb } from "@fortawesome/free-solid-svg-icons";

type Msg = { role: "user" | "ai"; content: string };
type Diag = { risk: "low" | "moderate" | "high"; recommendation: string };

export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", content: "Hi! I'm Therabuddy. This is a safe, private space. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [diag, setDiag] = useState<Diag | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim(); setInput(""); setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
        if (data.diagnostic) setDiag(data.diagnostic);
      }
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I had trouble responding. Please try again." }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="tb-card" style={{ padding: 0, overflow: "hidden" }}>

      {/* Header */}
      <div style={{ padding: "1.1rem 1.5rem", borderBottom: "1px solid var(--sage-100)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--sage-300), var(--sage-500))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem",
          }}>
            <FontAwesomeIcon icon={faBrain} style={{ color: "#fff", fontSize: "1rem" }} />
          </div>
          <div>
            <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.875rem" }}>Therabuddy AI</p>
            <p style={{ fontSize: "0.7rem", color: "var(--sage-500)" }}>● Online · Ready to listen</p>
          </div>
        </div>
        {diag && (
          <span className={`risk-${diag.risk}`} style={{ fontSize: "0.68rem" }}>
            {diag.risk} risk
          </span>
        )}
      </div>

      {/* Messages */}
      <div style={{ height: 340, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem", background: "var(--warm-100)" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%", padding: "0.75rem 1rem",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              fontSize: "0.875rem", lineHeight: 1.65,
              ...(m.role === "user"
                ? { background: "var(--sage-500)", color: "#fff" }
                : { background: "#fff", color: "var(--text-primary)", border: "1px solid var(--sage-100)", boxShadow: "var(--shadow-sm)" }
              ),
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "0.75rem 1rem", background: "#fff", border: "1px solid var(--sage-100)", borderRadius: "18px 18px 18px 4px", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%", background: "var(--sage-300)",
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Recommendation */}
      {diag?.recommendation && (
        <div style={{ padding: "0.6rem 1.5rem", background: "var(--sage-50)", borderTop: "1px solid var(--sage-100)" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--sage-600)" }}>
            <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: "0.4rem", opacity: 0.8 }} />
            {diag.recommendation}
          </p>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--sage-100)", display: "flex", gap: "0.75rem", alignItems: "center", background: "#fff" }}>
        <input
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Tell me how you're feeling..."
          disabled={loading}
          className="tb-input"
          style={{ margin: 0 }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
          background: loading || !input.trim() ? "var(--sage-100)" : "var(--sage-500)",
          border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: loading || !input.trim() ? "var(--text-muted)" : "#fff",
          transition: "all 0.2s",
        }}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "0.85rem" }} />
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
