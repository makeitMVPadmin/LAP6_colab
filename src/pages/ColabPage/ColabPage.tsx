import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import { useEffect } from 'react'
import {
  getCalendarEventsbyCreatorId,
  getCalendarEventsbyInvitedId,
} from '../../../firebase/functions/calendarEventsbyUserId'

export default function ColabPage() {
  useEffect(() => {
    const fetchCalendarEventsByCreatedUserId = async (createdId: string) => {
      const response = await getCalendarEventsbyCreatorId(createdId)
      console.log(response)
    }
    const fetchCalendarEventsByInvitedUserId = async (invitedId: string) => {
      const response = await getCalendarEventsbyInvitedId(invitedId)
      console.log(response)
    }
    fetchCalendarEventsByCreatedUserId('kF0omCJLN5cUlrngtOD5')
    fetchCalendarEventsByInvitedUserId('C0l9gkLHLD7jmHMZWObC')
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
