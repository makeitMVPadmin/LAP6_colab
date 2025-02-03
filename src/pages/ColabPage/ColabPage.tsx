import { useEffect } from "react"
import { getAllCalendarEvents } from "../../firebase/functions/getAllCalendarEvents"

export default function ColabPage() {
  useEffect(()=>{
    const fetchAllCalendarEvents=async()=>{
      const response=await getAllCalendarEvents();
      console.log(response);
    }
    fetchAllCalendarEvents();
  },[])

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}