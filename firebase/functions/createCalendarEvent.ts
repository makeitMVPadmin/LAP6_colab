import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { EventData } from '@/types/types'
//** Description: Creating data in the calendarEvents
// @author[Aparna] */

/*modified to rethrow error to caller function
@author[Jeffrey]*/

export async function createCalendarEvent(
  eventData: EventData,
): Promise<object | null> {
  try {
    const eventDoc = {
      eventData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }
    const docRef = await addDoc(collection(db, 'calendarEvents'), eventDoc)
    return { ...eventDoc, id: docRef.id }
  } catch (error) {
    console.error('Error creating calendar event: ', error)
    throw error
  }
}
