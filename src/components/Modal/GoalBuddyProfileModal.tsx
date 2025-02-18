import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { UserProfile } from '../UserProfile/UserProfile'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import EventBox from '../EventBox/EventBox'
import GoalBuddyProfile from '../GoalBuddyProfile/GoalBuddyProfile'
interface ModalProps{
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isModalOpen: boolean,
    goalBuddy: object,
    
}
const GoalBuddyProfileModal:React.FC<ModalProps> = ({setIsModalOpen, isModalOpen, goalBuddy }) => {
  return (
    <Dialog  open={isModalOpen} onOpenChange={setIsModalOpen} >
      <DialogContent className="flex max-w-[50vw] flex-row bg-[#EEEEEE] h-[70%] p-0 gap-0 rounded"  aria-describedby={undefined}>
        <DialogTitle></DialogTitle>
        <div className="flex flex-col w-[55%] pt-0 pl-0">
          <GoalBuddyProfile goalbuddy={goalBuddy} />
        </div>
        <div className="flex flex-col items-center w-[45%]  pl-3 pt-3 space-y-4 bg-blue-600">
          <BookingCalendar />
          <EventBox />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GoalBuddyProfileModal
