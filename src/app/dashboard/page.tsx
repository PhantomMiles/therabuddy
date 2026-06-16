import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import MoodTracker from "@/components/MoodTracker";
import AssessmentForm from "@/components/AssessmentForm";
import ChatWindow from "@/components/ChatWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const role = (session.user as any).role;
  if (role === "therapist") redirect("/therapist");

  const userId = (session.user as any).id;
  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  const [totalMoods, totalChats, latestDiag, user] = await Promise.all([
    prisma.moodLog.count({ where: { userId } }),
    prisma.message.count({ where: { userId, role: "user" } }),
    prisma.diagnosticLog.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.user.findUnique({ where: { id: userId }, select: { dailyAffirmations: true } }),
  ]);

  const affirmations = [
    "You are doing your best, and that is enough.",
    "Your mental health is a priority. Your happiness is an essential.",
    "Small progress is still progress.",
    "You are worthy of care and compassion.",
    "It's okay to not be okay. Healing is not linear.",
    "You have survived 100% of your hardest days.",
    "Be kind to yourself today. You are doing great.",
  ];
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  const risk = (latestDiag?.risk ?? "low") as "low" | "moderate" | "high";
  const riskLabel = { low: "Low Risk", moderate: "Moderate Risk", high: "High Risk" };
  const wellnessScore = risk === "low" ? 82 : risk === "moderate" ? 55 : 28;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <AppShell>
      <div className="tb-container">

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500, marginBottom: "0.2rem", letterSpacing: "0.04em" }}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}
            </p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.9rem", color: "var(--text-primary)", fontWeight: 400, lineHeight: 1.2 }}>
              {greeting}, {firstName} <FontAwesomeIcon icon={faBrain} style={{ color: "var(--sage-500)", fontSize: "1.4rem", marginLeft: "0.2rem" }} />
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Here's your wellness overview for today
            </p>
          </div>
          <span className={`risk-${risk}`}>{riskLabel[risk]}</span>
        </div>

        {/* Affirmation */}
        {user?.dailyAffirmations && (
          <div style={{ 
            background: "var(--sage-50)", 
            border: "1px solid var(--sage-100)", 
            borderRadius: 18, 
            padding: "1.25rem 1.5rem", 
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <div style={{ 
              width: 40, height: 40, borderRadius: 12, background: "var(--sage-100)", 
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 
            }}>
              <FontAwesomeIcon icon={faBrain} style={{ color: "var(--sage-500)", fontSize: "1.1rem" }} />
            </div>
            <p style={{ fontStyle: "italic", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>
              &ldquo;{randomAffirmation}&rdquo;
            </p>
          </div>
        )}

        {/* Stats row */}
        <div className="tb-grid tb-grid-3" style={{ marginBottom: "1.25rem" }}>

          {/* Wellness score */}
          <div style={{
            background: "linear-gradient(135deg, var(--sage-600), var(--sage-500))",
            borderRadius: 20, padding: "1.75rem",
            boxShadow: "0 8px 24px rgba(140,109,224,0.25)",
            position: "relative", overflow: "hidden",
            gridColumn: "span 1",
          }}>
            <div style={{
              position: "absolute", top: -20, right: -20, width: 100, height: 100,
              borderRadius: "50%", background: "rgba(255,255,255,0.08)",
            }} />
            <div style={{
              position: "absolute", bottom: -30, right: 20, width: 70, height: 70,
              borderRadius: "50%", background: "rgba(255,255,255,0.05)",
            }} />
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>WELLNESS SCORE</p>
            <p style={{ fontSize: "3rem", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: "0.75rem" }}>
              {wellnessScore}<span style={{ fontSize: "1rem", fontWeight: 400, opacity: 0.7 }}>/100</span>
            </p>
            <div style={{ height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 100 }}>
              <div style={{ height: "100%", width: `${wellnessScore}%`, background: "rgba(255,255,255,0.85)", borderRadius: 100 }} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", marginTop: "0.5rem" }}>Based on your latest check-in</p>
          </div>

          {/* Mood logs */}
          <div className="tb-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>MOOD LOGS</p>
              <p style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{totalMoods}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "0.25rem" }}>Total check-ins</p>
            </div>
            <div style={{ display: "flex", gap: "0.2rem", alignItems: "flex-end", height: 32, marginTop: "1rem" }}>
              {[65, 80, 55, 90, 70, 85, 75].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, background: "var(--sage-200)", borderRadius: 3 }} />
              ))}
            </div>
          </div>

          {/* AI chats */}
          <div className="tb-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.5rem" }}>AI CHATS</p>
              <p style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{totalChats}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "0.25rem" }}>Messages sent</p>
            </div>
            <div style={{
              marginTop: "1rem", background: "var(--sage-50)",
              border: "1px solid var(--sage-100)",
              borderRadius: 8, padding: "0.4rem 0.75rem",
            }}>
              <p style={{ fontSize: "0.72rem", color: "var(--sage-600)", fontWeight: 600 }}>● AI support active</p>
            </div>
          </div>
        </div>

        {/* Mood + Assessment */}
        <div className="tb-grid tb-grid-2" style={{ marginBottom: "1.25rem" }}>
          <MoodTracker />
          <AssessmentForm />
        </div>

        {/* Chat */}
        <ChatWindow />

        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "1.5rem", opacity: 0.7 }}>
          Therabuddy is an AI companion, not a licensed therapist. If you&apos;re in crisis, please contact a mental health professional.
        </p>
      </div>
    </AppShell>
  );
}
