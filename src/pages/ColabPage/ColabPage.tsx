import { useEffect } from "react";
import { getAllCalendarEvents } from "../../firebase/functions/CalendarEvents";


export default function ColabPage() {
useEffect(()=>{
  const fetchAllEvents=async()=>{
    const response=await getAllCalendarEvents();
    console.log(response)
  }
 fetchAllEvents() 
},[])

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}