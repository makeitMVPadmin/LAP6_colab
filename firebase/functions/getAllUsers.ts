import { collection, getDocs } from 'firebase/firestore'
import { BaseUser, User } from '../../src/types/types'
import { db } from '../firebase'

/*
Fetch and return an array of User objects from the users collection
@author[Katrina]
*/

/*modified to handle case where getDocs returns an empty list, and the function returns an empty array to caller
@author[Jeffrey]*/

export const getAllUsers = async (): Promise<User[]> => {
  try {

    // Grab all users from the users collection and map them to an array of User objects
    const querySnapshot = await getDocs(collection(db, 'users'));

    if (querySnapshot.empty) {
      return []
    }

    const usersArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as BaseUser),
    }));

    return usersArray;

} catch (err) {
    console.error('Error fetching all users from users collection', err);
    throw err; 
  }
}
