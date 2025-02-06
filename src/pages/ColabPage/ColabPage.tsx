import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import { useEffect } from 'react'
import {getCalendarEventsbyUserIds} from "../../../firebase/functions/calendarEventsbyUserId"
export default function ColabPage() {
  useEffect(() => {
    const fetchCalendarEventsByUserId = async (createdId: string,inviteeId:string) => {
    const response = await getCalendarEventsbyUserIds(createdId,inviteeId)
    console.log(response)
    }
   
    fetchCalendarEventsByUserId('rOkIPaJbpDxHABmnPGTN','RwXczeoWBfq4tEJ5BKoY')
    
    }, [])

  return (
    <main>
      <DummyNavBar />
      <div className="flex justify-center">
        <GoalBuddyCard />
      </div>
    </main>
  )
}
