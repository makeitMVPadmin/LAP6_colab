import { useEffect } from 'react'
import { getAllUsers } from '../../../firebase/functions/users'

export default function ColabPage() {
  useEffect(() => {
    const getUsers = async () => {
      const data = await getAllUsers()
      console.clear()
      console.log(data)
    }

    getUsers()
  }, [])

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}
