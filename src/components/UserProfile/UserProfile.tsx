import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'
import { getUserById } from '../../../firebase/functions/getUserById'
import { getGoalBuddyByUserId } from '../../../firebase/functions/getGoalBuddyByUserId'
import { GoalBuddy, User } from '@/types/types'
import { editGoalBuddy } from '../../../firebase/functions/editGoalBuddy'

interface UserProfileProps {
  userId: string
}
interface EditData {
  selectedInterests: string[]
  bio: string
  buttonText: string
  isEditing: boolean
}
export const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const interestsLabel = ['Mentor', 'GoalBuddy', 'Networking']
  const [color] = useState<string[]>(['blue', 'green', 'orange'])
  const [userData, setUserData] = useState<User | null>(null)
  const [goalBuddyData, setGoalBuddyData] = useState<GoalBuddy | null>(null)
  const [interestsFromGoalBuddy, setInterestsFromGoalBuddy] = useState<
    string[] | []
  >([])
  const [editData, setEditData] = useState<EditData>({
    selectedInterests: [] as string[],
    bio: '' as string,
    buttonText: 'Edit' as string,
    isEditing: false as boolean,
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
    let newInterests = [] as string[]
    if (goalBuddyData) {
      if (goalBuddyData.isNetworking) {
        newInterests.push('Networking')
      }

      if (goalBuddyData.isAccountabilityPartner) {
        newInterests.push('GoalBuddy')
      }
      if (goalBuddyData.isMentor) {
        newInterests.push('Mentor')
      }

      setEditData((prev) => {
        return {
          ...prev,
          selectedInterests: newInterests,
          bio: goalBuddyData.bio,
        }
      })
      setInterestsFromGoalBuddy(newInterests)
    }
  }, [goalBuddyData])

  const handleChange = (
    interestOrEvent: string | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    return setEditData((prev) => {
      if (typeof interestOrEvent === 'string') {
        return {
          ...prev,
          selectedInterests: prev.selectedInterests.includes(interestOrEvent)
            ? prev.selectedInterests.filter((item) => item !== interestOrEvent)
            : [...prev.selectedInterests, interestOrEvent],
        }
      } else
        return {
          ...prev,
          bio: interestOrEvent.target.value as string,
        }
    })
  }
  const handleInterestAndBioClick = async () => {
    if (!editData.selectedInterests) {
      console.error(
        'selectedInterests is undefined. Setting it to an empty array.',
      )
      editData.selectedInterests = []
    }

    if (!goalBuddyData?.id) {
      console.error('goalBuddyData.id is missing')
      return
    }
    if (editData.isEditing === false) {
      setEditData({ ...editData, isEditing: true, buttonText: 'Save Changes' })
    } else {
      setEditData({ ...editData, buttonText: 'Saved' })
      try {
        const updatedData = {
          bio: editData?.bio,
          isAccountabilityPartner:
            editData?.selectedInterests.includes('GoalBuddy'),
          isMentor: editData?.selectedInterests.includes('Mentor'),
          isNetworking: editData?.selectedInterests.includes('Networking'),
        }
        const response = await editGoalBuddy(goalBuddyData?.id, updatedData)
        if (response.message === 'success') {
          console.log(response)
          console.log('Goal Buddy updated successfully')
        }
        setTimeout(() => {
          setEditData({ ...editData, isEditing: false, buttonText: 'Edit' })
        }, 1500)
      } catch (error) {
        console.error('Error updating Goal Buddy details:', error)
        setEditData({ ...editData, buttonText: 'Not Saved' })
        setTimeout(() => {
          setEditData({
            selectedInterests: interestsFromGoalBuddy,
            bio: goalBuddyData?.bio || '',
            isEditing: false,
            buttonText: 'Edit',
          })
        }, 1500)
      }
    }
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
      <form className="h-[90%]  mt-3 pl-4 font-semibold">
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
            onChange={(e) => handleChange(e)}
            className="w-[90%] h-[78%] p-2 text-sm border border-gray-300 shadow-lg bg-white font-light"
            disabled={
              editData.isEditing == false || editData.buttonText === 'Saved'
            }
          />
        </section>

        <article className="flex w-[90%] justify-end">
          <button
            className={`border bg-blue-600 px-[10px] py-[5px] mt-1 rounded text-sm text-white ${editData.buttonText === 'Not Saved' ? 'bg-red-600' : ''}`}
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
