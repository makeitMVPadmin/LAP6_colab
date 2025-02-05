/*GetUsers by unique Id
@author[Kevin]*/

import { doc, getDoc } from 'firebase/firestore'
import { BaseUser, User } from '../../src/types/types'
import { db } from '../firebase'

export const getUserById = async (
  userId: string,
): Promise<User> => {
  try {
    // Reference the document by its ID
    const userDocRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userDocRef)

    return {
      id: userDoc.id,
      ...(userDoc.data() as BaseUser),
    }
  } catch (err) {
    console.error('Error fetching user by ID', err)
    throw err // Re-throw the error to handle it in the calling function
  }
}
