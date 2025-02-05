import { useEffect } from 'react'
import { getUserById } from '../../../firebase/functions/getUserById'

export default function ColabPage() {
  useEffect(() => {
    const getUser = async (userId: string) => {
      const response = await getUserById(userId)
      console.clear()
      console.log(response)
      }
      getUser('0W31kFBEOtbCEhjXULI7')
  }, [])

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}
