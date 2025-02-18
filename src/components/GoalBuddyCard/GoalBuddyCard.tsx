import React, { useContext } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AllGoalBuddyData } from '@/types/types'
import { SidebarContext } from '../context/SidebarContext'
import clsx from 'clsx'

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
      key={goalBuddy.userId} onClick={onClick}
      className={clsx(
        'flex min-w-60 max-w-96 min-h-[150px] m-4 bg-[#AAAAAA] cursor-pointer duration-150',
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
      <CardContent className="flex flex-col justify-center p-4 w-11/12">
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">{`${goalBuddy.firstName} ${goalBuddy.lastName}`}</h1>
        <span className="text-sm sm:text-base mt-2">{`Experience: ${goalBuddy.yearsOfExperience}`}</span>
        {goalBuddy.interests.length > 0 && (
          <ul className="text-sm sm:text-base">
            Interests:
            {goalBuddy.interests.map((interest, index) => (
              <li
                key={index}
                className="list-disc list-inside text-sm sm:text-base"
              >
                {interest}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default GoalBuddyCard
