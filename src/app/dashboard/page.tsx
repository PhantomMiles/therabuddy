import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import MoodTracker from "@/components/MoodTracker";
import AssessmentForm from "@/components/AssessmentForm";
import ChatWindow from "@/components/ChatWindow";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const name = session.user?.name?.split(" ")[0] ?? "there";

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
            Good day, {name} 👋
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>How are you feeling today? Let&apos;s check in.</p>
        </div>

        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
          <MoodTracker />
          <AssessmentForm />
        </div>

        {/* Chat full width */}
        <ChatWindow />
      </div>
    </div>
  );
}
