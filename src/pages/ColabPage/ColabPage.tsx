import { useEffect } from 'react'
import { editGoalBuddy } from '../../../firebase/functions/editGoalBuddy'

export default function ColabPage() {
  useEffect(() => {
    const editGoalBuddyTest = async () => {
      try {
        const data = await editGoalBuddy(goalBuddyId, {
          isMentor: true,
          isNetworking: true,
          skills: ['Web Developement', "AI"],
          availabilities: [
            {day: "Tuesday", timePeriod: [{startTime: {hours: 12, minutes: 0}, endTime: {hours: 17, minutes: 0}}]}
          ],
          isAccountabilityPartner: false
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    editGoalBuddyTest()
  }, [])

  const goalBuddyId = 'yfKMqgkDsrPxWc1jUoU9'

  return (
    <main>
      <h1>Welcome Colab User</h1>
    </main>
  )
}
