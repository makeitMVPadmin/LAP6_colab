// import { SidebarContext } from '@/components/context/SidebarContext'
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
import GoalBuddyProfileModal from '../../../src/components/Modal/GoalBuddyProfileModal'
import { IdContext } from '@/components/context/IdContext'
import BackgroundImage from '../../assets/Image/Background.png'

export default function ColabPage() {
  const [goalBuddiesCombinedWithUsers, setGoalBuddiesCombinedWithUsers] =
    useState<AllGoalBuddyData[] | []>([])
  const [filteredGoalBuddies, setFilteredGoalBuddies] = useState<
    AllGoalBuddyData[]
  >([])

  const [selectedGoalBuddy, setSelectedGoalBuddy] =
    useState<AllGoalBuddyData | null>(null)

  const [filter, setFilter] = useState({
    mentor: false,
    accountability: false,
    networking: false,
  })

  const [isLoading, setIsLoading] = useState(true)
  const userContext = useContext(IdContext)
  if (!userContext) {
    throw new Error('IdContext not found')
  }
  const { userData, isActiveUserFetched } = userContext

  useEffect(() => {
    const fetchGoalBuddiesCombinedWithUser = async () => {
      const goalBuddies = await getAllGoalBuddies()
      const users = await getAllUsers()

      const excludeActiveUserList = goalBuddiesMergedWithUsers(
        goalBuddies,
        users,
      ).filter((user) => user.userId !== userData?.id)

      setGoalBuddiesCombinedWithUsers(excludeActiveUserList)

      setIsLoading(false)
    }

    if (isActiveUserFetched) {
      fetchGoalBuddiesCombinedWithUser()
    }
  }, [isActiveUserFetched])

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
    const filtered = goalBuddiesCombinedWithUsers.filter((goalBuddy) => {
      const matchesMentor = filter.mentor && goalBuddy.isMentor
      const matchesAccountability =
        filter.accountability && goalBuddy.isAccountabilityPartner
      const matchesNetworking = filter.networking && goalBuddy.isNetworking
      return matchesMentor || matchesAccountability || matchesNetworking
    })
    setFilteredGoalBuddies(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [filter])

  const handleClick = (goalBuddyWithUser: AllGoalBuddyData) => {
    setSelectedGoalBuddy(goalBuddyWithUser)
  }

  const renderGoalBuddies = (
    goalBuddies: AllGoalBuddyData[],
  ): React.ReactNode => {
    return goalBuddies.map((goalBuddyWithUser) => {
      return (
        <GoalBuddyCard
          key={goalBuddyWithUser.id}
          goalBuddy={goalBuddyWithUser}
          onClick={() => handleClick(goalBuddyWithUser)}
        />
      )
    })
  }

  return (
    <main>
      <Layout>
        <div
          className={clsx(
            'flex lg:justify-center justify-start flex-col lg:flex-row',
          )}
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
          }}
        >
          <Filter filterGoalBuddies={filterGoalBuddies} filter={filter} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-w-[1200px] max-h-[120px] ">
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
              : renderGoalBuddies(
                  filteredGoalBuddies.length > 0
                    ? filteredGoalBuddies
                    : goalBuddiesCombinedWithUsers,
                )}
          </div>
          {selectedGoalBuddy && (
            <GoalBuddyProfileModal
              isModalOpen={true}
              setIsModalOpen={() => setSelectedGoalBuddy(null)}
              goalBuddy={selectedGoalBuddy}
            />
          )}
        </div>
      </Layout>
    </main>
  )
}
