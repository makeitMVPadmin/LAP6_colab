import React, { useContext } from 'react'
import { Dialog, DialogContent} from '../ui/dialog'
import GoalBuddyProfile from '../GoalBuddyProfile/GoalBuddyProfile'
import { AllGoalBuddyData, IdType } from '@/types/types'
import "./Modal.css"
import MeetingSetupSection from '../MeetingSetupSection/MeetingSetupSection'
import { IdContext } from '../context/IdContext'
import { DialogTitle } from '@radix-ui/react-dialog'

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
        className="flex flex-col md:flex-row lg:flex-row max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] h-[90vh] md:h-[70vh] lg:h-[70vh] p-0 gap-0 border border-black overflow-y-auto md:overflow-hidden scrollbar-hidden"
        aria-describedby={undefined}
      >
     < DialogTitle></DialogTitle>
        <div className="min-h-[50%] h-full w-full md:w-[55%] lg:w-[55%] pt-0 flex-grow md:flex-grow-0 md:overflow-y-auto scrollbar-hidden">
          <GoalBuddyProfile goalBuddy={goalBuddy} />
        </div>
        <div className="flex flex-col h-full items-center w-full md:w-[45%] lg:w-[45%] bg-blue p-0 md:overflow-y-auto scrollbar-hidden flex-grow md:flex-grow-0">
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
