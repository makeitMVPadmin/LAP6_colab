
import DummyNavBar from '@/components/DummyNavBar/DummyNavBar'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import { useEffect } from 'react';
import {Timestamp} from 'firebase/firestore';

import { getUserEvents } from '../../../firebase/functions/calendarEventsbyUserIds';

export default function ColabPage() {
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = "RwXczeoWBfq4tEJ5BKoY"; // Replace with the actual user ID
       const date = Timestamp.fromDate(new Date(Date.UTC(2025, 1, 10, 16, 0, 0))) // Optional: Filter events from this date
        const userEvents = await getUserEvents(userId, date);
        console.log(userEvents);
      } catch (error) {
        console.error('Failed to fetch events: ', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main>
     <DummyNavBar />
      <div className="flex justify-center">
        <GoalBuddyCard />
      </div>
    </main>
  )
}
