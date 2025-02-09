import DummyNavBar from "@/components/DummyNavBar/DummyNavBar"
import Filter from "../../components/Filter/Filter"
import GoalBuddyCard from "@/components/GoalBuddyCard/GoalBuddyCard"
import { GoalBuddy } from "@/types/types"
import getAllGoalBuddies from "../../../firebase/functions/goalBuddies"
import { useEffect, useState } from "react"

export default function ColabPage() {
  const [goalBuddyList, setGoalBuddyList] = useState<GoalBuddy[]>([])
  const [filteredGoalBuddies, setFilteredGoalBuddies] = useState<GoalBuddy[]>([])
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
    setFilteredGoalBuddies(goalBuddyList.filter(goalBuddy => {
      if (!filteredGoalBuddies) return
      if (choice === 'mentor') return goalBuddy.isMentor
      if (choice === 'accountability') return goalBuddy.isAccountabilityPartner
      if (choice === 'networking') return goalBuddy.isNetworking
    }))
    if (!filter) return
    if (choice === 'mentor') setFilter({...filter, mentor: !filter.mentor})
    if (choice === 'accountability') setFilter({...filter, accountability: !filter.accountability})
    if (choice === 'networking') setFilter({...filter, networking: !filter.networking})
  }

  useEffect(() => {
  console.log(filteredGoalBuddies)
  }, [filterGoalBuddies])

  return (
    <main>
      <DummyNavBar />
      <section className="flex">
        <Filter 
          filterGoalBuddies={filterGoalBuddies} 
          filter={filter}
        />
        <div className='flex justify-center'>
          <GoalBuddyCard />
        </div>
      </section>
    </main>
  )
}