import MeetingSetupSection from "@/components/MeetingSetupSection/MeetingSetupSection";
import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import { useEffect, useState } from "react";
import { getGoalBuddyById } from '../../../firebase/functions/getGoalBuddyById';
import { GoalBuddy } from "@/types/types";

export default function ColabPage() {

  const [goalBuddy, setGoalBuddy] = useState<GoalBuddy | undefined>(undefined);

  useEffect(() => {
    const fetchOneGoalBuddyById = async (id: string) => {
      const data = await getGoalBuddyById(id);
      // console.log(data);
      if(data === null){
        setGoalBuddy(undefined);
      }else{
        setGoalBuddy(data as GoalBuddy);
      }
    }

    fetchOneGoalBuddyById('0u0Ibxw1kYuiREJGKlZk')
  }, [])

 
 return (
   <main>
    <DummyNavBar />
     <div className="flex justify-center">
       <GoalBuddyCard goalBuddyList={[]}/>
     </div>
     {goalBuddy === undefined ? (
        <div>No Goal Buddy found</div>
      ) : (
        <MeetingSetupSection goalBuddy={goalBuddy} />
      )}
   </main>
 )
}



