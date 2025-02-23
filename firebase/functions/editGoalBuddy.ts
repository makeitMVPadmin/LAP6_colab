import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { BaseGoalBuddy } from '../../src/types/types'
import { GoalBuddySchema } from '../schemas'

/*
1. Validates the data passed in to see if it adheres to the schema for a BaseGoalBuddy (fields for a document in goal_buddies collection)
2. Updates the goal buddy doc for the given goal buddy id with the passed data
@author[Jeffrey]
*/

export const editGoalBuddy = async (
  goalbuddyId: string,
  updatedData: Partial<BaseGoalBuddy>,
) => {
  try {
    GoalBuddySchema.parse(updatedData)
    const allowedFields = GoalBuddySchema.shape
    Object.keys(updatedData).forEach((key) => {
      if (!allowedFields.hasOwnProperty(key)) {
        throw new Error(`Invalid field: ${key}`)
      }
    })
  } catch (error) {
    console.error('Invalid data is passed', error)
    throw new Error('Invalid data is passed for updating Goal Buddy')
  }

  const goalBuddyRef = doc(db, 'goalBuddies', goalbuddyId)

  try {
    await updateDoc(goalBuddyRef, {
      ...updatedData,
      updatedAt: Timestamp.now(),
    })
    return { id: goalBuddyRef.id, message: 'success' }
  } catch (error) {
    console.error('Error updating Goal Buddy details:', error)
    throw error
  }
}
