import { GoalBuddy, IdType, User } from '@/types/types'
import { getGoalBuddyByUserId } from '../../../firebase/functions/getGoalBuddyByUserId'
import { getUserById } from '../../../firebase/functions/getUserById'
import { createContext, useEffect, useState } from 'react'

export const IdContext = createContext<IdType | undefined>(undefined)
import { ReactNode } from 'react'

export const IdProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState<User | null>(null)
	const [goalBuddyData, setGoalBuddyData] = useState<GoalBuddy | null>(null)
  const [isActiveUserFetched, setIsActiveUserFetched] = useState<boolean>(false)
	
	const userId = 'oPpkEtk18BefnQNijnUU'

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, goalBuddyResponse] = await Promise.all([
          getUserById(userId),
          getGoalBuddyByUserId(userId),
        ])
        setUserData(userResponse)
        setGoalBuddyData(goalBuddyResponse)
        setIsActiveUserFetched(true)
      } catch (error) {
        console.error('Failed to fetch data', error)
      }
    }
    fetchUserData()
  }, [userId])

  return (
    <IdContext.Provider
      value={{ userData, setUserData, goalBuddyData, setGoalBuddyData, isActiveUserFetched }}
    >
      {children}
    </IdContext.Provider>
  )
}
