import React from 'react'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import EventBox from '../EventBox/EventBox'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  modalOpen: boolean
  userId: string
}

const Modal: React.FC<ModalProps> = ({ setModalOpen, modalOpen, userId }) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Book</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-row w-[80vw] bg-[#EEEEEE]">
        <div className="flex flex-col w-[45%] pt-5 pl-2">
          <div>
            <Avatar className="w-24 h-24 ml-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <div className="w-8/12 h-4 ml-3 mt-6 mb-4 bg-[#757575]"></div>
            <div className="w-11/12 h-4 ml-3 mt-3 mb-2 bg-[#D9D9D9]"></div>
            <div className="w-11/12 h-4 ml-3 mt-3 mb-2 bg-[#D9D9D9]"></div>
            <div className="w-11/12 h-4 ml-3 mt-3 mb-2 bg-[#D9D9D9]"></div>
            <div className="w-8/12 h-4 ml-3 mt-3 mb-2 bg-[#D9D9D9]"></div>
            <div className="w-11/12 h-4 ml-3 mt-3 mb-2 bg-[#D9D9D9]"></div>
            <div className="w-11/12 h-4 ml-3 mt-3 mb-2 bg-[#D9D9D9]"></div>
            <div className="w-8/12 h-4 ml-3 mt-3 mb-2 bg-[#D9D9D9]"></div>
            <div className="flex justify-center items-center w-[100] mt-6 mb-6">
              <div className="w-[90%] h-[150px] bg-[#D9D9D9]"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-[65%] mb-2 pl-3 pt-3 space-y-4">
          <div className="w-8/12 h-4 mt-3 mb-1 bg-[#757575]"></div>
          <BookingCalendar />
          <EventBox />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
