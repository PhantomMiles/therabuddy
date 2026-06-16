import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import InsightsDashboard from "@/components/InsightsDashboard";

export default async function InsightsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <AppShell>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--text-primary)", margin: 0 }}>
            Your Insights
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.3rem" }}>
            Track your emotional patterns and wellbeing over time.
          </p>
        </div>
        <InsightsDashboard />
      </div>
    </AppShell>
  );
}
