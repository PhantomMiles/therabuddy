"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAfrica, faBrain, faComments, faHeart,
  faChartLine, faShieldHalved, faArrowRight, faFaceSmileBeam, faFaceMeh, faFaceSadTear, faFaceAngry, faFaceTired,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook, faTwitter, faInstagram, faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(0);

  return (
    <main style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", minHeight: "100vh", color: "var(--text-primary)", position: "relative", overflowX: "hidden" }}>
      {/* Background Blobs */}
      <div className="tb-blob-container">
        <div className="tb-blob tb-blob-1"></div>
        <div className="tb-blob tb-blob-2"></div>
        <div className="tb-blob tb-blob-3"></div>
      </div>

      {/* ── NAV ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 2.5rem",
        background: "var(--violet-50)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--glass-border)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          transition: "opacity 0.2s"
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "rgba(255,255,255,0.8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)",
            border: "1px solid var(--glass-border)",
            overflow: "hidden",
          }}>
            <Image src="/therabuddy.png" alt="Therabuddy Logo" width={44} height={44} priority style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
          <h3 style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            fontFamily: "'DM Serif Display', serif",
            margin: 0
          }}>
            Therabuddy
          </h3>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/login" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>Login</Link>
          <Link href="/signup" className="tb-btn" style={{ textDecoration: "none", padding: "0.6rem 1.4rem" }}>Get Started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "88vh", position: "relative", zIndex: 5
      }}>
        {/* Left */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "4rem 3rem 4rem 5rem",
          borderRight: "1px solid var(--glass-border)",
        }}>
          

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
            lineHeight: 1.15, color: "var(--text-primary)",
            fontWeight: 400, marginBottom: "1.75rem",
            letterSpacing: "-0.01em",
          }}>
            Care your mind.<br />
            <span style={{
              background: "linear-gradient(135deg, var(--violet-500) 0%, #c084fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600
            }}>Find your calm.</span>
          </h1>

          <p style={{
            fontSize: "1.05rem", color: "var(--text-secondary)",
            lineHeight: 1.8, maxWidth: 440, marginBottom: "2.5rem",
          }}>
            AI-powered mental health support designed for African students and professionals. Talk freely. Track your mood. Get insights that matter.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <Link href="/signup" className="tb-btn" style={{ textDecoration: "none", padding: "0.9rem 2.2rem", fontSize: "0.95rem" }}>
              Start for free <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem", marginLeft: "0.25rem" }} />
            </Link>
            <Link href="/login" className="tb-btn-ghost" style={{ textDecoration: "none", padding: "0.9rem 1.8rem" }}>
              Sign in
            </Link>
          </div>

          {/* Social proof row */}
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {[
              { num: "98%", label: "Feel heard" },
              { num: "24/7", label: "Always available" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{num}</p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.3rem", fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — visual panel */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "3rem 5rem 3rem 3rem", gap: "1.5rem", position: "relative",
        }}>
          {/* Wellness score card */}
          <div className="tb-card glow-purple" style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: 24, padding: "1.5rem",
          }}>
            <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.75rem" }}>YOUR WELLNESS SCORE</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "3rem", fontWeight: 800, color: "var(--violet-600)", lineHeight: 1 }}>78</span>
              <span style={{ fontSize: "1.1rem", color: "var(--text-muted)", fontWeight: 500 }}>/100</span>
              <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--low-color)", background: "var(--low-bg)", padding: "0.25rem 0.75rem", borderRadius: 100, fontWeight: 600 }}>Low risk</span>
            </div>
            <div style={{ height: 8, background: "var(--violet-100)", borderRadius: 100 }}>
              <div style={{ height: "100%", width: "78%", background: "linear-gradient(-90deg, var(--sky-400), var(--pink-200), var(--violet-200))", borderRadius: 100 }} />
            </div>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.6rem" }}>↑ 12 points from last week</p>
          </div>

          {/* Chat preview card */}
          <div className="tb-card glow-purple" style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: 24, padding: "1.25rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--pink-200), var(--violet-600))",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(139, 92, 246, 0.2)"
              }}>
                <FontAwesomeIcon icon={faBrain} style={{ color: "#fff", fontSize: "0.8rem" }} />
              </div>
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Therabuddy AI</p>
                <p style={{ fontSize: "0.68rem", color: "#10b981", margin: 0, fontWeight: 500 }}>● Online</p>
              </div>
            </div>
            <div style={{ background: "rgba(255, 255, 255, 0.45)", border: "1px solid var(--glass-border)", borderRadius: "18px 18px 18px 4px", padding: "0.75rem 1rem", marginBottom: "0.75rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", lineHeight: 1.55, margin: 0 }}>
                How are you feeling today? I&apos;m here to listen 🌿
              </p>
            </div>
            <div style={{ background: "linear-gradient(-135deg, var(--violet-400) 0%, var(--sky-400) 100%)", borderRadius: "18px 18px 4px 18px", padding: "0.75rem 1rem", maxWidth: "80%", marginLeft: "auto", boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)" }}>
              <p style={{ fontSize: "0.85rem", color: "#fff", lineHeight: 1.55, margin: 0 }}>I&apos;ve been a bit anxious lately...</p>
            </div>
          </div>

          {/* Mood row */}
          <div className="tb-card" style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: 20, padding: "1rem 1.25rem",
            display: "flex", alignItems: "center", gap: "1rem",
          }}>
            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>TODAY&apos;S MOOD</p>
            <div style={{ display: "flex", gap: "0.5rem", flex: 1, position: "relative" }}>
              {/* The Slider Background */}
              <div style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "calc((100% - 2rem) / 5)", // 2rem is the total gap (0.5rem * 4)
                left: `calc(${selectedMood} * (20% + 0.1rem))`,
                background: "linear-gradient(135deg, var(--blue-100), var(--blue-200))",
                borderRadius: 10,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 0,
              }} />

              {[faFaceSmileBeam, faFaceMeh, faFaceSadTear, faFaceAngry, faFaceTired].map((e, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedMood(i)}
                  style={{
                    flex: 1, textAlign: "center", fontSize: "1.3rem",
                    padding: "0.45rem 0", borderRadius: 10,
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.3s ease",
                    color: selectedMood === i ? "var(--violet-600)" : "var(--text-muted)",
                    opacity: selectedMood === i ? 1 : 0.5,
                  }}
                >
                  <FontAwesomeIcon icon={e} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{
        width: "100%",
        position: "relative",
        paddingTop: "60px",
        paddingBottom: "60px",
        zIndex: 5,
        borderTop: "1px solid var(--violet-200)",
      }}>
        <div className="tb-container">
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.5rem", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "1rem" }}>
              Everything you need to feel better
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 600, fontWeight: 500 }}>
              Therabuddy combines AI diagnostics with compassionate conversation to support your mental wellness journey.
            </p>
          </div>
          <div className="tb-grid tb-grid-3">
            {[
              { icon: faBrain, title: "AI Diagnostics", desc: "Real-time detection of anxiety, depression & burnout using evidence-based screening logic." },
              { icon: faComments, title: "Safe Chat", desc: "Talk to Therabuddy anytime. Private, non-judgmental, available around the clock." },
              { icon: faChartLine, title: "Mood Insights", desc: "Track your emotional patterns over time with a beautiful personal wellness dashboard." },
              { icon: faShieldHalved, title: "Crisis Detection", desc: "High-risk flags trigger immediate support resources and professional referrals." },
              { icon: faGlobeAfrica, title: "Built for Africa", desc: "Culturally sensitive support designed for African students and professionals." },
              { icon: faHeart, title: "Coping Tools", desc: "Guided breathing, journaling prompts, and grounding exercises built right in." },
            ].map(f => (
              <div key={f.title} className="tb-card glow-purple" style={{
                transition: "all 0.3s ease",
                cursor: "default",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(139, 92, 246, 0.12)";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "var(--violet-100)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem",
                }}>
                  <FontAwesomeIcon icon={f.icon} style={{ color: "var(--blue-600)", fontSize: "1rem" }} />
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
            <Link href="/signup" className="tb-btn" style={{ textDecoration: "none", padding: "1rem 2.5rem", fontSize: "1rem" }}>
              Get started free
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{
        margin: "0 2rem 4rem",
        background: "linear-gradient(135deg, var(--pink-600) 0%, var(--peach-500) 100%)",
        borderRadius: 32, padding: "4rem",
        display: "grid", gridTemplateColumns: "1fr auto",
        alignItems: "center", gap: "2rem",
        boxShadow: "0 20px 50px rgba(139, 92, 246, 0.25)",
        position: "relative", overflow: "hidden",
        zIndex: 5
      }}>
        <div style={{
          position: "absolute", top: -40, right: 200, width: 220, height: 220,
          borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: 100, width: 180, height: 180,
          borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.2rem", fontWeight: 400, color: "#fff", marginBottom: "0.75rem" }}>
            Start your wellness journey today.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem" }}>Free to use. No stigma. Just support.</p>
        </div>
        <Link href="/signup" style={{
          background: "#fff", color: "var(--violet-700)",
          padding: "0.9rem 2.2rem", borderRadius: "100px",
          textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
          whiteSpace: "nowrap", flexShrink: 0,
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease",
          position: "relative", zIndex: 2,
        }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
          Create free account <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "0.8rem" }} />
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--glass-border)",
        padding: "3rem 4rem 2rem",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        position: "relative",
        zIndex: 5
      }}>
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          transition: "opacity 0.2s"
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid var(--glass-border)",
            overflow: "hidden",
          }}>
            <Image src="/therabuddy.png" alt="Therabuddy Logo" width={38} height={38} priority style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.1rem",
            color: "var(--text-primary)",
            fontWeight: 700
          }}>
            Therabuddy
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <FontAwesomeIcon icon={faFacebook} style={{ fontSize: "1.4rem", color: "var(--text-muted)" }} />
          <FontAwesomeIcon icon={faTwitter} style={{ fontSize: "1.4rem", color: "var(--text-muted)" }} />
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "1.4rem", color: "var(--text-muted)" }} />
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "1.4rem", color: "var(--text-muted)" }} />
          <FontAwesomeIcon icon={faGlobeAfrica} style={{ fontSize: "1.4rem", color: "var(--text-muted)" }} />
        </div>
        <hr style={{ borderColor: "var(--glass-border)", width: "100%", margin: "1.5rem 0" }} />
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: 520, textAlign: "center", lineHeight: 1.6, fontWeight: 500 }}>
            © 2026 Therabuddy · AI companion, not a licensed therapist.
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", maxWidth: 520, textAlign: "center", lineHeight: 1.6, fontWeight: 500 }}>
            If you&apos;re in crisis, please contact a mental health professional.
          </p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section { grid-template-columns: 1fr !important; }
          section > div { padding: 2.5rem 1.5rem !important; }
        }
      `}</style>
    </main>
  );
}
