import { createCalendarEvent,EventData} from '../../../firebase/functions/createCalendarEvent'
export default function ColabPage() {
  const handleClick = async () => {
    const eventData:EventData = {
      createdUserId: 'yLVEZkRulVkRU8de8XMb',
      eventDescription: 'Team collaboration fix the bugs',
      eventStartTime: new Date('2025-02-11T11:00:00'),
      eventEndTime: new Date('2025-02-11T11:30:00'),
      eventTitle: 'Team meeting to ensure reliabality',
      invitedUserId: 'RwXczeoWBfq4tEJ5BKoY',
      eventStatus: 'confirmed',
      googleEventId: 'google-12346',
    }
    const response = await createCalendarEvent(eventData)
    console.log(response)
  }

  return (
    <>
      <h1>Welcome Colab User</h1>
      <button onClick={handleClick}>Add Data</button>
    </>
  )
}
