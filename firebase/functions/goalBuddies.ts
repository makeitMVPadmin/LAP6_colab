import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { GoalBuddy, BaseGoalBuddy } from '../../src/types/types'

/*
 * Description: This function fetch all goal buddies in the collection.
 * @author [Fangfang]
 *
 */
export default async function getAllGoalBuddies(): Promise<GoalBuddy[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'goal_buddies'))

    if (querySnapshot.empty) {
      return []
    }

    const goalBuddiesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as BaseGoalBuddy),
    }))
    return goalBuddiesArray
  } catch (error) {
    console.error('Error getting all goalbuddy documents', error)
    throw error
  }
}
