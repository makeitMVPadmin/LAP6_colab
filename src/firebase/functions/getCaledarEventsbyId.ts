//get All calendar events by Id from calendar_events database

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { baseEvents, calendarEvents } from '../utils/types'

export const getAllCalendarEventsById = async (
  eventId: string,
): Promise<calendarEvents> => {
  try {
    const eventDocRef = doc(db, 'calendar_events', eventId)
    const eventDoc = await getDoc(eventDocRef)

    return {
      id: eventDoc.id,
      ...(eventDoc.data() as baseEvents),
    }
  } catch (error) {
    console.error('Error getting document:', error)
    throw new Error()
  }
}
