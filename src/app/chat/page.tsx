import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import ChatWindow from "@/components/ChatWindow";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Talk to Therabuddy</h1>
          <p className="text-sm text-gray-500 mt-1">
            A safe, private space to share how you&apos;re feeling. Everything is confidential.
          </p>
        </div>
        <ChatWindow />
        <p className="text-xs text-center text-gray-400 mt-4">
          Therabuddy is an AI companion, not a licensed therapist. If you&apos;re in crisis, please contact a mental health professional or call a helpline.
        </p>
      </div>
    </div>
  );
}
