import { SidebarContext } from '@/components/context/SidebarContext'
import { useContext, useEffect, useState } from 'react'
import { getAllGoalBuddies } from '../../../firebase/functions/goalBuddies'
import { getAllUsers } from '../../../firebase/functions/getAllUsers'
import { AllGoalBuddyData, GoalBuddy } from '../../types/types'
import { goalBuddiesMergedWithUsers } from '../../utils/goalBuddiesMergedWithUsers'
import Filter from "../../components/Filter/Filter"
import Layout from '@/components/Layout/Layout'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import clsx from 'clsx'

export default function ColabPage() {
  const [goalBuddiesCombinedWithUsers, setGoalBuddiesCombinedWithUsers] =
    useState<AllGoalBuddyData[] | []>([])
  
  const [goalBuddyList, setGoalBuddyList] = useState<GoalBuddy[]>([])
  
  const [filter, setFilter] = useState({
      mentor: false,
      accountability: false,
      networking: false
  })

  const [isLoading, setIsLoading] = useState(true)
    const sideBarContext = useContext(SidebarContext)
    if (!sideBarContext) {
      throw new Error('Sidebar context not found')
    }
    const { isSidebarOpen } = sideBarContext
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

  const filterGoalBuddies = (choice: string) => {
    setFilter(prevFilter => {
      const newFilter = { ...prevFilter}
      if (choice === 'mentor') newFilter.mentor = !newFilter.mentor
      if (choice === 'accountability') newFilter.accountability = !newFilter.accountability
      if (choice === 'networking') newFilter.networking = !newFilter.networking
      if (choice === '') {
        newFilter.mentor = false
        newFilter.accountability = false
        newFilter.networking = false
      }
      return newFilter
    })
  }

  const applyFilter = () => {
    const filtered = goalBuddyList.filter(goalBuddy => {
    const matchesMentor = filter.mentor && goalBuddy.isMentor
    const matchesAccountability = filter.accountability && goalBuddy.isAccountabilityPartner
    const matchesNetworking = filter.networking && goalBuddy.isNetworking
    return matchesMentor || matchesAccountability || matchesNetworking
    })
    console.log(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [filter])

  return (
    <main>
      <Layout>
        <div
          className={clsx('flex justify-center', isSidebarOpen && 'bg-black')}
        >
          {isLoading ? (
            <p>Loading goal buddies data...</p>
              ) : (
            <Filter 
              filterGoalBuddies={filterGoalBuddies} 
              filter={filter}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 max-w-[1200px] ">
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
