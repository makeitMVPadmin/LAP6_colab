import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { EventData } from '@/types/types'
import { EventDataSchema } from '../schemas'
//** Description: Creating data in the calendarEvents
// @author[Aparna] */

/*modified to rethrow error to caller function
@author[Jeffrey]*/

/*
* @editor[Katrina]
* Fixed error that stored new events with an eventData field with sub-fields rather than making each data point stored in eventData its own field.
*/

export async function createCalendarEvent(
  eventData: EventData,
): Promise<object | null> {

  try {
    EventDataSchema.parse(eventData)
  } catch (error) {
    console.error('Invalid data is passed', error)
    throw new Error('Invalid data is passed for creating Calendar Event')
  }

  try {
    const eventDoc = {
      ...eventData,
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
