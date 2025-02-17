import { SidebarContext } from '@/components/context/SidebarContext'
import { useContext, useEffect, useState } from 'react'
import getAllGoalBuddies from '../../../firebase/functions/goalBuddies'
import { getAllUsers } from '../../../firebase/functions/getAllUsers'
import { AllGoalBuddyData, GoalBuddy } from '../../types/types'
import { goalBuddiesMergedWithUsers } from '../../utils/goalBuddiesMergedWithUsers'
import Filter from '../../components/Filter/Filter'
import Layout from '@/components/Layout/Layout'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import clsx from 'clsx'
import { Skeleton } from '@/components/ui/skeleton'

export default function ColabPage() {
  const [goalBuddiesCombinedWithUsers, setGoalBuddiesCombinedWithUsers] =
    useState<AllGoalBuddyData[] | []>([])

  const [goalBuddyList, setGoalBuddyList] = useState<GoalBuddy[]>([])
  const [filteredGoalBuddies, setFilteredGoalBuddies] = useState<GoalBuddy[]>(
    [],
  )

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

    try {
      // const data = await getByEventId("0Qif3cH9YsOuupBL")
      // const data = await getByEventId("0Qif3cH9YsOuupBLF3F2")
      // const data = await getAllCalendarEvents()
      // const data = await getUserEvents("7jsNQRJEJKdUVovYogsg")
      // const data = await getUserEvents("hAOPiISWKSZdbrhxoCPE")
      // const data = await getUserEvents("5Wa8Y1pRGq1p0AsgUA3D")
      // const data = await getUserEvents("6eV0qsdAeQ9EJbMGOGIK")
      // const data = await getUserEvents("Pkv7GziP1FUFyuMqvAzR")
      // const christmas: Date = new Date(2023, 12, 25, 0, 0);
      // const christmasEnd: Date = new Date(2023, 12, 25, 0, 30);
      // const timeInput: Timestamp = Timestamp.fromDate(christmas)
      // const timeInputEnd: Timestamp = Timestamp.fromDate(christmasEnd)
      // const eventData: EventData = {
      //         createdUserId: "Pkv7GziP1FUFyuMqvAzR",
      //         eventDescription: 'Meeting made for DB Test',
      //         eventStartTime: timeInput.toDate(),
      //         eventEndTime: timeInputEnd.toDate(),
      //         eventTitle: 'DB Test',
      //         invitedUserId: "pSuTJe464b8q86l6whPM",
      //         eventStatus: 'confirmed',
      //         googleEventId: 'google-event-id-123',
      //       }
      // const data = await createCalendarEvent(eventData)
      // const data = await getUserEvents("7jsNQRJEJKdUVovYogsg", timeInput)
      // const data = await getUserEvents("hAOPiISWKSZdbrhxoCPE", timeInput)
      // const data = await getUserEvents("6eV0qsdAeQ9EJbMGOGIK", timeInput)
      // const data = await getUserEvents("5Wa8Y1pRGq1p0AsgUA3D", timeInput)
      // const data = await getUserEvents("Pkv7GziP1FUFyuMqvAzR", timeInput)
      // const data = await editGoalBuddy("5Wa8Y1pRGq1p0AsgUA3D", {isMentor: true} );
      // const data = await getAllUsers()
      // const data = await getGoalBuddyById("5Wa8Y1pRGq1p0AsgUA3D")
      // const data = await getGoalBuddyById("5Wa8Y1pRGq1p0Asg")
      // const data = await getGoalBuddyByUserId("Pkv7GziP1FUFyuMqvAzR")
      // const data = await getGoalBuddyByUserId("Pkv7GziP1FUFyuMq")
      // const data = await getUserById("Pkv7GziP1FUFyuMqvAzR")
      // const data = await getUserById("Pkv7GziP1FUFyuMq")
      // const data = await getAllGoalBuddies()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
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
    const filtered = goalBuddyList.filter((goalBuddy) => {
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

  return (
    <main>
      <Layout>
        <div
          className={clsx('flex justify-center', isSidebarOpen && 'bg-black')}
        >
          <section className="flex">
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
                : goalBuddiesCombinedWithUsers.map((goalBuddyWithUser) => (
                    <GoalBuddyCard
                      key={goalBuddyWithUser.id}
                      goalBuddy={goalBuddyWithUser}
                    />
                  ))}
            </div>
          </section>
        </div>
      </Layout>
    </main>
  )
}