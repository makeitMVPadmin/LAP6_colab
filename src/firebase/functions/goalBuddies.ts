import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

export const getAllGoalBuddies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'goal_buddies'))
    const goalBuddiesArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return goalBuddiesArray
  } catch (error) {
    console.error('Error getting document', error)
    return []
  }
}
