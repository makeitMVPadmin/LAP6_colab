import React from 'react'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { GoalBuddy } from '../../src/types/types'

/* Get a goalBuddy by their unique userId from the Firestore collection 'goal_buddies'
@author[Aparna]*/ React
const getGoalBuddyByUserId = async (
  userId: string,
): Promise<GoalBuddy | null> => {
  try {
    const goalBuddyDocRef = doc(db, 'goalBuddies', userId)
    const goalBuddyDoc = await getDoc(goalBuddyDocRef)
    if (!goalBuddyDoc.exists()) {
      throw new Error(
        `GoalBuddy does not exist with the particular userId ${userId}`,
      )
    }
    console.log('goalBuddyDocRef', goalBuddyDocRef)
    return goalBuddyDoc.data() as GoalBuddy
  } catch (err) {
    console.error('Error fetching goal buddy by ID', err)
    throw err
  }
}

export default getGoalBuddyByUserId
