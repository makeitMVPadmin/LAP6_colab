import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Modal from '../Modal/Modal'
import clsx from 'clsx'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AllGoalBuddyData } from '@/types/types'

interface GoalBuddyCardProps {
  goalBuddyList: AllGoalBuddyData[]
}

const GoalBuddyCard: React.FC<GoalBuddyCardProps> = ({ goalBuddyList }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 max-w-[1200px]">
      {goalBuddyList?.map((goalBuddy) => (
        <Card
          key={goalBuddy.userId}
          className="flex flex-row min-w-60 max-w-96 min-h-[150px] m-4 bg-[#AAAAAA] cursor-pointer transform transition-transform duration-150 hover:scale-110"
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
      ))}
    </div>
  )
}

export default GoalBuddyCard
