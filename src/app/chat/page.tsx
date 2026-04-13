import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import ChatWindow from "@/components/ChatWindow";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <AppShell>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
            Talk to Therabuddy
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "0.3rem" }}>
            A safe, private space to share how you&apos;re feeling. Everything is confidential.
          </p>
        </div>
        <ChatWindow />
        <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#cbd5e1", marginTop: "1rem" }}>
          Therabuddy is an AI companion, not a licensed therapist. If you&apos;re in crisis, please contact a mental health professional.
        </p>
      </div>
    </AppShell>
  );
}
