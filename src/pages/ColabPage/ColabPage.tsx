import DummyNavBar from "@/components/DummyNavBar/DummyNavBar"
import Filter from "../../components/Filter/Filter"
import GoalBuddyCard from "@/components/GoalBuddyCard/GoalBuddyCard"
import { GoalBuddy } from "@/types/types"
import getAllGoalBuddies from "../../../firebase/functions/goalBuddies"
import { useEffect, useState } from "react"

export default function ColabPage() {
  const [goalBuddyList, setGoalBuddyList] = useState<GoalBuddy[]>([])
  const [filter, setFilter] = useState({
      mentor: false,
      accountability: false,
      networking: false
  })
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGoalBuddies()
      setGoalBuddyList(data)
    }
    fetchData()
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
      <DummyNavBar />
      <section className="flex">
        <Filter 
          filterGoalBuddies={filterGoalBuddies} 
          filter={filter}
        />
        <div className='flex justify-center'>
          <GoalBuddyCard goalBuddyList={[]} />
        </div>
      </section>
    </main>
  )
}