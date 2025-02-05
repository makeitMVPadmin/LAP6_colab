import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { User, BaseUser } from '../../src/types/types'

/*
 * Description: This function fetch all users in the collection.
 * @author [Kevin]
 *
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const usersArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as BaseUser),
    }))
    return usersArray
  } catch (error) {
    console.error('Error getting document', error)
    return []
  }
}
