import React from 'react'
import { UserProfile } from '../UserProfile/UserProfile'
import AvailabilitySection from '../AvailabilitySection/AvailabilitySection'
import { GoalBuddy } from '../../types/types'

interface ModalProps {
  modalOpen: boolean
  goalBuddyData: GoalBuddy | null
  updateGoalBuddyData: (data: GoalBuddy) => void
}

const UserprofileModal: React.FC<ModalProps> = ({ modalOpen, goalBuddyData, updateGoalBuddyData }) => {
  return (
    <section className={`flex w-[800px] h-[663px] flex-row bg-[#EEEEEE] p-0 gap-0 
      rounded border border-r-2 border-b-2 border-black
      absolute right-[19px] top-[79px] z-50
      ${modalOpen ? "" : "hidden"}`} 
    aria-describedby={undefined}>
      <div className="flex flex-col w-[55%] pt-0 pl-0 overflow-y-auto scrollbar-hidden">
        <UserProfile />
      </div>
      <div className="flex flex-col items-center w-[45%] bg-[#279AF1] p-0 overflow-hidden rounded">
        {goalBuddyData ? (
          <AvailabilitySection activeGoalBuddy={goalBuddyData} updateGoalBuddy={updateGoalBuddyData} />
        ) : (
          <p>{`No user data was provided`}</p>
        )}
      </div>
    </section>
  )
}

export default UserprofileModal
