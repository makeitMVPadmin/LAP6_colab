import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

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
  colabRole: object
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
    color: string
  }> = [
    { key: 'isAccountabilityPartner', label: 'Goal Buddy', color: 'green' },
    { key: 'isMentor', label: 'Mentor', color: 'blue' },
    { key: 'isNetworking', label: 'Networking', color: 'orange' },
  ]
  return (
    <div className="h-[100%]  text-[14px]">
      <div className="h-[15%] bg-yellow-300 relative rounded">
        <Avatar className="w-[100px] h-[100px] absolute right-[10%] top-[50%] ">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={goalBuddy ? goalBuddy.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
      </div>
      <div className="h-[85%]">
        <div className="mt-2 flex flex-col pl-3 font-semibold ">
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
                {skill} {index != goalBuddy?.skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </label>
        </div>
        <div className="border border-gray-600 rounded-md p-2 ml-3 mt-4 mr-2 shadow-[1px_1px_2px_3px_rgba(0,0,0,0.2)]">
          <h2 className="text-lg font-semibold">Colab-Role</h2>
          <section>
            {colabRoles.map((colabRole) => {
              return goalBuddy?.[colabRole.key] ? (
                <p key={colabRole.key} className="flex items-center gap-6 ">
                  <p className="w-[30%]">{colabRole.label}</p>
                  <p
                    className="w-2 h-2"
                    style={{ backgroundColor: colabRole.color }}
                  ></p>
                </p>
              ) : null
            })}
          </section>
        </div>
        <section className="border h-[30%] border-gray-600 rounded-md p-2 ml-3 mt-4 mr-2 shadow-[1px_1px_2px_3px_rgba(0,0,0,0.2)]">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="">{goalBuddy?.bio}</p>
        </section>
      </div>
    </div>
  )
}

export default GoalBuddyProfile
