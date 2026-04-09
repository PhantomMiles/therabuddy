import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import InsightsDashboard from "@/components/InsightsDashboard";

export default async function InsightsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Insights</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your emotional patterns and wellbeing over time.
          </p>
        </div>
        <InsightsDashboard />
      </div>
    </div>
  );
}
