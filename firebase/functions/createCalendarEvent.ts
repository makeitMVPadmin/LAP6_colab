import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
//** Description: Creating data in the calendarEvents
// @author[Aparna] */
export async function createCalendarEvent(
  createdUserId: string,
  eventDescription: string,
  eventStartTime: Date,
  eventEndTime: Date,
  eventTitle: string,
  invitedUserId: string,
  eventStatus: 'confirmed' | 'pending' | 'canceled',
  googleEventId: string,
): Promise<object> {
  try {
    const eventDoc =  {
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      createdUserId: createdUserId,
      eventDescription: eventDescription,
      eventStartTime: Timestamp.fromDate(eventStartTime),
      eventEndTime: Timestamp.fromDate(eventEndTime),
      eventTitle: eventTitle,
      invitedUserId: invitedUserId,
      eventStatus: eventStatus,
      googleEventId: googleEventId
    }
    const docRef = await addDoc(collection(db, 'calendarEvents'), eventDoc)
    const event={...eventDoc, id: docRef.id}
    return event
  } catch (error) {
    console.error('Error creating document: ', error)
    return {}
  }
}
