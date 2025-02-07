import { useEffect } from 'react'
import {addCalendarEvent} from '../../../firebase/functions/createCalendarEvent'
export default function ColabPage() {
  useEffect(() => {
    const addData = async (
      createdUserId: string,
      eventDescription: string,
      eventStartTime: Date,
      eventEndTime: Date,
      eventTitle: string,
      invitedUserId: string,
      eventStatus: 'confirmed' | 'pending' | 'canceled',
      googleEventId: string,
    ) => {
      const resonse = await addCalendarEvent(
        createdUserId,
        eventDescription,
        eventStartTime,
        eventEndTime,
        eventTitle,
        invitedUserId,
        eventStatus,
        googleEventId,
      )
      console.log(resonse)
    }
    addData(
      'rOkIPaJbpDxHABmnPGTN',
      'Team meeting to discuss project updates',
      new Date('2025-02-10T10:00:00'),
      new Date('2025-02-10T11:00:00'),
      'Project Meeting',
      'RwXczeoWBfq4tEJ5BKoY',
      'confirmed',
      'google-event-id-123',
    )
  }, [])

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}
