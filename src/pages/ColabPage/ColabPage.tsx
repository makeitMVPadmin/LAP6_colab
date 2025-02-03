import { useEffect } from "react"
import { getAllCalendarEventsById } from "../../firebase/functions/getCaledarEventsbyId"

export default function ColabPage() {
useEffect(() =>{
const fetcheventId=async(eventId:String)=>{
  const event=getAllCalendarEventsById(eventId);
  if(event){
    console.log('Event:',event);
  }else{
    console.log('No event found');
  }
}
fetcheventId();
},[])
  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}