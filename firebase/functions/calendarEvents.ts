import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { BaseEvents, CalendarEvents } from '../../src/types/types'
/* Description:Function to get All Calendar events from database
@author[Aparna]*/

export const getAllCalendarEvents = async (): Promise<CalendarEvents[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'calendar_events'))
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as BaseEvents),
    }))
    return events
  } catch (error) {
    console.error('Error fetching calendar events', error)
    throw error // Re-throw the error to handle it in the calling function
  }
}
