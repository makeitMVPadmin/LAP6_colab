import MeetingSetupSection from "@/components/MeetingSetupSection/MeetingSetupSection";
import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'


export default function ColabPage() {
 
 return (
   <main>
    <DummyNavBar />
     <div className="flex justify-center">
       <GoalBuddyCard goalBuddyList={[]}/>
     </div>
     {/* <MeetingSetupSection /> */}
   </main>
 )
}



