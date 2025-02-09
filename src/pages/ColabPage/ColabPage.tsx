
import { createCalendarEvent } from '../../../firebase/functions/createCalendarEvent'
export default function ColabPage() {
  const handleClick = () => {
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
      const resonse = await createCalendarEvent(
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
      new Date('2025-02-10T11:00:00'),
      new Date('2025-02-10T12:00:00'),
      'Project Meeting',
      'RwXczeoWBfq4tEJ5BKoY',
      'confirmed',
      'google-event-id-123',
    )
  }

  return (
    <main>
      <h1>Welcome Colab User</h1>
      <button onClick={handleClick}>AddData</button>
    </main>
  )
}
