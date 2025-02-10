import React, { useState } from "react";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import TimeSelectionList from "../TimeSelectionList/TimeSelectionList";
import { CalendarEvents } from "@/types/types";


export default function MeetingSetupSection(userID: string) {

  // Define state variables needed for creating a meeting event
  const[availability, setAvailability] = useState<Availability[] | undefined>(undefined);
  const[userMeetings, setUserMeetings] = useState<CalendarEvents[] | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [times, setTimes] = useState<String[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // Get the user's availability based on their ID


  // Using the selected date and the user's availability, create a list of times that can be selected for meetings on that day
  function populateTimeListings(selectedDate: Date | undefined){
    // If there is no date selected then there should be no time listings
    if (selectedDate === undefined){
      setTimes([]);
      setDate(undefined);

    //Otherwise, we will look at the user's availability and their current meetings for that date make a list of available times in 30 minute intervals
    }else{
      const availableTimes: String[] = [];

      setDate(selectedDate);
    }
  }

  // Create the date object for the selected date and time
  function createMeetingDate()


  // Create a meeting event based on the selected date and time
  function makeMeetingEvent(event : React.MouseEvent<HTMLButtonElement>){
    console.log(event);
    console.log(date);
  }

  return (
    <div>
      <BookingCalendar selectedDate={date} setDate={populateTimeListings}/>
      <TimeSelectionList availableTimes={times} setSelectedTime={setSelectedTime}/>
      <button onClick={makeMeetingEvent}>Submit</button>
    </div>
  )
}