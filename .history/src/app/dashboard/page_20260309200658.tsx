import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"
import ProtectedRoute from "@/components/ProtectedRoute"
import MoodTracker from "@/components/MoodTracker"
import AssessmentForm from "@/components/AssessmentForm"

export default function Dashboard(){

 return(

  <ProtectedRoute>

   <Navbar/>

   <div className="p-10 grid md:grid-cols-2 gap-6">

    <MoodTracker/>
    <AssessmentForm/>

   </div>

  </ProtectedRoute>

 )

}