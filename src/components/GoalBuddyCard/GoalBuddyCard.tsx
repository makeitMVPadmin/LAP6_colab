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
  onClick: () => void
}

const GoalBuddyCard: React.FC<GoalBuddyCardProps> = ({
  goalBuddy,
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
        'flex flex-col sm:flex-row min-h-32 max-w-80 mx-2 my-2 sm:my-4 pb-2 pt-3 px-3 bg-white cursor-pointer duration-150 border border-slate-950 rounded-md shadow-[2px_2px_5px_0px_rgba(0,_0,_0,_0.8)] relative',
        !isSidebarOpen && 'hover:scale-105', // Disable hover when sidebar is open
        isSidebarOpen && ' opacity-110', // Add transparency when sidebar is open
      )}
    >
      <div className="flex justify-end items-center absolute top-0 right-0 gap-1 py-1 px-2">
        {goalBuddy.isMentor && <MentorBadge width="w-4" stroke="3" />}
        {goalBuddy.isAccountabilityPartner && (
          <GoalBuddyBadge width="w-4" stroke="3" />
        )}
        {goalBuddy.isNetworking && <NetworkingBadge width="w-4" stroke="3" />}
      </div>
      <CardHeader className="self-start p-0">
        <Avatar className="w-16 h-16">
          <AvatarImage src={goalBuddy.profilePhoto} />
          <AvatarFallback className="bg-[#D9D9D9]" />
        </Avatar>
      </CardHeader>
      <CardContent className="flex sm:flex-1 flex-col justify-center mt-3 sm:mt-0 pt-3 p-0 sm:pt-6 sm:px-3 pb-0 relative">
        <h1 className="font-semibold text-lg leading-[20px] sm:text-[24px] sm:leading-none font-fraunces">{`${goalBuddy.firstName} ${goalBuddy.lastName}`}</h1>
        <span className="text-sm font-medium font-montserrat">{`${goalBuddy.discipline}`}</span>
        {goalBuddy.interests.length > 0 && (
          <div className="flex flex-wrap gap-x-1">
            {goalBuddy.interests.map((interest, index) => (
              <span
                key={index}
                className="list-inside text-sm font-medium font-montserrat"
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
