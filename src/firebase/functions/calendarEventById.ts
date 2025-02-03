/*GetEvents by unique Id
@author[Aparna]*/

import { doc, getDoc } from 'firebase/firestore'
import { BaseEvents, CalendarEvents } from '../../utils/types'
import { db } from '../firebase'

export const getByEventId = async (
  eventId: string,
): Promise<CalendarEvents> => {
  try {
    // Reference the document by its ID
    const eventDocRef = doc(db, 'calendar_events', eventId)
    const eventDoc = await getDoc(eventDocRef)

    return {
      id: eventDoc.id,
      ...(eventDoc.data() as BaseEvents),
    }
  } catch (err) {
    console.error('Error fetching event by ID', err)
    throw err // Re-throw the error to handle it in the calling function
  }
}
