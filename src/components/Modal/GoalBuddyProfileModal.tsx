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
        className="flex max-w-[50vw] flex-row bg-[#EEEEEE] h-[70%] p-0 gap-0 rounded"
        aria-describedby={undefined}
      >
        <DialogTitle></DialogTitle>
        <div className="flex flex-col w-[55%] pt-0 pl-0 overflow-y-auto scrollbar-hidden">
          <GoalBuddyProfile goalBuddy={goalBuddy} />
        </div>
        <div className="flex flex-col items-center h-full w-[45%] bg-[#279af1] p-0 overflow-hidden rounded">
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
