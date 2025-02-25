import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserProfile } from '../UserProfile/UserProfile'
import { DialogTitle } from '@radix-ui/react-dialog'
import AvailabilitySection from '../AvailabilitySection/AvailabilitySection'
import { GoalBuddy } from '../../types/types'

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalOpen: boolean
  goalBuddyData: GoalBuddy | null
  updateGoalBuddyData: (data: GoalBuddy) => void
  
}

const UserprofileModal: React.FC<ModalProps> = ({ setModalOpen, modalOpen, goalBuddyData, updateGoalBuddyData }) => {
  return (
    <Dialog  open={modalOpen} onOpenChange={setModalOpen} >
      <DialogContent className="flex max-w-[50vw] flex-row bg-[#EEEEEE] h-[75%] p-0 gap-0 rounded border-1 border-black"  aria-describedby={undefined}>
        <DialogTitle></DialogTitle>
        <div className="flex flex-col w-[57%] pt-0 pl-0 overflow-y-auto scrollbar-hidden">
          <UserProfile />
        </div>
        <div className="flex flex-col items-center h-full w-[43%] bg-[#279af1] m-0 p-0 overflow-hidden rounded-tr rounded-br">
            {goalBuddyData ? (
              <AvailabilitySection activeGoalBuddy={goalBuddyData} updateGoalBuddy={updateGoalBuddyData} />
            ) : (
              <p>{`No user data was provided`}</p>
            )
            }
            
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserprofileModal
