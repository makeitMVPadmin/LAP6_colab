import { useEffect } from 'react'
import { getByEventId } from '../../firebase/functions/calendarEventById'

export default function ColabPage() {
  useEffect(() => {
    const fetchEventbyId = async (eventId: string) => {
      const response = await getByEventId(eventId)
      console.log(response)
    }
    fetchEventbyId('XPdxSr25jHeb5TzmCBTB')
  }, [])

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}
