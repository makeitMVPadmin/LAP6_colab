import { db } from '../firebase'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { GoalBuddy } from '../../src/types/types'

/* Get a goalBuddy by their unique userId from the Firestore collection 'goal_buddies'
* @author[Aparna]
* @editor[Katrina]
* Set limit of one so the search stops after finding them
*/

export const getGoalBuddyByUserId = async (
  userId: string,
): Promise<GoalBuddy | null> => {
  try {
    const goalBuddyQuery = query(
      collection(db, 'goalBuddies'),
      where('userId', '==', userId),
      limit(1)
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
