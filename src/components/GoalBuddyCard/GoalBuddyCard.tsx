import React, { useContext } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AllGoalBuddyData } from '@/types/types'
import { SidebarContext } from '../context/SidebarContext'
import clsx from 'clsx'
import RoleBadge from '../Filter/RoleBadge'

interface GoalBuddyCardProps {
  goalBuddy: AllGoalBuddyData
}

const GoalBuddyCard: React.FC<GoalBuddyCardProps> = ({ goalBuddy }) => {
  const sideBarContext = useContext(SidebarContext)
  if (!sideBarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen } = sideBarContext
  return (
    <Card
      key={goalBuddy.userId}
      className={clsx(
        'flex min-w-60 max-w-96 min-h-[150px] m-4 bg-white cursor-pointer duration-150 border border-slate-950 rounded-md shadow-[2px_2px_5px_0px_rgba(0,_0,_0,_0.8)]',
        !isSidebarOpen && 'hover:scale-110', // Disable hover when sidebar is open
        isSidebarOpen && ' opacity-110', // Add transparency when sidebar is open
      )}
    >
      <CardHeader className="self-start">
        <Avatar className="w-16 h-16">
          <AvatarImage src={goalBuddy.profilePhoto} />
          <AvatarFallback className="bg-[#D9D9D9]" />
        </Avatar>
      </CardHeader>
      <CardContent className="flex-1 flex-col justify-center p-4 w-11/12 relative">
        <div className="flex justify-end absolute top-0 right-0 p-2 mx-1 ">
          {goalBuddy.isMentor && <RoleBadge colour={'bg-[#0264D4]'} />}
          {goalBuddy.isAccountabilityPartner && (
            <RoleBadge colour={'bg-[#FFA629]'} />
          )}
          {goalBuddy.isNetworking && <RoleBadge colour={'bg-[#4CAF50]'} />}
        </div>
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl mt-2">{`${goalBuddy.firstName} ${goalBuddy.lastName}`}</h1>
        <span className="text-sm sm:text-base">{`${goalBuddy.discipline}`}</span>
        {goalBuddy.interests.length > 0 && (
          <div className="text-sm sm:text-base flex flex-wrap gap-1.5 mt-2">
            {goalBuddy.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gray-200 list-inside text-sm sm:text-base rounded-md px-1"
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
