import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore'
import { BaseUser, User } from '../../src/types/types'
import { db } from '../firebase'

/*
* Fetch and return an array of User objects from the users collection
* @author[Katrina]
* @editor[Jeffrey]
* modified to handle case where getDocs returns an empty list, and the function returns an empty array to caller
* @editor[Katrina]
* To optimize the fetch do not grab "all" users. only those relevant to colab users
*/

export const getAllUsers = async (userIds: string[]): Promise<User[]> => {
  try {

    // If there are no ids to match, then just return empty
    if(userIds.length === 0){
      return [];
    }

    // Fetch users by their document IDs
    const userPromises = userIds.map((userId) => getDoc(doc(db, 'users', userId)));
    const userDocs = await Promise.all(userPromises);

    if(userDocs.length === 0){
      return [];
    }

    // Filter out any non-existent users and map to User objects
    const usersArray = userDocs
    .filter((doc) => doc.exists())
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as BaseUser),
    }));

    return usersArray;

} catch (error) {
    console.error('Error fetching all users from users collection', error);
    throw error; 
  }
}
