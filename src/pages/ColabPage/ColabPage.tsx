import DummyNavBar from "@/components/DummyNavBar/DummyNavBar";
import GoalBuddyCard from "@/components/GoalBuddyCard/GoalBuddyCard";
import { useEffect, useState } from "react";
import { getAllGoalBuddyData } from "../../../firebase/functions/getAllGoalBuddyData"
import { AllGoalBuddyData } from "@/types/types";

export default function ColabPage() {
  const [goalBuddyList, setGoalBuddyList] = useState<AllGoalBuddyData[]>([])
  console.log(goalBuddyList);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGoalBuddyData()
      setGoalBuddyList(data)
    }

    fetchData()
  }, [])

  return (
    <main>
      <DummyNavBar />
      <div className='flex justify-center'>
        <GoalBuddyCard goalBuddyList={goalBuddyList} />
      </div>
    </main>
  )
}