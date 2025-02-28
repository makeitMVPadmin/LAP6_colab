import { useContext, useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '../ui/avatar'
import { editGoalBuddy } from '../../../firebase/functions/editGoalBuddy'
import { IdContext } from '../context/IdContext'
import mentor from '../../assets/icons/graduation-cap.svg'
import networking from '../../assets/icons/network.svg'
import goalbuddy from '../../assets/icons/smile-plus.svg'
import React from 'react'
import { Button } from '../ui/button'
interface EditData {
  selectedInterests: string[]
  bio: string
  buttonText: string
  isEditing: boolean
}

export const UserProfile = () => {
  const interestsLabel = ['Mentor', 'GoalBuddy', 'Networking']
  const icons = [mentor, goalbuddy, networking]
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
    if (errInterest) setErrInterest(!errInterest)
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
          return { ...prev, selectedInterests: [interestOrEvent] }
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
        setEditData({ ...editData, isEditing: false, buttonText: 'Saved' })
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
    <div className="h-full w-full flex flex-col flex-grow text-[14px] relative">
      <div className="h-[7%] md:h-[12%] bg-yellow md:sticky top-0 left-0 w-[100%] z-10">
        <Avatar className="lg:w-[90px] lg:h-[90px] md:w-[90px] md:h-[90px] w-[62px] h-[62px] lg:absolute md:absolute absolute right-[10%] top-[4%] md:top-[50%] ">
          <AvatarFallback className="bg-[#B7D9B9]" />
          <AvatarImage
            src={userData ? userData.profilePhoto : ''}
            alt="@shadcn"
          />
        </Avatar>
      </div>
      <div className="h-[93%] md:h-[88%] flex flex-col">
        <div className="h-fit mt-2 flex flex-col pl-3 gap-0 font-medium text-sm font-montserrat tracking-wide">
          <label>
            First Name:{` `}
            <span className="font-normal">{userData?.firstName}</span>
          </label>
          <label>
            Last Name: <span className="font-normal">{userData?.lastName}</span>
          </label>
          <label>
            Email: <span className="font-normal">{userData?.email}</span>
          </label>
          <label className="lg:mt-2 md:mt-2">
            City: <span className="font-normal">{userData?.city}</span>
          </label>
          <p className="flex gap-0 lg:gap-3 md:gap-3">
            <label>
              State: <span className="font-normal"> {userData?.state}</span>
            </label>
            <label>
              Country: <span className="font-normal">{userData?.country}</span>
            </label>
          </p>
          <label className="md:mt-2 lg:mt-2">
            Discipline:{' '}
            <span className="font-normal">{userData?.discipline}</span>
          </label>
          <label>
            Skills:
            {goalBuddyData?.skills.map((skill, index) => (
              <span key={index} className="font-normal">
                {index !== goalBuddyData?.skills.length - 1
                  ? ` ${skill}, `
                  : skill}
              </span>
            ))}
          </label>
        </div>
        <form className="h-full md:h-auto flex-grow mt-2 pl-3 font-montserrat flex flex-col justify-between">
          <div className="flex flex-col flex-grow">
            <section className="border border-1 w-[95%]  border-gray-600 border-r-2 border-b-2 rounded relative shadow-lg py-2 px-3">
              <h2 className="text-base font-semibold font-fraunces tracking-regular leading-20">
                Co-Lab Role{' '}
              </h2>
              {interestsLabel.map((interest, _index) => {
                return (
                  <div key={_index} className="flex gap-5">
                    <div className="flex gap-2 w-[40%]">
                      <div className="w-[20px] h-[20px]">
                        <img src={icons[_index]} />
                      </div>
                      <span className="tracking-wide text-sm font-medium font-montserrat">
                        {interest}
                      </span>
                    </div>

                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={editData.selectedInterests.includes(interest)}
                        onChange={() => handleChange(interest)}
                        disabled={editData.isEditing === false}
                        className="appearance-none w-4 h-4 border border-gray-600 rounded checked:bg-black"
                      />
                    </div>
                  </div>
                )
              })}
              {errInterest && (
                <p className="text-sm font-semibold font-montserrat m-0 text-red-600 absolute top-1 right-2">
                  *Please select your role
                </p>
              )}
            </section>
            <section className="flex flex-col flex-grow border border-gray-600 border-r-2 border-b-2 shadow-md rounded min-h-[30%] w-[95%] mt-2 px-[12.9px] py-[19.2px]">
              <h2 className="p-0 font-fraunces font-semibold text-base">{`My Profile`}</h2>
              <textarea
                value={editData.bio ? editData.bio : ''}
                onChange={(e) => handleChange(e)}
                className="w-full resize-none flex-grow max-h-full overflow-y-auto text-gray-600 min-h-[70%] p-2 text-[16px] shadow-lg bg-white font-montserrat font-light rounded-sm border border-[#80909a]"
                disabled={
                  editData.isEditing == false || editData.buttonText === 'Saved'
                }
              />
            </section>
          </div>
          <article className="flex w-[95%] justify-end pb-8 mt-5">
            <Button
              variant="colabSecondary"
              size="colabSecondary"
              type="button"
              className={`h-[38px] ${editData.buttonText === 'Not Saved' ? 'bg-red-600' : ''}`}
              onClick={handleInterestAndBioClick}
            >
              {editData.buttonText}
            </Button>
          </article>
        </form>
      </div>
    </div>
  )
}
