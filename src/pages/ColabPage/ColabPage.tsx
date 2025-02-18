import { SidebarContext } from '@/components/context/SidebarContext'
import { useContext, useEffect, useState } from 'react'
import getAllGoalBuddies from '../../../firebase/functions/goalBuddies'
import { getAllUsers } from '../../../firebase/functions/getAllUsers'
import { AllGoalBuddyData } from '../../types/types'
import { goalBuddiesMergedWithUsers } from '../../utils/goalBuddiesMergedWithUsers'
import Filter from '../../components/Filter/Filter'
import Layout from '@/components/Layout/Layout'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import clsx from 'clsx'
import { Skeleton } from '@/components/ui/skeleton'

export default function ColabPage() {
  const [goalBuddiesCombinedWithUsers, setGoalBuddiesCombinedWithUsers] =
    useState<AllGoalBuddyData[] | []>([])
  const [filteredGoalBuddies, setFilteredGoalBuddies] = useState<AllGoalBuddyData[]>([])
  
  const [filter, setFilter] = useState({
    mentor: false,
    accountability: false,
    networking: false,
  })

  const [isLoading, setIsLoading] = useState(true)
  const sideBarContext = useContext(SidebarContext)
  if (!sideBarContext) {
    throw new Error('Sidebar context not found')
  }
  
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
    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter }
      if (choice === 'mentor') newFilter.mentor = !newFilter.mentor
      if (choice === 'accountability')
        newFilter.accountability = !newFilter.accountability
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
    const filtered = goalBuddiesCombinedWithUsers.filter(goalBuddy => {
    const matchesMentor = filter.mentor && goalBuddy.isMentor
    const matchesAccountability = filter.accountability && goalBuddy.isAccountabilityPartner
    const matchesNetworking = filter.networking && goalBuddy.isNetworking
    return matchesMentor || matchesAccountability || matchesNetworking
    })
    setFilteredGoalBuddies(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [filter])

  const renderGoalBuddies = (goalBuddies: AllGoalBuddyData[]): React.ReactNode => {
    return goalBuddies.map((goalBuddyWithUser) => (
      <GoalBuddyCard
        key={goalBuddyWithUser.id}
        goalBuddy={goalBuddyWithUser}
      />
    ))
  }

  return (
    <main>
      <Layout>
        <div
          className={clsx(
            'flex justify-center',
      
          )}
        >
          <Filter filterGoalBuddies={filterGoalBuddies} filter={filter} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 max-w-[1200px] ">
            {isLoading
              ? Array.from({ length: 9 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="min-w-60 max-w-96 min-h-[150px] m-4 rounded-xl flex p-3"
                  >
                    <Skeleton className="w-16 h-16 rounded-full m-2" />
                    <div className="space-y-2 flex flex-col justify-center w-7/12">
                      <Skeleton className="h-8 max-w-[200px]" />
                      <Skeleton className="h-4 max-w-[200px]" />
                      <Skeleton className="h-4 max-w-[200px]" />
                      <Skeleton className="h-4 max-w-[200px]" />
                    </div>
                  </Skeleton>
                ))
              : renderGoalBuddies(filteredGoalBuddies.length > 0
                ? filteredGoalBuddies : goalBuddiesCombinedWithUsers
              )}
          </div>
        </div>
      </Layout>
    </main>
  )
}