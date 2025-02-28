import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { GoalBuddy } from '../../src/types/types'

/* Get a goalBuddy by their unique userId from the Firestore collection 'goal_buddies'
@author[Aparna]*/

export const getGoalBuddyByUserId = async (
  userId: string,
): Promise<GoalBuddy | null> => {
  try {
    const goalBuddyQuery = query(
      collection(db, 'goalBuddies'),
      where('userId', '==', userId),
    )
    const goalBuddyDoc = await getDocs(goalBuddyQuery)
    if (goalBuddyDoc.empty) {
      throw new Error('No goal buddy found with this user ID')
    }
    const goalBuddyData = goalBuddyDoc.docs[0].data()
    return { id: goalBuddyDoc.docs[0].id, ...goalBuddyData } as GoalBuddy
  } catch (error) {
    console.error("Couldn't find goal buddy")
    throw error
  }
}
