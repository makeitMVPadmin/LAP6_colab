/*GetEvents by unique Id
@author[Aparna]*/

import { doc, getDoc } from 'firebase/firestore'
import { BaseEvents, CalendarEvents } from '../../src/types/types'
import { db } from '../firebase'

export const getByEventId = async (
  eventId: string,
): Promise<CalendarEvents> => {
  try {
    // Reference the document by its ID
    const eventDocRef = doc(db, 'calendar_events', eventId)
    const eventDoc = await getDoc(eventDocRef)

    if (eventDoc.exists()) {
      return {
        id: eventDoc.id,
        ...(eventDoc.data() as BaseEvents),
      }
    } else {
      throw new Error(`Event with ID ${eventId} doesn't exist`)
    }
  } catch (err) {
    console.error('Error fetching event by ID', err)
    throw err // Re-throw the error to handle it in the calling function
  }
}
