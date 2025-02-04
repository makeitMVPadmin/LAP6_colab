import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { GoalBuddy, BaseGoalBuddy } from '../../src/types/types'

/*
 * Description: This function fetch all goal buddies in the collection.
 * @author [Fangfang]
 *
 */
export const getAllGoalBuddies = async (): Promise<GoalBuddy[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'goal_buddies'))
    const goalBuddiesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as BaseGoalBuddy),
    }))
    return goalBuddiesArray
  } catch (error) {
    console.error('Error getting document', error)
    return []
  }
}
