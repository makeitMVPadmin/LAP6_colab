import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import  GraduationCap  from  "../../assets/icons/graduation-cap.svg"
import  Network  from "../../assets/icons/network.svg"
import SmilePlus  from "../../assets/icons/smile-plus.svg"
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
    { key: 'isNetworking', label: 'Networking', icon: Network  },
  ]
  return (
    <div className="h-[100%] bg-white text-[14px]">
      <div className="h-[15%] bg-yellow relative rounded">
        <Avatar className="w-[100px] h-[100px] absolute right-[10%] top-[50%] ">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={goalBuddy ? goalBuddy.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
      </div>
      <div className="h-[85%]">
        <div className="mt-2 flex flex-col pl-3 gap-1 font-semibold font-montserrat tracking-wider ">
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
          <label>
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
          <label>
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
          <h2 className="text-lg font-semibold font-fraunces tracking-regular leading-20">Co-Lab Role</h2>
          <section>
            {colabRoles.map((colabRole) => {
              return goalBuddy?.[colabRole.key] ? (
                <div key={colabRole.key} className="flex items-center gap-3 ">
                  <p className="w-[30%] font-montserrat tracking-wider">{colabRole.label}</p>
                  <img src={colabRole.icon} alt="icons" className='w-[20px] h-[20px]' />
                </div>
              ) : null
            })}
          </section>
        </div>
        <section className="border h-[30%] border-gray-600 border-r-2 border-b-2 rounded-md p-2 ml-3 mt-4 mr-2 shadow-[1px_0px_2px_1px_rgba(0,0,0,0.2)]">
          <div className=" font-fraunces font-semibold  text-lg tracking-wider">About</div>
          <p className="font-montserrat tracking-wider">{goalBuddy?.bio}</p>
        </section>
      </div>
    </div>
  )
}

export default GoalBuddyProfile
