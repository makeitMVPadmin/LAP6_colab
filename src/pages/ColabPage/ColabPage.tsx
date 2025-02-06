import { useEffect } from "react"

export default function ColabPage() {
  useEffect(()=>{
const addData=async()=>{
  addCalendarEvent()
}
addData('user123',
      'Team meeting to discuss project updates',
      new Date('2023-10-15T10:00:00'),
      new Date('2023-10-15T11:00:00'),
      'Project Meeting',
      'user456',
      EventStatus.Pending,
      'google-event-id-123');
  },[])

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}