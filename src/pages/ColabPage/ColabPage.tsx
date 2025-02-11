import { SidebarContext } from '@/components/context/SidebarContext'
import { useContext, useEffect, useState } from 'react'
import { getAllGoalBuddies } from '../../../firebase/functions/goalBuddies'
import { getAllUsers } from '../../../firebase/functions/getAllUsers'
import { AllGoalBuddyData } from '../../types/types'
import { goalBuddiesMergedWithUsers } from '../../utils/goalBuddiesMergedWithUsers'
import Layout from '@/components/Layout/Layout'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'

        
export default function ColabPage() {
  const [goalBuddiesCombinedWithUsers, setGoalBuddiesCombinedWithUsers] =
    useState<AllGoalBuddyData[] | []>([])

  const [isLoading, setIsLoading] = useState(true)
  const { isSidebarOpen } = useContext(SidebarContext)
  useEffect(() => {
    const fetchGoalBuddiesCombinedWithUser = async () => {
      const goalBuddies = await getAllGoalBuddies()
      const users = await getAllUsers()

      setGoalBuddiesCombinedWithUsers(
        goalBuddiesMergedWithUsers(goalBuddies, users),
      )

      setIsLoading(false)
    }

    fetchGoalBuddiesCombinedWithUser()
  }, [])

  return (
    <main className={isSidebarOpen ? 'bg-black bg-opacity-90' : ''}>
      <Layout>
        <div className="flex justify-center">
          {isLoading ? (
            <p>Loading goal buddies data...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 max-w-[1200px] mx-auto">
              {goalBuddiesCombinedWithUsers.map((goalBuddyWithUser) => (
                <GoalBuddyCard
                  key={goalBuddyWithUser.id}
                  goalBuddy={goalBuddyWithUser}
                />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </main>
  )
}


