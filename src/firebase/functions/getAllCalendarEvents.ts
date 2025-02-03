// Get All Calendar events from database

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { baseEvents, calendarEvents } from "../utils/types";

export const getAllCalendarEvents = async (): Promise<calendarEvents[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'calendar_events'));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as baseEvents),
    }));
    return events;
  } catch (err) {
    console.error("Error fetching calendar events", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};