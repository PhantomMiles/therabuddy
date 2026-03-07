"use client"

export default function AssessmentForm(){

 return(

  <div className="medical-card">

   <h2 className="text-xl font-semibold mb-4">
    Mental Health Check
   </h2>

   <div className="space-y-3">

    <p>How have you been feeling recently?</p>

    <select className="border p-2 rounded w-full">
     <option>Very Good</option>
     <option>Okay</option>
     <option>Stressed</option>
     <option>Anxious</option>
     <option>Depressed</option>
    </select>

    <button className="primary-btn">
     Submit
    </button>

   </div>

  </div>

 )
}