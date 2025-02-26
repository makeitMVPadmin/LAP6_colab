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
    <Dialog open={modalOpen} onOpenChange={setModalOpen} >
      <DialogContent className="flex max-w-[50vw] h-[70%] border border-black p-0 gap-0 rounded" aria-describedby={undefined}>
        <DialogTitle></DialogTitle>
        <div className="flex flex-col w-[55%] pt-0 pl-0 overflow-y-auto scrollbar-hidden bg-white">
          <UserProfile />
        </div>
        <div className="flex flex-col items-center w-[45%] bg-[#23A8E7] p-0  overflow-hidden rounded">
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
