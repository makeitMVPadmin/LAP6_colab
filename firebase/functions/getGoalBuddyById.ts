import { doc, getDoc } from 'firebase/firestore'
import { BaseGoalBuddy, GoalBuddy } from '../../src/types/types'
import { db } from '../firebase'

/*
 * Get a goal_buddy by unique Id
 * @author [Fangfang]
 */

export const getGoalBuddyById = async (
  id: string,
): Promise<GoalBuddy | null> => {
  try {
    // Reference the document by its ID
    const goalBuddyDocRef = doc(db, 'goal_buddies', id)
    const goalBuddyDocSnapshot = await getDoc(goalBuddyDocRef)

    if (!goalBuddyDocSnapshot.exists()) {
      throw new Error(`document with id: ${id} does not exist`)
    }
    return {
      id: goalBuddyDocSnapshot.id,
      ...(goalBuddyDocSnapshot.data() as BaseGoalBuddy),
    }
  } catch (error) {
    console.error('Error fetching one goal buddy by ID', error)
    return null
  }
}
