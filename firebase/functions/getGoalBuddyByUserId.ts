import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { GoalBuddy } from '../../src/types/types'

/* Get a goalBuddy by their unique userId from the Firestore collection 'goal_buddies'
@author[Aparna]*/

export const getGoalBuddyByUserId = async (
  userId: string,
): Promise<GoalBuddy | null> => {
  try {
    const goalBuddyDocRef = query(
      collection(db, 'goal_buddies'),
      where('userId', '==', userId),
    )
    const goalBuddyDoc = await getDocs(goalBuddyDocRef)
    if (goalBuddyDoc.empty) {
      throw new Error('No goal buddy found with this user ID')
    }
    const goalBuddyData = goalBuddyDoc.docs[0].data()
    return goalBuddyData as GoalBuddy
  } catch (err) {
    console.error('Error fetching goal buddy by ID', err)
    throw err
  }
}
