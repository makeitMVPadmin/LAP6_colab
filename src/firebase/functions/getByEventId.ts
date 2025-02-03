//GetEvents by unique Id

import { doc, getDoc } from 'firebase/firestore'
import { baseEvents, calendarEvents } from '../utils/type'
import { db } from '../firebase'

export const getByEventId = async (
  eventId: string,
): Promise<calendarEvents> => {
  try {
    // Reference the document by its ID
    const eventDocRef = doc(db, 'calendar_events', eventId)
    const eventDoc = await getDoc(eventDocRef)

    return {
      id: eventDoc.id,
      ...(eventDoc.data() as baseEvents),
    }
  } catch (err) {
    console.error('Error fetching event by ID', err)
    throw err // Re-throw the error to handle it in the calling function
  }
}
