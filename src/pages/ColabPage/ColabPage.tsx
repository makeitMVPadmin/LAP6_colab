import DummyNavBar from "@/components/DummyNavBar/DummyNavBar"
import Filter from "../../components/Filter/Filter"
import GoalBuddyCard from "@/components/GoalBuddyCard/GoalBuddyCard"
import { GoalBuddy } from "@/types/types"
import getAllGoalBuddies from "../../../firebase/functions/goalBuddies"
import { useEffect, useState } from "react"

export default function ColabPage() {
  const [goalBuddyList, setGoalBuddyList] = useState<GoalBuddy[]>([])
  const [filteredGoalBuddies, setFilteredGoalBuddies] = useState<GoalBuddy[]>([])
  const [filtered, setFiltered] = useState({
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
      if (choice === 'mentor') return goalBuddy.isMentor
      else if (choice === 'accountability') return goalBuddy.isAccountabilityPartner
      else if (choice === 'networking') return goalBuddy.isNetworking
      else return false;
    }))
    if (choice === 'mentor') setFiltered({...filtered, mentor: !filtered.mentor})
    else if (choice === 'accountability') setFiltered({...filtered, accountability: !filtered.accountability})
    else if (choice === 'networking') setFiltered({...filtered, networking: !filtered.networking})
    else return false;
  }

  return (
    <main>
      <DummyNavBar />
      <section className="flex">
        <Filter 
          filterGoalBuddies={filterGoalBuddies} 
          filtered={filtered}
        />
        <div className='flex justify-center'>
          <GoalBuddyCard />
        </div>
      </section>
    </main>
  )
}
