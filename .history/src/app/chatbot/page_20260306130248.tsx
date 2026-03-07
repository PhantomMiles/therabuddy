import Navbar from "@/components/Navbar"
import MoodTracker from "@/components/MoodTracker"
import AssessmentForm from "@/components/AssessmentForm"

export default function Dashboard(){

 return(

  <div>

   <Navbar/>

   <div className="p-10 grid md:grid-cols-2 gap-6">

    <MoodTracker/>
    <AssessmentForm/>

   </div>

  </div>

 )
}