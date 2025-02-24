import { useContext, useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'
import { editGoalBuddy } from '../../../firebase/functions/editGoalBuddy'
import { IdContext } from '../context/IdContext'

interface EditData {
  selectedInterests: string[]
  bio: string
  buttonText: string
  isEditing: boolean
}
export const UserProfile = () => {
  const interestsLabel = ['Mentor', 'GoalBuddy', 'Networking']
  const [color] = useState<string[]>(['blue', 'green', 'orange'])
  const [errInterest, setErrInterest] = useState<boolean>(false)
  const [interestsFromGoalBuddy, setInterestsFromGoalBuddy] = useState<
    string[] | []
  >([])
  const [editData, setEditData] = useState<EditData>({
    selectedInterests: [] as string[],
    bio: '' as string,
    buttonText: 'Edit' as string,
    isEditing: false as boolean,
  })

  const userContext = useContext(IdContext)
    if (!userContext) {
      throw new Error('IdContext not found')
    }
    const { userData, goalBuddyData, setGoalBuddyData } = userContext

  useEffect(() => {
    if(errInterest)
      setErrInterest(!errInterest)
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
    if (errInterest) setErrInterest(false)
    return setEditData((prev) => {
      if (typeof interestOrEvent === 'string') {
        let updateInterest = [] as string[]
        if (prev.selectedInterests.includes(interestOrEvent))
          updateInterest = prev.selectedInterests.filter(
            (item) => item !== interestOrEvent,
          )
        else updateInterest = [...prev.selectedInterests, interestOrEvent]
        if (updateInterest.length === 0) {
          setErrInterest(true)
          return { ...prev, selectedInterests: [interestOrEvent ]}
        }
        return {
          ...prev,
          selectedInterests: updateInterest,
        }
      } else
        return {
          ...prev,
          bio: interestOrEvent.target.value as string,
        }
    })
  }
  const handleInterestAndBioClick = async () => {
    if (errInterest) setErrInterest(false)
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
      
      try {
        const updatedData = {
          bio: editData?.bio,
          isAccountabilityPartner:
            editData?.selectedInterests.includes('GoalBuddy'),
          isMentor: editData?.selectedInterests.includes('Mentor'),
          isNetworking: editData?.selectedInterests.includes('Networking'),
        }
        setEditData({ ...editData,isEditing:false, buttonText: 'Saved' })
        await editGoalBuddy(goalBuddyData?.id, updatedData)

        const updatedGoalBuddyData = {
          ...goalBuddyData,
          bio: updatedData.bio,
          isAccountabilityPartner: updatedData.isAccountabilityPartner,
          isMentor: updatedData.isMentor,
          isNetworking: updatedData.isNetworking,
        }
        setGoalBuddyData(updatedGoalBuddyData)
      
        setTimeout(() => {
          setEditData({ ...editData, isEditing: false, buttonText: 'Edit' })
        }, 1500)

      } catch (error) {
        console.error(error)
        setEditData({ ...editData, buttonText: 'Not Saved' })
        setTimeout(() => {
          setEditData({
            selectedInterests: interestsFromGoalBuddy,
            bio: goalBuddyData?.bio || '',
            isEditing: false,
            buttonText: 'Edit',
          })
        }, 2000)
      }
    }
  }

  return (
    <div className="h-[100%]  text-[14px]">
      <div className="h-[15%] bg-yellow-300 relative rounded">
        <Avatar className="w-[100px] h-[100px] absolute right-[10%] top-[50%] ">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={userData ? userData.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
      </div>
<div className="h-[85%]">
      <div className="mt-2 flex flex-col pl-3 font-semibold ">
        <label>
          First Name: <span className="font-light">{userData?.firstName}</span>
        </label>
        <label>
          Last Name: <span className="font-light">{userData?.lastName}</span>
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
          {errInterest && <p className='text-md font-light m-0 text-red-600'>There should be one checkbox clicked</p>}
        </section>
        <section className=" border border-gray-400 shadow-md rounded h-[40%] w-[90%] mt-3 pl-3 pt-1">
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
            className={`bg-blue-600 px-[10px] py-[5px] mt-1 rounded text-sm text-white ${editData.buttonText === 'Not Saved' ? 'bg-red-600' : ''}`}
            type="button"
            onClick={handleInterestAndBioClick}
          >
            {editData.buttonText}
          </button>
        </article>
      </form>
      </div>
    </div>
  )
}
