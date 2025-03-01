import { Dialog } from '@/components/ui/dialog'
import { UserProfile } from '../UserProfile/UserProfile'
import { DialogTitle } from '../ui/dialog'
import AvailabilitySection from '../AvailabilitySection/AvailabilitySection'
import { GoalBuddy } from '../../types/types'

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalOpen: boolean
  goalBuddyData: GoalBuddy | null
  updateGoalBuddyData: (data: GoalBuddy) => void
}

const UserprofileModal: React.FC<ModalProps> = ({
  setModalOpen,
  modalOpen,
  goalBuddyData,
  updateGoalBuddyData,
}) => {
  
  const handleModalClick = () => {
    setModalOpen(false)
 
  }
 
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen} modal={true}>
  
      <section className="flex flex-col md:flex-row w-[97vw] md:w-auto min-w-[60vw] h-[80vh] md:h-[75%] bg-white p-0 gap-0 border border-black rounded absolute md:right-[19px] top-[164px] md:top-[79px] mx-2 md:mx-0 z-50 overflow-y-auto md:overflow-hidden scrollbar-hidden"
      
    aria-describedby={undefined}>

        <DialogTitle></DialogTitle>
        <div className="flex flex-col w-full md:w-[57%] min-h-[100%] h-full flex-grow md:flex-grow-0 pt-0 pl-0 md:overflow-hidden scrollbar-hidden bg-white rounded-tl rounded-bl">
          <div
            className="absolute z-50 left-[5px] top-[5px] cursor-pointer"
            onClick={handleModalClick}
          >
            X
          </div>
          <UserProfile />
        </div>
        <div className="flex flex-col items-center h-fit md:h-full w-full md:w-[43%] bg-blue mt-1 md:m-0 p-0 flex-grow md:flex-grow-0 md:overflow-hidden md:rounded-tr md:rounded-br">
            {goalBuddyData ? (
              <AvailabilitySection activeGoalBuddy={goalBuddyData} updateGoalBuddy={updateGoalBuddyData} />
            ) : (
              <p>{`No user data was provided`}</p>
            )
            }
            
        </div>
      </section>
    </Dialog>
  )
}

export default UserprofileModal
