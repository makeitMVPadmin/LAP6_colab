import React, { useContext } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AllGoalBuddyData } from '@/types/types'
import { SidebarContext } from '../context/SidebarContext'
import clsx from 'clsx'

interface GoalBuddyCardProps {
  goalBuddy: AllGoalBuddyData
}

const GoalBuddyCard: React.FC<GoalBuddyCardProps> = ({ goalBuddy }) => {
  console.log(goalBuddy);
  
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
      <CardContent className="flex flex-col justify-center p-4 w-11/12">
        <div>
          
        </div>
        <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">{`${goalBuddy.firstName} ${goalBuddy.lastName}`}</h1>
        <span className="text-sm sm:text-base">{`${goalBuddy.discipline}`}</span>
        {goalBuddy.interests.length > 0 && (
          <ul className="text-sm sm:text-base">
            {goalBuddy.interests.map((interest, index) => (
              <span key={index} className=" list-inside text-sm sm:text-base">
                #{interest}{` `}
              </span>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default GoalBuddyCard
