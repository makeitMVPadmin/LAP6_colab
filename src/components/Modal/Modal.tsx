import React from 'react'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import EventBox from '../EventBox/EventBox'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { UserProfile } from '../UserProfile/UserProfile'
import { DialogTitle } from '@radix-ui/react-dialog'

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalOpen: boolean
  userId: string
}

const Modal: React.FC<ModalProps> = ({ setModalOpen, modalOpen, userId }) => {
  return (
    <Dialog  open={modalOpen} onOpenChange={setModalOpen} >
      <DialogContent className="flex max-w-[50vw] flex-row bg-[#EEEEEE] h-[70%] p-0 gap-0">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col w-[50%] pt-0 pl-0">
          <UserProfile userId={userId} />
        </div>
        <div className="flex flex-col items-center w-[50%]  pl-3 pt-3 space-y-4 bg-blue-600">
          <BookingCalendar />
          <EventBox />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
