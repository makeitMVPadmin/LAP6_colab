import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface GoalBuddyProfileProps{
    goalbuddy:object
}
const GoalBuddyProfile:React.FC<GoalBuddyProfileProps> = ({goalbuddy}) => {
    console.log(goalbuddy)
  return (
    <div className="h-[100%]  text-[14px]">
        
       <div className="h-[15%] bg-yellow-300 relative rounded">
        <Avatar className="w-[100px] h-[100px] absolute right-[10%] top-[50%] ">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={goalbuddy ? goalbuddy.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
      </div> 
      
    </div>
  )
}

export default GoalBuddyProfile
