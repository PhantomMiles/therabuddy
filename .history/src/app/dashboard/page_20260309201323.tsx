import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
import MoodTracker from "@/components/MoodTracker";
import AssessmentForm from "@/components/AssessmentForm";

export default async function Dashboard() {

  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />

      <div className="p-10 grid md:grid-cols-2 gap-6">
        <MoodTracker />
        <AssessmentForm />
      </div>
    </>
  );
}