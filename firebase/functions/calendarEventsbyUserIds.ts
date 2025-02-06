import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { BaseEvents, CalendarEvents } from '../../src/types/types'
/*
Description:get All calendar Events by createdUserIds and inviteeUserIds 
@author[Aparna]*/

export async function getCalendarEventsbyUserIds(
  createdUserId: string,
  inviteeUserId: string,
): Promise<CalendarEvents[]> {
  try {
    const events = query(
      collection(db, 'calendar_events'),
      where('createdUserId', '==', createdUserId),
      where('invitedUserId', '==', inviteeUserId),
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
