import {
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '../firebase'
import { GoalBuddy } from '../../src/types/types'

export const editGoalBuddyBioAndInterest = async (
  userId: string,
  updatedData: Partial<{
    bio: string
    isNetworking: boolean
    isAccountabilityPartner: boolean
    isMentor: boolean
  }>,
): Promise<GoalBuddy> => {
  try {
    const goalBuddyQuery = query(
      collection(db, 'goalBuddies'),
      where('userId', '==', userId),
    )
    const goalBuddySnapshot = await getDocs(goalBuddyQuery)
    if (goalBuddySnapshot.empty) {
      throw new Error('No goal buddy found with this user ID')
    }

    const docRef = doc(db, 'goalBuddies', goalBuddySnapshot.docs[0].id)
    const updatedAt = Timestamp.now()
    const updates: Partial<GoalBuddy> = { updatedAt }

    if (updatedData.isNetworking !== undefined) {
      updates.isNetworking = updatedData.isNetworking
    }

    if (updatedData.isAccountabilityPartner !== undefined) {
      updates.isAccountabilityPartner = updatedData.isAccountabilityPartner
    }
    if (updatedData.isMentor !== undefined) {
      updates.isMentor = updatedData.isMentor
    }
    if (updatedData.bio) {
      updates.bio = updatedData.bio
    }

    await updateDoc(docRef, updates)
    return {
      id: docRef.id,
      ...updates,
    } as GoalBuddy
  } catch (error) {
    console.error('Failed to edit Goal Buddy Bio and Interests', error)
    throw new Error('Failed to edit Goal Buddy Bio and Interests')
  }
}
