import React, { useContext } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AllGoalBuddyData } from '@/types/types'
import { SidebarContext } from '../context/SidebarContext'
import clsx from 'clsx'
import MentorBadge from '../Filter/MentorBadge'
import GoalBuddyBadge from '../Filter/GoalBuddyBadge'
import NetworkingBadge from '../Filter/NetworkingBadge'

interface GoalBuddyCardProps {
  goalBuddy: AllGoalBuddyData
  modalState: boolean
  onClick: () => void
}

const GoalBuddyCard: React.FC<GoalBuddyCardProps> = ({
  goalBuddy,
  modalState,
  onClick,
}) => {
  const sideBarContext = useContext(SidebarContext)
  if (!sideBarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen } = sideBarContext
  return (
    <Card
      key={goalBuddy.userId}
      onClick={onClick}
      className={clsx(
        'flex min-w-60 max-w-96 min-h-[150px] m-4 bg-white cursor-pointer duration-150 border border-slate-950 rounded-md shadow-[2px_2px_5px_0px_rgba(0,_0,_0,_0.8)]',
        !isSidebarOpen && 'hover:scale-105', // Disable hover when sidebar is open

        modalState ||isSidebarOpen ? " fade-in-0 duration-200 opacity-50 bg-opacity-50" : ""

        isSidebarOpen && ' opacity-110', // Add transparency when sidebar is open
        modalState ? " fade-in-0 duration-200 opacity-50 bg-opacity-50" : ""

      )}
    >
      <CardHeader className="self-start p-3 sm:p-6">
        <Avatar className={`sm:w-16 sm:h-16 ${modalState ? "fade-in-0 duration-200 opacity-50 brightness-50" : ""}`}>
          <AvatarImage src={goalBuddy.profilePhoto} />
          <AvatarFallback className="bg-[#D9D9D9]" />
        </Avatar>
      </CardHeader>
      <CardContent className="flex-1 flex-col justify-center p-4 w-11/12 relative">
        <div className="flex justify-end items-center absolute top-0 right-0 px-2 py-1 gap-1">
          {goalBuddy.isMentor && <MentorBadge width="w-4" stroke="3" />}
          {goalBuddy.isAccountabilityPartner && (
            <GoalBuddyBadge width="w-4" stroke="3" />
          )}
          {goalBuddy.isNetworking && <NetworkingBadge width="w-4" stroke="3" />}
        </div>
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl mt-2 font-fraunces">{`${goalBuddy.firstName} ${goalBuddy.lastName}`}</h1>
        <span className="text-sm sm:text-base font-montserrat">{`${goalBuddy.discipline}`}</span>
        {goalBuddy.interests.length > 0 && (
          <div className="text-sm sm:text-base flex flex-wrap gap-1.5 mt-2">
            {goalBuddy.interests.map((interest, index) => (
              <span
                key={index}
                className={`bg-gray-200 list-inside text-sm sm:text-base rounded-md px-1 font-montserrat ${modalState ? " fade-in-0 duration-200 brightness-50 bg-opacity-50" : ""}`}
              >
                #{interest}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GoalBuddyCard
