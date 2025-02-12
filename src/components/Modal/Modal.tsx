import React from 'react'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import EventBox from '../EventBox/EventBox'

import {
  Dialog,
  DialogContent,

} from '@/components/ui/dialog'
import { UserProfile } from '../UserProfile/UserProfile'

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalOpen: boolean
  userId: string
}

const Modal: React.FC<ModalProps> = ({ setModalOpen, modalOpen, userId }) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen} >
      <DialogContent className="flex max-w-[45vw] flex-row bg-[#EEEEEE]">
        <div className="flex flex-col w-[65%] pt-5 pl-2">
          <UserProfile userId={userId}/>
        </div>
        <div className="flex flex-col items-center w-[45%] mb-2 pl-3 pt-3 space-y-4">
          <div className="w-8/12 h-4 mt-3 mb-1 bg-[#757575]"></div>
          <BookingCalendar />
          <EventBox />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
