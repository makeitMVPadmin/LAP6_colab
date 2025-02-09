
import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import { useEffect } from 'react'
import {Timestamp} from 'firebase/firestore'
import {getUserEvents} from "../../../firebase/functions/calendarEventsbyUserId"

export default function ColabPage() {
  useEffect(() => {
    const fetchEvents = async () => {
    try {
    const userId = 'RwXczeoWBfq4tEJ5BKoY'
    const todayUTC = new Date()
    todayUTC.setUTCHours(0, 0, 0, 0) // Reset to 00:00:00 UTC
    const dateTimestamp = Timestamp.fromDate(todayUTC)
    const userEvents = await getUserEvents(userId, dateTimestamp)
    console.log(userEvents)
    } catch (error) {
    console.error('Failed to fetch events: ', error)
    }
    }
    fetchEvents()
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
