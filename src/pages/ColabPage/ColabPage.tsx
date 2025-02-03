import { useEffect } from 'react'
import { getByEventId } from '../../firebase/functions/getByEventId'

export default function ColabPage() {
  useEffect(() => {
    const getbyId = async(eventId: string) => {
      const events = await getByEventId(eventId)
      console.log(events)
    }
    getbyId("1aM018MGW4YurFgjSr7m")
  }, [])
  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}
