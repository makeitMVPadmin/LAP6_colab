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
  const [color] = useState<string[]>(['blue', 'green', 'orange'])
  const [userData, setUserData] = useState<User | null>(null)
  const [goalBuddyData, setGoalBuddyData] = useState<GoalBuddy | null>(null)

  const [editData, setEditData] = useState({
    selectedInterests: [],
    bio: '',
    buttonText: 'Edit',
    isEditing: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      const [userResponse, goalBuddyResponse] = await Promise.all([
        getUserById(userId),
        getGoalBuddyByUserId(userId),
      ])
      setUserData(userResponse)
      setGoalBuddyData(goalBuddyResponse)
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
      setEditData({
        ...editData,
        selectedInterests: [interestsFromGoalBuddy],
        bio: goalBuddyData.bio,
      })
    }
  }, [goalBuddyData])

  const handleChange = (interest: string) => {
    setEditData({
      ...editData,
      selectedInterests: [
        (prev: string[]) => {
          if (prev.includes(interest)) return prev.filter((i) => i !== interest)
          else return [...prev, interest]
        },
      ],
    })
  }
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditData({ ...editData, bio: e.target.value })
  }
  const handleInterestAndBioClick = () => {
    if (editData.isEditing === false) {
      setEditData({ ...editData, isEditing: true })
      setEditData({ ...editData, buttonText: 'Saved Changes' })
    } else {
      setEditData({ ...editData, buttonText: 'Saved' })

      setTimeout(() => {
        setEditData({ ...editData, isEditing: false })
        setEditData({ ...editData, buttonText: 'Edit' })
      }, 1500)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="h-[100%]  text-[14px]">
      <div className="h-[15%] bg-yellow-300 relative">
        <Avatar className="w-[100px] h-[100px] absolute right-[10%] top-[50%] ">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={userData ? userData.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
      </div>

      <div className=" mt-2 flex flex-col pl-3 font-semibold ">
        <label>
          FirstName: <span className="font-light">{userData?.firstName}</span>
        </label>
        <label>
          LastName: <span className="font-light">{userData?.lastName}</span>
        </label>
        <label>
          Email: <span className="font-light">{userData?.email}</span>
        </label>
        <label>
          City: <span className="font-light">{userData?.city}</span>
        </label>
        <p className="flex gap-3">
          <label>
            State: <span className="font-light"> {userData?.state}</span>
          </label>
          <label>
            Country: <span className="font-light">{userData?.country}</span>
          </label>
        </p>
        <label>
          Discipline: <span className="font-light">{userData?.discipline}</span>
        </label>
        <label>
          Skills:
          {goalBuddyData?.skills.map((skill, index) => (
            <span key={index} className="font-light">
              &nbsp;{skill} , 
            </span>
          ))}
        </label>
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-[90%]  mt-3 pl-4 font-semibold"
      >
        <h2 className="text-lg font-semibold">Colab Role </h2>
        <section className="">
          {interestsLabel.map((interest, _index) => {
            return (
              <div key={_index} className="flex gap-20">
                <div className="flex items-center gap-1 w-[30%]">
                  <div
                    className="w-2 h-2"
                    style={{ backgroundColor: color[_index] }}
                  ></div>
                  <span>{interest}</span>
                </div>

                <input
                  type="checkbox"
                  checked={editData.selectedInterests.includes(interest)}
                  onChange={() => handleChange(interest)}
                  disabled={editData.isEditing === false}
                />
              </div>
            )
          })}
        </section>
        <section className=" border border-gray-400 shadow-md rounded h-[32%] w-[90%] mt-3 pl-3 pt-1">
          <h2 className="p-0 font-semibold">About</h2>
          <textarea
            value={editData.bio ? editData.bio : ''}
            onChange={(e) => handleBioChange(e)}
            className="w-[90%] h-[78%] p-2 text-sm border border-gray-300 shadow-lg bg-white font-light"
            disabled={
              editData.isEditing == false || editData.buttonText === 'Saved'
            }
          />
        </section>

        <article className="flex w-[90%] justify-end">
          <button
            className="border bg-blue-600 px-[10px] py-[5px] mt-1 rounded text-sm text-white"
            type="button"
            onClick={handleInterestAndBioClick}
          >
            {editData.buttonText}
          </button>
        </article>
      </form>
    </div>
  )
}
