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
    <div className="h-full flex flex-col bg-white text-[16px] rounded-l-sm">
      <div className="h-[10%] lg:h-[12%] md:h-[12%] bg-yellow relative md:relative sm:relative rounded-tl-md">
        <Avatar className="w-[55px] h-[55px] lg:w-[90px] lg:h-[90px] md:w-[70px] md:h-[70px] absolute lg:absolute md:absolute top-[50%] right-[5%] md:top-[65%]  lg:right-[10%] lg:top-[40%] ">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={goalBuddy ? goalBuddy.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
        <p className='lg:hidden md:hidden absolute top-[50%] right-[21%] font-fraunces text-md font-bold'>Co-Lab Role</p>
        <div className='flex gap-1 absolute lg:hidden md:hidden top-[110%] right-[20%]'>
          {
            goalBuddy && colabRoles.map((colabRole, index) => (
              <img  key={index} src={colabRole.icon} alt="" className='w-4 h-4'/>
            )) 
          }
        </div>
      </div>
      <div className="h-[90%] md:h-[88%] md:overflow-y-auto scrollbar-hidden">
        <div className="mt-2 flex flex-col pl-3 gap-1 font-semibold font-font-montserrat ">
          <label>
            First Name:{' '}
            <span className="font-light">{goalBuddy?.firstName}</span>
          </label>
          <label>
            Last Name: <span className="font-light">{goalBuddy?.lastName}</span>
          </label>
          <label>
            Email: <span className="font-light">{goalBuddy?.email}</span>
          </label>
          <label className="mt-0 lg:mt-2 md:mt-2 ">
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
          <label className="mt-0 md:mt-2 lg:mt-2">
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
        <div className=" hidden sm:hidden border border-gray-600 border-b-2 md:block border-r-2 rounded-md p-2 ml-3 mt-4 mr-2 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.2)]">
          <h2 className="hidden sm:hidden text-lg font-semibold font-fraunces tracking-regular leading-20 md:block ">
            Co-Lab Role
          </h2>
          <section className="sm:hidden md:block">
            {colabRoles.map((colabRole) => {
              return goalBuddy?.[colabRole.key] ? (
                <div key={colabRole.key} className="flex items-center gap-5 ">
                  <p className="w-[40%] text-sm font-semibold font-montserrat">
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
        <section className="border border-gray-600 border-r-2 border-b-2 rounded-md pl-4 pt-1 pb-1 ml-3 mt-4 mr-2 mb-3 shadow-[1px_0px_2px_1px_rgba(0,0,0,0.2)]">
          <div className=" font-fraunces font-semibold text-lg tracking-wide">
            About
          </div>
          <p className="font-montserrat text-gray-400 tracking-wider">
            {goalBuddy?.bio}
          </p>
        </section>
      </div>
    </div>
  )
}

export default GoalBuddyProfile
