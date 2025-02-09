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

export async function getUserEvents(
  userId: string,
  date?: Timestamp,
): Promise<CalendarEvents[]> {
  try {
    const inviteeUserQuery = query(
      collection(db, 'calendar_events'),
      where('invitedUserId', '==', userId),
    )
    const createdUserQuery = query(
      collection(db, 'calendar_events'),
      where('createdUserId', '==', userId),
    )

    const [inviteeSnapshot, createdSnapshot] = await Promise.all([
      getDocs(inviteeUserQuery),
      getDocs(createdUserQuery),
    ]);
    let inviteeEvents: CalendarEvents[] = inviteeSnapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as BaseEvents),
    }))
    let createdEvents: CalendarEvents[] = createdSnapshot.docs.map(
      (item) => ({id: item.id, ...(item.data() as BaseEvents)}),
    )
    if (date) {
      inviteeEvents = inviteeEvents.filter(
        (event) => event.eventStartTime >= date,
      )
      createdEvents = createdEvents.filter(
        (event) => event.eventStartTime >= date,
      )
    }

    const mergeArray = [...inviteeEvents,...createdEvents]
    return mergeArray
  } catch (error) {
    console.error('Error getting documents: ', error)
    return []
  }
}
