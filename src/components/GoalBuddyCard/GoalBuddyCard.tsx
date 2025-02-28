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
        'flex flex-col sm:flex-row h-42 max-w-80 mx-2 my-2 sm:my-4 pb-2 px-5 pt-4 sm:pt-3 sm:px-3 bg-white cursor-pointer duration-150 border border-slate-950 border-r-2 border-b-2 rounded-md relative',
        !isSidebarOpen && 'hover:scale-105', // Disable hover when sidebar is open
      )}
    >
      <div className="flex justify-end absolute top-0 right-0 gap-1 py-1 px-2">
        {goalBuddy.isMentor && (
          <div className="flex-grow flex-basis-1/3">
            <MentorBadge
              width="w-[15px]"
              stroke="4"
              yOffset={35}
              height="h-[15px]"
            />
          </div>
        )}
        {goalBuddy.isAccountabilityPartner && (
          <div className="flex-grow flex-basis-1/3">
            <GoalBuddyBadge width="w-[15px]" stroke="3" height="h-[15px]" />
          </div>
        )}
        {goalBuddy.isNetworking && (
          <div className="flex-grow flex-basis-1/3">
            <NetworkingBadge width="w-[15px]" stroke="3" height="h-[15px]" />
          </div>
        )}
      </div>
      <CardHeader className="self-start p-0">
        <Avatar className="w-[61px] h-[61px]">
          <AvatarImage src={goalBuddy.profilePhoto} />
          <AvatarFallback className="bg-[#D9D9D9]" />
        </Avatar>
      </CardHeader>
      <CardContent className="flex sm:flex-1 flex-col justify-center mt-3 sm:mt-0 pt-3 p-0 sm:pt-6 sm:px-3 pb-0 relative">
        <h1 className="font-semibold text-lg leading-[20px] sm:text-[24px] sm:leading-5 font-fraunces text-foreground">{`${goalBuddy.firstName} ${goalBuddy.lastName}`}</h1>
        <span className="text-sm font-medium font-montserrat  text-foreground">{`${goalBuddy.discipline}`}</span>
        {goalBuddy.interests.length > 0 && (
          <div className="flex flex-wrap gap-x-1">
            {goalBuddy.interests.map((interest, index) => (
              <span
                key={index}
                className={`list-inside text-sm font-medium rounded-md font-montserrat text-foreground`}
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
