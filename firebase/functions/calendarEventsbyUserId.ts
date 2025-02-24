import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { BaseEvents, CalendarEvents } from '../../src/types/types'
/*
Description:get All calendar Events by inviteeUserIds and 
we should filter events to only include those that occur on or after the specified date.
@author[Aparna]*/

/*modified to handle case where getDocs returns an empty list from all results in the Promise.all, and return an empty array to caller function
Also modified to rethrow the error to caller in cases where getDocs return an error
@author[Jeffrey]*/

/*
* @editor [Katrina]
* Function previously returned an empty array if no date was provided, regardless of other data found. Fixed so that it now returns the merged list of invitee and creator events without applying the date filter.
*/

export async function getUserEvents(
  userId: string,
  date?: Timestamp,
): Promise<CalendarEvents[]> {
  try {
    const inviteeUserQuery = query(
      collection(db, 'calendarEvents'),
      where('invitedUserId', '==', userId),
    )
    const createdUserQuery = query(
      collection(db, 'calendarEvents'),
      where('createdUserId', '==', userId),
    )

    const [inviteeSnapshot, createdSnapshot] = await Promise.all([
      getDocs(inviteeUserQuery),
      getDocs(createdUserQuery),
    ])
    if (inviteeSnapshot.empty && createdSnapshot.empty) {
      return []
    }

    let inviteeEvents: CalendarEvents[] = []
    let creatorEvents: CalendarEvents[] = []

    if (date) {
      inviteeEvents = inviteeSnapshot.docs
        .filter((item) => item.data().eventStartTime >= date)
        .map((item) => ({ id: item.id, ...(item.data() as BaseEvents) }))
      
        creatorEvents = createdSnapshot.docs
        .filter((item) => item.data().eventStartTime >= date)
        .map((item) => ({ id: item.id, ...(item.data() as BaseEvents) }))

    }else{
      inviteeEvents = inviteeSnapshot.docs
        .map((item) => ({ id: item.id, ...(item.data() as BaseEvents) }))
      
        creatorEvents = createdSnapshot.docs
        .map((item) => ({ id: item.id, ...(item.data() as BaseEvents) }))
    }

    const mergeArray: CalendarEvents[] = [...inviteeEvents, ...creatorEvents];
    return mergeArray;

  } catch (error) {
    console.error('Error getting documents: ', error)
    throw error // Re-throw the error to handle it in the calling function
  }
}
