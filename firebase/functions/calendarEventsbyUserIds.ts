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
Description:get All calendar Events by either createdUserIds or inviteeUserIds and 
we should filter events to only include those that occur on or after the specified date.
@author[Aparna]*/

export async function getCalendarEventsbyUserIds(
  userId: string,
  date?: Timestamp,
): Promise<CalendarEvents[]> {
  try {
    let events;
    if (date) {
      events = query(
        collection(db, 'calendar_events'),
        where('eventStartTime', '>=', date),
        where('createdUserId', '==', userId),
      )
    } else
      events = query(
        collection(db, 'calendar_events'),
        where('createdUserId', '==', userId),
      )
    const querySnapshot = await getDocs(events)
    const calendarEventsArray: CalendarEvents[] = querySnapshot.docs.map(
      (item) => {
        return {
          id: item.id,
          ...(item.data() as BaseEvents),
        }
      },
    )
    return calendarEventsArray
  } catch (error) {
    console.error('Error getting documents: ', error)
    return []
  }
}
