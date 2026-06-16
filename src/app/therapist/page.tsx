import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/AppShell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarCheck, faChartLine, faUserPlus, faBrain } from "@fortawesome/free-solid-svg-icons";

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
    { icon: faUsers,        label: "Total Patients",  value: totalPatients,      color: "var(--sage-600)",  bg: "var(--sage-100)" },
    { icon: faCalendarCheck,label: "Sessions",         value: totalSessions,      color: "#5c7a9e",          bg: "#e8eef5"         },
    { icon: faChartLine,    label: "Completed",        value: completedSessions,  color: "var(--low-color)", bg: "var(--low-bg)"   },
    { icon: faUserPlus,     label: "New This Week",    value: patients.filter(p => {
      const d = new Date(p.createdAt);
      return (Date.now() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
    }).length, color: "var(--moderate-color)", bg: "var(--moderate-bg)" },
  ];

  const riskCfg: Record<string, { color: string; bg: string }> = {
    low:      { color: "var(--low-color)",      bg: "var(--low-bg)"      },
    moderate: { color: "var(--moderate-color)", bg: "var(--moderate-bg)" },
    high:     { color: "var(--high-color)",     bg: "var(--high-bg)"     },
  };

  const patientDiags = await Promise.all(
    patients.map(p => prisma.diagnosticLog.findFirst({ where: { userId: p.id }, orderBy: { createdAt: "desc" } }))
  );

  return (
    <AppShell>
      <div className="tb-container">

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "0.2rem" }}>
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}
          </p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", margin: 0 }}>
            {greeting}, Dr. {firstName} <FontAwesomeIcon icon={faBrain} style={{ color: "var(--sage-500)", fontSize: "1.4rem", marginLeft: "0.2rem" }} />
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
            Here's your practice overview for today
          </p>
        </div>

        {/* Stats */}
        <div className="tb-grid tb-grid-4" style={{ marginBottom: "1.75rem" }}>
          {stats.map(({ icon, label, value, color, bg }) => (
            <div key={label} className="tb-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{label}</p>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FontAwesomeIcon icon={icon} style={{ fontSize: "0.85rem", color }} />
                </div>
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Patient list */}
        <div className="tb-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Recent Patients</h2>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{patients.length} registered</span>
          </div>

          {patients.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
              <FontAwesomeIcon icon={faUsers} style={{ fontSize: "2rem", opacity: 0.3, marginBottom: "0.75rem", display: "block" }} />
              <p style={{ fontSize: "0.875rem" }}>No patients yet. They&apos;ll appear here after signing up.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {patients.map((patient, i) => {
                const diag = patientDiags[i];
                const risk = (diag?.risk ?? "low") as keyof typeof riskCfg;
                const rc = riskCfg[risk];
                return (
                  <div key={patient.id} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "0.875rem 1rem", borderRadius: 14,
                    background: "var(--warm-100)", border: "1px solid var(--sage-100)",
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, var(--sage-300), var(--sage-500))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.9rem", color: "#fff",
                    }}>
                      {patient.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.875rem", margin: 0 }}>{patient.name ?? "Unnamed"}</p>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{patient.email}</p>
                    </div>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: 100, background: rc.bg, color: rc.color, textTransform: "capitalize", flexShrink: 0 }}>
                      {risk} risk
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", flexShrink: 0 }}>
                      {new Date(patient.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Coming soon banner */}
        <div style={{
          marginTop: "1.25rem",
          background: "linear-gradient(135deg, var(--sage-600), var(--sage-500))",
          borderRadius: 18, padding: "1.25rem 1.5rem",
          display: "flex", alignItems: "center", gap: "1rem",
          boxShadow: "0 8px 24px rgba(119,86,207,0.2)",
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FontAwesomeIcon icon={faChartLine} style={{ color: "#fff", fontSize: "1rem" }} />
          </div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>Patient insights coming soon</p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.78rem", margin: 0 }}>Detailed analytics, session notes, and progress tracking will be available in the next update.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
