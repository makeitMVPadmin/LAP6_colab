import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'
import { getUserById } from '../../../firebase/functions/getUserById'
import { getGoalBuddyByUserId } from '../../../firebase/functions/getGoalBuddyByUserId'
import { GoalBuddy, User } from '@/types/types'

interface UserProfileProps {
  userId: string
}
export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const interestsLabel = ['Mentor', 'GoalBuddy', 'Networking']
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [userData, setUserData] = useState<User | null>(null)
  const [goalBuddyData, setGoalBuddyData] = useState<GoalBuddy | null>(null)
  const [bio, setBio] = useState<string>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Edit')

  useEffect(() => {
    const fetchData = async () => {
      const [userResponse, goalBuddyResponse] = await Promise.all([
        getUserById(userId),
        getGoalBuddyByUserId(userId),
      ])
      setUserData(userResponse)
      setGoalBuddyData(goalBuddyResponse)
      if (goalBuddyResponse) setBio(goalBuddyResponse.bio)
    }
    fetchData()
  }, [userId])

  useEffect(() => {
    if (goalBuddyData) {
      const interestsFromGoalBuddy: string[] = []
      if (goalBuddyData.isMentor) interestsFromGoalBuddy.push('Mentor')
      if (goalBuddyData.isNetworking) interestsFromGoalBuddy.push('Networking')
      if (goalBuddyData.isAccountabilityPartner)
        interestsFromGoalBuddy.push('GoalBuddy')
      setSelectedInterests(interestsFromGoalBuddy)
    }
  }, [goalBuddyData])

  const handleChange = (interest: string) => {
    setSelectedInterests((prev: string[]) => {
      if (prev.includes(interest)) return prev.filter((i) => i !== interest)
      else return [...prev, interest]
    })
  }
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }
  const handleInterestAndBioClick = () => {
    if (isEditing === false) {
      setIsEditing(true)
      setButtonText('Save Changes')
    } else {
      setButtonText('Saved');
      alert("The changes are saved")
      setTimeout(() => {
        setIsEditing(false)
        setButtonText('Edit')
      }, 1500)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="h-full">
      <div className="relative mt-4">
        <hr className="border border-gray-300" />
        <Avatar className="w-[65px] h-[65px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={userData ? userData.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <section className="flex gap-20 text-[15px]">
          <p>
            <label>Lastname :</label>
            <span className="text-[13px]">&nbsp;{userData?.lastName}</span>
          </p>
          <p>
            <label htmlFor="">Firstname :</label>
            <span className="text-[13px]">&nbsp;{userData?.firstName}</span>
          </p>
        </section>
        <section className="text-[15px]">
          <label htmlFor="">Address :</label>
          <span className="text-[13px] bg-[#D7D9B9]">&nbsp;&nbsp;</span>

          <section className="flex md:gap-2 text-[15px]">
            <p>
              City: <span className="text-[13px]">{userData?.city}</span>
            </p>
            <p>
              State: <span className="text-[13px]">{userData?.state} </span>
            </p>
            <p>
              Country: <span className="text-[13px]">{userData?.country}</span>
            </p>
          </section>
        </section>

        <section className="text-[15px]">
          <p className="flex">
            <label className=" w-[25%]">Discipline : </label>
            <span className="text-[13px]">{userData?.discipline}</span>
          </p>
          <p className="flex">
            <label className="w-[20%]">Email : </label>
            <span className="text-[13px]"> {userData?.email}</span>
          </p>
          <p className="flex">
            <label className="w-[20%]">Skills : </label>
            {goalBuddyData?.skills.map((skill, index) => (
              <span key={index} className="text-[13px]">
                {skill},
              </span>
            ))}
          </p>
        </section>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col h-[90%] gap-2">
        <div className="mt-6">
          <h2 className="text-lg  font-semibold">Area of Interest </h2>
          <section className="mt-2">
            {interestsLabel.map((interest, _index) => {
              return (
                <div key={_index} className="flex gap-20">
                  <span className="w-[150px] text-[15px]">{interest}</span>
                  <input
                    type="checkbox"
                    checked={selectedInterests.includes(interest)}
                    onChange={() => handleChange(interest)}
                    disabled={isEditing === false}
                  />
                </div>
              )
            })}
          </section>
        </div>
        <section className=" border border-gray-600 p-2 shadow-md rounded h-[33%] w-[90%] mt-5">
          <h2 className="mb-2 font-semibold">My Bio</h2>
          <textarea
            value={bio ? bio : ''}
            onChange={(e) => handleBioChange(e)}
            className="w-[90%] h-[70%] p-2 text-sm border border-gray-300 shadow-lg"
            disabled={isEditing == false || buttonText === 'Saved'}
          />
        </section>

        <article className="flex w-[90%] justify-end">
          <button
            className="border bg-blue-600 px-[10px] py-[5px] rounded text-sm text-white"
            type="button"
            onClick={handleInterestAndBioClick}
          >
            {buttonText}
          </button>
        </article>
      </form>
    </div>
  )
}
