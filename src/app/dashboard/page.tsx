import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import MoodTracker from "@/components/MoodTracker";
import AssessmentForm from "@/components/AssessmentForm";
import ChatWindow from "@/components/ChatWindow";
import WellnessChart from "@/components/WellnessChart";

export default async function PatientDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const role = (session.user as any).role;
  if (role === "therapist") redirect("/therapist");

  const userId = (session.user as any).id;
  const firstName = session.user?.name?.split(" ")[0] ?? "there";

  const [totalMoods, totalChats, latestDiag, recentMoods] = await Promise.all([
    prisma.moodLog.count({ where: { userId } }),
    prisma.message.count({ where: { userId, role: "user" } }),
    prisma.diagnosticLog.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.moodLog.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 7 }),
  ]);

  const riskCfg = {
    low:      { color: "#10b981", bg: "#d1fae5", label: "Low" },
    moderate: { color: "#f59e0b", bg: "#fef3c7", label: "Moderate" },
    high:     { color: "#ef4444", bg: "#fee2e2", label: "High" },
  };
  const risk = (latestDiag?.risk ?? "low") as keyof typeof riskCfg;
  const rc = riskCfg[risk];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const wellnessScore = risk === "low" ? 82 : risk === "moderate" ? 55 : 28;

  return (
    <AppShell>
      <div style={{ padding: "1.75rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              {greeting}, {firstName} 👋
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.875rem", margin: "0.3rem 0 0" }}>
              Here&apos;s your wellness overview
            </p>
          </div>
          <div style={{
            background: rc.bg, color: rc.color,
            padding: "0.5rem 1.1rem", borderRadius: 100,
            fontSize: "0.78rem", fontWeight: 700,
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: rc.color }} />
            {rc.label} Risk Level
          </div>
        </div>

        {/* TOP ROW — Wellness score + stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>

          {/* Wellness Score card */}
          <div style={{
            background: "#050d1a", borderRadius: 16, padding: "1.5rem",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            gridColumn: "span 1",
          }}>
            <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 0.5rem" }}>Wellness Score</p>
            <p style={{ fontSize: "2.8rem", fontWeight: 900, color: "#00d4aa", margin: "0 0 0.75rem", lineHeight: 1 }}>{wellnessScore}<span style={{ fontSize: "1rem", color: "#475569", fontWeight: 400 }}>/100</span></p>
            <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 100 }}>
              <div style={{ height: "100%", width: `${wellnessScore}%`, background: "linear-gradient(90deg, #00d4aa, #0284c7)", borderRadius: 100, transition: "width 0.5s" }} />
            </div>
            <p style={{ color: "#475569", fontSize: "0.72rem", margin: "0.5rem 0 0" }}>Based on your latest check-in</p>
          </div>

          {/* Mood logs */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.25rem" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 0.5rem" }}>Mood Logs</p>
            <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.25rem" }}>{totalMoods}</p>
            <p style={{ color: "#94a3b8", fontSize: "0.78rem", margin: 0 }}>Total check-ins</p>
            <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.75rem", alignItems: "flex-end", height: 32 }}>
              {["😊","😐","😢","😊","😴","😊","😐"].map((e, i) => (
                <div key={i} style={{ flex: 1, height: `${60 + Math.random() * 40}%`, background: "#e0f2fe", borderRadius: 3 }} />
              ))}
            </div>
          </div>

          {/* Messages sent */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.25rem" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 0.5rem" }}>AI Chats</p>
            <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 0.25rem" }}>{totalChats}</p>
            <p style={{ color: "#94a3b8", fontSize: "0.78rem", margin: 0 }}>Messages sent</p>
            <div style={{
              marginTop: "0.75rem", background: "rgba(0,212,170,0.1)", borderRadius: 8,
              padding: "0.4rem 0.75rem",
            }}>
              <p style={{ fontSize: "0.72rem", color: "#00d4aa", fontWeight: 600, margin: 0 }}>AI support active</p>
            </div>
          </div>
        </div>

        {/* SECOND ROW — Mood + Assessment */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
          <MoodTracker />
          <AssessmentForm />
        </div>

        {/* BOTTOM — Chat */}
        <ChatWindow />

        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#cbd5e1", marginTop: "1.5rem" }}>
          Therabuddy is an AI companion, not a licensed therapist. If you&apos;re in crisis, please contact a mental health professional.
        </p>
      </div>
    </AppShell>
  );
}
