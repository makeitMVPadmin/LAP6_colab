import React, { useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import GoalBuddyProfile from '../GoalBuddyProfile/GoalBuddyProfile'
import { AllGoalBuddyData, IdType } from '@/types/types'
import "./Modal.css"
import MeetingSetupSection from '../MeetingSetupSection/MeetingSetupSection'
import { IdContext } from '../context/IdContext'

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
  goalBuddy: AllGoalBuddyData
}
const GoalBuddyProfileModal: React.FC<ModalProps> = ({
  setIsModalOpen,
  isModalOpen,
  goalBuddy,
}) => {

  const userContext: IdType | undefined = useContext(IdContext)
  if (!userContext) {
    throw new Error('IdContext not found')
  }
  const { userData } = userContext
  
  
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent
        className="flex flex-col max-w-[90vw] h-[90%] lg:max-w-[50vw] md:max-w-[70vw] lg:h-[70%] md:h-[70%]  lg:flex-row md:flex-row  p-0 gap-0 border border-black "
        aria-describedby={undefined}
      >
      
        <div className="h-[60%] lg:w-[55%] md:w-[55%] lg:h-[100%] md:h-[100%] pt-0 overflow-y-auto scrollbar-hidden">
          <GoalBuddyProfile goalBuddy={goalBuddy} />
        </div>
        <div className="flex flex-col items-center w-[100%] lg:w-[45%] md:w-[45%]  md:h-[100%] bg-[#279af1] p-0 overflow-y-auto scrollbar-hidden ">
          {userContext && userData ? (
            <MeetingSetupSection activeUserId={userData.id} showingUser={goalBuddy} />
          ) : (
            <p>{`Context for the Active User not found.`}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GoalBuddyProfileModal
