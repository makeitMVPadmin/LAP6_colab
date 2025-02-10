import MeetingSetupSection from "@/components/MeetingSetupSection/MeetingSetupSection";
import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import { useEffect, useState } from "react";
import { getGoalBuddyById } from '../../../firebase/functions/getGoalBuddyById';
import { GoalBuddy } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import { getUserEvents } from "../../../firebase/functions/calendarEventsbyUserId";

export default function ColabPage() {

  const [goalBuddy, setGoalBuddy] = useState<GoalBuddy | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchOneGoalBuddyById = async (id: string) => {
      setLoading(true);
      try{
        const data = await getGoalBuddyById(id);
        if(data === null){
          setGoalBuddy(undefined);
        }else{
          setGoalBuddy(data as GoalBuddy);
        }
      }
      catch(error){
        console.error('Failed to fetch goal buddy: ', error);
        setGoalBuddy(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchOneGoalBuddyById('0u0Ibxw1kYuiREJGKlZk')
  }, []);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //   try {
  //   const userId = "yLVEZkRulVkRU8de8XMb";
  //   console.log("User Id: " + userId);
  //   const todayUTC = new Date()
  //   todayUTC.setFullYear(2022, 2, 2);
  //   todayUTC.setUTCHours(0, 0, 0, 0) // Reset to 00:00:00 UTC
  //   const dateTimestamp = Timestamp.fromDate(todayUTC)
  //   const userEvents = await getUserEvents(userId, dateTimestamp);
  //   console.log(userEvents);
  //   } catch (error) {
  //   console.error('Failed to fetch events: ', error)
  //   }
  //   }
  //   fetchEvents()
  //   }, [])

  if (loading) {
    return (
      <main>
        <DummyNavBar />
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      </main>
    )
  }
  
 return (
   <main>
    <DummyNavBar />
     <div className="flex justify-center">
       <GoalBuddyCard goalBuddyList={[]}/>
     </div>
     {goalBuddy === undefined ? (
        <div>No Goal Buddy found</div>
      ) : (
        <MeetingSetupSection activeUserId="6vEljF3oaFsLWEPmQRHV" showingUser={goalBuddy} />
      )}
   </main>
 )
}
