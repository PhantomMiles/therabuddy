import Link from "next/link";

export default function Home() {
  return (
    <main className="tb-landing">

      {/* NAV */}
      <nav className="tb-nav">
        <div className="tb-logo">
          <div className="tb-logo-icon">T</div>
          <span>Therabuddy</span>
        </div>
        <div className="tb-nav-links">
          <Link href="/login">Login</Link>
          <Link href="/signup" className="tb-btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="tb-hero">
        <div className="tb-hero-glow tb-glow-1" />
        <div className="tb-hero-glow tb-glow-2" />
        <div className="tb-hero-content">
          <div className="tb-badge">AI-Powered · Built for Africa</div>
          <h1 className="tb-hero-title">
            Your mental health<br />
            <span className="tb-accent">companion</span> is here.
          </h1>
          <p className="tb-hero-sub">
            Talk freely. Get support. Understand yourself better.
            Therabuddy uses AI to detect early signs of anxiety and depression
            and guide you toward healing — privately, affordably, any time.
          </p>
          <div className="tb-hero-actions">
            <Link href="/signup" className="tb-btn-hero">Start for free</Link>
            <Link href="/login" className="tb-btn-ghost">I have an account</Link>
          </div>
          <p className="tb-hero-note">No credit card · Fully private · Available 24/7</p>
        </div>

        {/* Floating card preview */}
        <div className="tb-hero-cards">
          <div className="tb-preview-card tb-card-chat">
            <div className="tb-card-dot tb-dot-ai" />
            <div className="tb-card-msg ai">How are you feeling today? I&apos;m here to listen 💙</div>
            <div className="tb-card-dot tb-dot-user" />
            <div className="tb-card-msg user">I&apos;ve been really anxious lately...</div>
          </div>
          <div className="tb-preview-card tb-card-risk">
            <div className="tb-risk-label">Wellness Score</div>
            <div className="tb-risk-value">72<span>/100</span></div>
            <div className="tb-risk-bar">
              <div className="tb-risk-fill" style={{ width: "72%" }} />
            </div>
            <div className="tb-risk-status moderate">Moderate · Monitor closely</div>
          </div>
          <div className="tb-preview-card tb-card-mood">
            <div className="tb-mood-label">Today&apos;s mood</div>
            <div className="tb-mood-emojis">
              <span className="active">😊</span>
              <span>😐</span>
              <span>😢</span>
              <span>😠</span>
              <span>😴</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="tb-features">
        <h2 className="tb-section-title">Everything you need to feel better</h2>
        <div className="tb-features-grid">
          {[
            { icon: "🧠", title: "AI Diagnostics", desc: "Real-time detection of anxiety, depression & burnout signals using evidence-based screening." },
            { icon: "💬", title: "Safe Chat", desc: "Talk to Therabuddy anytime. Completely private, non-judgmental, available 24/7." },
            { icon: "📊", title: "Mood Insights", desc: "Track your emotional patterns over time with a personal wellness dashboard." },
            { icon: "🛡️", title: "Crisis Detection", desc: "High-risk flags trigger immediate support resources and professional referrals." },
            { icon: "🌍", title: "Built for Africa", desc: "Culturally sensitive support designed for the realities of African students and professionals." },
            { icon: "💊", title: "Coping Tools", desc: "Guided breathing, journaling prompts, and grounding exercises built right in." },
          ].map((f) => (
            <div key={f.title} className="tb-feature-card">
              <div className="tb-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="tb-cta">
        <div className="tb-cta-glow" />
        <h2>Start your wellness journey today.</h2>
        <p>Free to use. No stigma. Just support.</p>
        <Link href="/signup" className="tb-btn-hero">Create your free account</Link>
      </section>

      {/* FOOTER */}
      <footer className="tb-footer">
        <div className="tb-logo">
          <div className="tb-logo-icon">T</div>
          <span>Therabuddy</span>
        </div>
        <p>© 2025 Therabuddy · Built with care for Africa&apos;s mental health</p>
        <p className="tb-disclaimer">
          Therabuddy is an AI companion, not a licensed therapist. If you&apos;re in crisis,
          please contact a mental health professional or local helpline immediately.
        </p>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tb-landing {
          background: #050d1a;
          color: #e8edf5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* NAV */
        .tb-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: sticky;
          top: 0;
          background: rgba(5,13,26,0.9);
          backdrop-filter: blur(12px);
          z-index: 100;
        }
        .tb-logo { display: flex; align-items: center; gap: 0.6rem; font-weight: 700; font-size: 1.1rem; color: #fff; text-decoration: none; }
        .tb-logo-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, #00d4aa, #0284c7);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.9rem; color: #fff;
        }
        .tb-nav-links { display: flex; align-items: center; gap: 1.5rem; }
        .tb-nav-links a { color: #94a3b8; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
        .tb-nav-links a:hover { color: #fff; }
        .tb-btn-primary {
          background: #00d4aa; color: #050d1a !important;
          padding: 0.5rem 1.25rem; border-radius: 8px;
          font-weight: 600; font-size: 0.875rem !important;
          transition: opacity 0.2s !important;
        }
        .tb-btn-primary:hover { opacity: 0.85; }

        /* HERO */
        .tb-hero {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          min-height: 88vh;
          padding: 5rem 2.5rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .tb-hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .tb-glow-1 {
          width: 500px; height: 500px;
          background: rgba(0,212,170,0.12);
          top: -100px; left: -100px;
        }
        .tb-glow-2 {
          width: 400px; height: 400px;
          background: rgba(2,132,199,0.1);
          bottom: 0; right: -80px;
        }
        .tb-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0,212,170,0.12);
          border: 1px solid rgba(0,212,170,0.25);
          color: #00d4aa;
          padding: 0.35rem 0.9rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .tb-hero-title {
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .tb-accent { color: #00d4aa; }
        .tb-hero-sub {
          font-size: 1.05rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 2rem;
        }
        .tb-hero-actions { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; }
        .tb-btn-hero {
          background: #00d4aa;
          color: #050d1a;
          padding: 0.85rem 2rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: transform 0.2s, opacity 0.2s;
          display: inline-block;
        }
        .tb-btn-hero:hover { transform: translateY(-2px); opacity: 0.9; }
        .tb-btn-ghost {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.85rem 1.25rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          transition: border-color 0.2s, color 0.2s;
        }
        .tb-btn-ghost:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
        .tb-hero-note { font-size: 0.78rem; color: #475569; }

        /* HERO CARDS */
        .tb-hero-cards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }
        .tb-preview-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.25rem;
          backdrop-filter: blur(8px);
        }
        .tb-card-chat { display: flex; flex-direction: column; gap: 0.75rem; }
        .tb-card-dot { width: 6px; height: 6px; border-radius: 50%; }
        .tb-dot-ai { background: #00d4aa; }
        .tb-dot-user { background: #0284c7; align-self: flex-end; }
        .tb-card-msg {
          padding: 0.6rem 0.9rem;
          border-radius: 12px;
          font-size: 0.85rem;
          max-width: 85%;
          line-height: 1.5;
        }
        .tb-card-msg.ai { background: rgba(0,212,170,0.1); color: #cbd5e1; border-bottom-left-radius: 4px; }
        .tb-card-msg.user { background: rgba(2,132,199,0.15); color: #cbd5e1; align-self: flex-end; border-bottom-right-radius: 4px; }
        .tb-risk-label { font-size: 0.75rem; color: #64748b; margin-bottom: 0.5rem; }
        .tb-risk-value { font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; }
        .tb-risk-value span { font-size: 1rem; color: #475569; font-weight: 400; }
        .tb-risk-bar { height: 6px; background: rgba(255,255,255,0.08); border-radius: 100px; margin-bottom: 0.75rem; }
        .tb-risk-fill { height: 100%; background: linear-gradient(90deg, #00d4aa, #0284c7); border-radius: 100px; }
        .tb-risk-status { font-size: 0.78rem; font-weight: 600; }
        .tb-risk-status.moderate { color: #f59e0b; }
        .tb-mood-label { font-size: 0.75rem; color: #64748b; margin-bottom: 0.75rem; }
        .tb-mood-emojis { display: flex; gap: 1rem; font-size: 1.5rem; }
        .tb-mood-emojis span { opacity: 0.35; cursor: pointer; transition: opacity 0.2s, transform 0.2s; }
        .tb-mood-emojis span.active { opacity: 1; transform: scale(1.2); }

        /* FEATURES */
        .tb-features {
          padding: 6rem 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .tb-section-title {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #fff;
          text-align: center;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
        }
        .tb-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .tb-feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.75rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .tb-feature-card:hover {
          border-color: rgba(0,212,170,0.2);
          background: rgba(0,212,170,0.04);
        }
        .tb-feature-icon { font-size: 1.75rem; margin-bottom: 1rem; }
        .tb-feature-card h3 { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
        .tb-feature-card p { font-size: 0.875rem; color: #64748b; line-height: 1.65; }

        /* CTA */
        .tb-cta {
          text-align: center;
          padding: 6rem 2.5rem;
          position: relative;
          overflow: hidden;
        }
        .tb-cta-glow {
          position: absolute;
          width: 600px; height: 300px;
          background: rgba(0,212,170,0.08);
          border-radius: 50%;
          filter: blur(60px);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .tb-cta h2 { font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; position: relative; }
        .tb-cta p { color: #64748b; margin-bottom: 2rem; position: relative; }

        /* FOOTER */
        .tb-footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 2.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .tb-footer p { font-size: 0.8rem; color: #334155; }
        .tb-disclaimer { max-width: 520px; font-size: 0.72rem !important; color: #1e293b !important; }

        @media (max-width: 768px) {
          .tb-hero { grid-template-columns: 1fr; padding: 3rem 1.5rem; min-height: auto; }
          .tb-hero-cards { display: none; }
          .tb-nav { padding: 1rem 1.5rem; }
          .tb-features { padding: 4rem 1.5rem; }
          .tb-cta { padding: 4rem 1.5rem; }
        }
      `}</style>
    </main>
  );
}
