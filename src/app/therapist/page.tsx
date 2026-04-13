import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarCheck, faChartLine, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default async function TherapistDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const role = (session.user as any).role;
  if (role !== "therapist") redirect("/dashboard");

  const firstName = session.user?.name?.split(" ")[0] ?? "Doctor";
  const therapistId = (session.user as any).id;

  const [totalPatients, totalSessions, completedSessions, patients] = await Promise.all([
    prisma.therapySession.groupBy({ by: ["patientId"], where: { therapistId } }).then(r => r.length),
    prisma.therapySession.count({ where: { therapistId } }),
    prisma.therapySession.count({ where: { therapistId, status: "completed" } }),
    prisma.user.findMany({ where: { role: "patient" }, take: 8, orderBy: { createdAt: "desc" } }),
  ]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    { icon: faUsers, label: "Total Patients", value: totalPatients, color: "#0284c7", bg: "#dbeafe" },
    { icon: faCalendarCheck, label: "Sessions", value: totalSessions, color: "#00d4aa", bg: "#d1fae5" },
    { icon: faChartLine, label: "Completed", value: completedSessions, color: "#10b981", bg: "#dcfce7" },
    { icon: faUserPlus, label: "New This Week", value: patients.filter(p => {
      const d = new Date(p.createdAt);
      const now = new Date();
      return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
    }).length, color: "#f59e0b", bg: "#fef3c7" },
  ];

  const riskCfg: Record<string, { color: string; bg: string }> = {
    low:      { color: "#10b981", bg: "#d1fae5" },
    moderate: { color: "#f59e0b", bg: "#fef3c7" },
    high:     { color: "#ef4444", bg: "#fee2e2" },
  };

  // Get latest diagnostic for each patient
  const patientDiags = await Promise.all(
    patients.map(p =>
      prisma.diagnosticLog.findFirst({ where: { userId: p.id }, orderBy: { createdAt: "desc" } })
    )
  );

  return (
    <AppShell>
      <div style={{ padding: "1.75rem 1.5rem", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            {greeting}, Dr. {firstName} 👋
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", margin: "0.3rem 0 0" }}>
            Here&apos;s your practice overview for today
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.75rem" }}>
          {stats.map(({ icon, label, value, color, bg }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <p style={{ color: "#94a3b8", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{label}</p>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FontAwesomeIcon icon={icon} style={{ fontSize: "0.95rem", color }} />
                </div>
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Patient list */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Recent Patients</h2>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{patients.length} registered</span>
          </div>

          {patients.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
              <p style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>👥</p>
              <p style={{ fontSize: "0.875rem", margin: 0 }}>No patients yet. They&apos;ll appear here after signing up.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {patients.map((patient, i) => {
                const diag = patientDiags[i];
                const risk = (diag?.risk ?? "low") as keyof typeof riskCfg;
                const rc = riskCfg[risk];
                return (
                  <div key={patient.id} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.875rem 1rem", borderRadius: 12,
                    background: "#f8fafc", border: "1px solid #f1f5f9",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, #00d4aa, #0284c7)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.9rem", color: "#fff",
                    }}>
                      {patient.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.875rem", margin: 0 }}>{patient.name ?? "Unnamed"}</p>
                      <p style={{ color: "#94a3b8", fontSize: "0.75rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{patient.email}</p>
                    </div>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.75rem",
                      borderRadius: 100, background: rc.bg, color: rc.color,
                      textTransform: "capitalize", flexShrink: 0,
                    }}>
                      {risk} risk
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8", flexShrink: 0 }}>
                      {new Date(patient.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Info banner */}
        <div style={{
          marginTop: "1.25rem", background: "#050d1a", borderRadius: 16, padding: "1.25rem 1.5rem",
          display: "flex", alignItems: "center", gap: "1rem",
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,170,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FontAwesomeIcon icon={faChartLine} style={{ color: "#00d4aa", fontSize: "1rem" }} />
          </div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>Patient insights coming soon</p>
            <p style={{ color: "#475569", fontSize: "0.78rem", margin: 0 }}>Detailed analytics, session notes, and progress tracking will be available in the next update.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
