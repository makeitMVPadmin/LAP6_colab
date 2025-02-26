import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import GraduationCap from '../../assets/icons/graduation-cap.svg'
import Network from '../../assets/icons/network.svg'
import SmilePlus from '../../assets/icons/smile-plus.svg'
export interface GoalBuddy {
  profilePhoto: string
  firstName: string
  lastName: string
  email: string
  city: string
  state: string
  country: string
  discipline: string
  skills: string[]
  isAccountabilityPartner?: boolean
  isMentor?: boolean
  isNetworking?: boolean
  bio: string
}

interface GoalBuddyProfileProps {
  goalBuddy: GoalBuddy | null
}
const GoalBuddyProfile: React.FC<GoalBuddyProfileProps> = ({ goalBuddy }) => {
  const colabRoles: Array<{
    key: keyof GoalBuddy
    label: string
    icon: string
  }> = [
    { key: 'isAccountabilityPartner', label: 'Goal Buddy', icon: SmilePlus },
    { key: 'isMentor', label: 'Mentor', icon: GraduationCap },
    { key: 'isNetworking', label: 'Networking', icon: Network },
  ]
  return (
    <div className="h-[100%] bg-white text-[16px] rounded-l-sm">
      <div className="h-[12%] bg-yellow relative rounded-tl-md">
        <Avatar className="w-[90px] h-[90px] absolute right-[10%] top-[40%]">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={goalBuddy ? goalBuddy.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
       
      </div>
      <div className="h-[88%]">
        <div className="mt-2 flex flex-col pl-3 gap-1 font-semibold font-[Montserrat] ">
          <label>
            First Name:{' '}
            <span className="font-light">{goalBuddy?.firstName}</span>
          </label>
          <label>
            Last Name: <span className="font-light">{goalBuddy?.lastName}</span>
          </label>
          <label >
            Email: <span className="font-light">{goalBuddy?.email}</span>
          </label>
          <label className="mt-2">
            City: <span className="font-light">{goalBuddy?.city}</span>
          </label>
          <p className="flex gap-3">
            <label>
              State: <span className="font-light"> {goalBuddy?.state}</span>
            </label>
            <label>
              Country: <span className="font-light">{goalBuddy?.country}</span>
            </label>
          </p>
          <label className="mt-2">
            Discipline:{' '}
            <span className="font-light">{goalBuddy?.discipline}</span>
          </label>
          <label>
            Skills:
            {goalBuddy?.skills.map((skill, index) => (
              <span key={index} className="font-light">
                &nbsp;{skill} {index != goalBuddy?.skills.length - 1 ? ',' : ''}
              </span>
            ))}
          </label>
        </div>
        <div className="border border-gray-600 border-b-2  border-r-2 rounded-md p-2 ml-3 mt-4 mr-2 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]">
          <h2 className="text-lg font-semibold font-[Fraunces] tracking-regular leading-20">
            Co-Lab Role
          </h2>
          <section className='sm:hidden md:block'>
            {colabRoles.map((colabRole) => {
              return goalBuddy?.[colabRole.key] ? (
                <div key={colabRole.key} className="flex items-center gap-5 ">
                  <p className="w-[30%] font-[Montserrat]  font-semibold">
                    {colabRole.label}
                  </p>
                  <img
                    src={colabRole.icon}
                    alt="icons"
                    className="w-[20px] h-[20px]"
                  />
                </div>
              ) : null
            })}
          </section>
        </div>
        <section className="border border-gray-600 border-r-2 border-b-2 rounded-md pl-4 pt-1 pb-1 ml-3 mt-4 mr-2 shadow-[1px_0px_2px_1px_rgba(0,0,0,0.2)]">
          <div className=" font-fraunces font-semibold text-lg tracking-wide">
            About
          </div>
          <p className=" font-[Montserrat] text-gray-400 tracking-wider">{goalBuddy?.bio}</p>
        </section>
      </div>
    </div>
  )
}

export default GoalBuddyProfile
