import React from 'react'
import { db } from '../firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { GoalBuddy } from '../../src/types/types'

/* Get a goalBuddy by their unique userId from the Firestore collection 'goal_buddies'
@author[Aparna]*/

export const getGoalBuddyByUserId = async (
  userId: string,
): Promise<GoalBuddy | []> => {
  try {
    const goalBuddyDocRef = query(
      collection(db, 'goal_buddies'),
      where('userId', '==', userId),
    )
    const goalBuddyDoc = await getDocs(goalBuddyDocRef)
    if (goalBuddyDoc.empty) {
      return []
    }
    const goalBuddyData = goalBuddyDoc.docs[0].data()
    return goalBuddyData as GoalBuddy
  } catch (err) {
    console.error('Error fetching goal buddy by ID', err)
    throw err
  }
}
