import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
//** Description: Creating data in the calendarEvents
// @author[Aparna] */

export interface EventData {
  createdUserId: string
  eventDescription: string
  eventStartTime: Date
  eventEndTime: Date
  eventTitle: string
  invitedUserId: string
  eventStatus: 'confirmed' | 'pending' | 'canceled'
  googleEventId: string
}
export async function createCalendarEvent(
  eventData: EventData,
): Promise<object | null> {
  try {
    const eventDoc = {
      eventData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }
    const docRef = await addDoc(collection(db, 'calendar_events'), eventDoc)
    return { ...eventDoc, id: docRef.id }
  } catch (error) {
    console.error('Error creating document: ', error)
    return null
  }
}
