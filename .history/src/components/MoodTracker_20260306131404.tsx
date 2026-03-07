"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSmile,
  faMeh,
  faFrown,
  faAngry,
  faBed,
} from '@fortawesome/free-solid-svg-icons';

export default function MoodTracker(){

 return(

  <div className="medical-card">

   <h2 className="text-xl font-semibold mb-4">
    Daily Mood
   </h2>

   <div className="flex gap-4 text-2xl">

    <FontAwesomeIcon icon={faSmile} title="Happy" className="cursor-pointer hover:text-green-500" />
    <FontAwesomeIcon icon={faMeh} title="Neutral" className="cursor-pointer hover:text-yellow-500" />
    <FontAwesomeIcon icon={faFrown} title="Sad" className="cursor-pointer hover:text-blue-500" />
    <FontAwesomeIcon icon={faAngry} title="Angry" className="cursor-pointer hover:text-red-500" />
    <FontAwesomeIcon icon={faBed} title="Tired" className="cursor-pointer hover:text-purple-500" />

   </div>

  </div>

 )
} 