import React, { useState, useEffect } from "react";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import TimeSelectionList from "../TimeSelectionList/TimeSelectionList";
import { CalendarEvents, GoalBuddy, Availabilities, TimePeriod, Time } from "@/types/types";
import {getUserEvents} from "../../../firebase/functions/calendarEventsbyUserId";
import { Timestamp } from "firebase/firestore";
import {dayAsString, findAvailabilityForDay, createTimestamp, isExistingStartTime} from "../../utils/dateHelpers";


export default function MeetingSetupSection(goalBuddy: GoalBuddy) {

  // Define state variables needed for creating a meeting event
  const[availability, setAvailability] = useState<Availabilities[]>(goalBuddy.availabilities);
  const[userMeetings, setUserMeetings] = useState<CalendarEvents[] | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [times, setTimes] = useState<TimePeriod[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);

  // Fetch the user's current meetings so they can be used to help determine availability
  useEffect(() => {
    const fetchUserMeetings = async (userId: string) => {
      // Limit the user's meetings to only those that occur on or after the current date
      const currentDate : Timestamp = Timestamp.now();
      const data = await getUserEvents(userId, currentDate);
      console.log(data);
      
      // If the user has no meetings, set the userMeetings state to an empty array
      if(data === 'No events found with that userId'){
        setUserMeetings([]);

      // Otherwise, set the userMeetings state to the data returned from the getUserEvents function
      }else{
        setUserMeetings(data as CalendarEvents[]);
      
      }
    }
    fetchUserMeetings(goalBuddy.userId)
  }, []);

  // Using the selected date and the user's availability, create a list of times that can be selected for meetings on that day
  function populateTimeListings(selectedDate: Date | undefined){
    // If there is no date selected then there should be no time listings
    if (selectedDate === undefined){
      setTimes([]);
      setDate(undefined);

    //Otherwise, we will look at the user's availability and their current meetings for that date and make a list of available times in 30 minute intervals
    }else{
      const availableTimes: TimePeriod[] = [];
      
      const selectedDay: string = dayAsString(selectedDate.getDay());
      const dailyAvailability = findAvailabilityForDay(selectedDay, availability);

      // If the user has no availability for the selected day, set the times state to an empty array as no times will be available
      if(dailyAvailability === undefined || dailyAvailability.timePeriod.length === 0){
        setTimes([]);

      // Otherwise, we will create a list of available times for the selected day
      }else{
        const meetingTimes: TimePeriod[] = dailyAvailability.timePeriod;
        
        // Go throuh each of the user's availability time periods for this day and add each 30 minute interval to the availableTimes array
        for(let i = 0; i < meetingTimes.length; i++){
          const timeRange: TimePeriod = meetingTimes[i];
          const meetingTime: Time = timeRange.startTime;
          const endTime: Time = timeRange.endTime;
          
          // Add each available 30 minute interval in this TimePeriod to the availableTimes array
          while(meetingTime !== endTime){
            
            // Create a Time object for the end of the meeting by incrementing by 30
            const meetingEndTime: Time = {hours: meetingTime.hours, minutes: meetingTime.minutes};
            if(meetingEndTime.minutes === 30){
              meetingEndTime.minutes = 0;
              meetingEndTime.hours++;
              
            }else{
              meetingEndTime.minutes = 30;
            }

            // Check if the user already has a meeting scheduled for this time
            // If not, then add the time to the availableTimes array
            const meetingAsTimestamp: Timestamp = createTimestamp(selectedDate, meetingTime);
            if(!isExistingStartTime(meetingAsTimestamp, userMeetings)){
              const meetingPeriod: TimePeriod = {startTime: meetingTime, endTime: meetingEndTime};
              availableTimes.push(meetingPeriod);
            }

            // Increment the meetingTime to the next 30 minute interval
            meetingTime.hours = meetingEndTime.hours;
            meetingTime.minutes = meetingEndTime.minutes;
          }
        }
        setTimes(availableTimes)
        setDate(selectedDate);
      }
    }
  }

  // Create a meeting event based on the selected date and time
  function makeMeetingEvent(event : React.MouseEvent<HTMLButtonElement>){
    console.log(event);
    console.log(date);
  }

  return (
    <div>
      <BookingCalendar selectedDate={date} setDate={populateTimeListings}/>
      <TimeSelectionList timesList={times} selectedDate={date} setTime={setSelectedTime}/>
      <button onClick={makeMeetingEvent}>Submit</button>
    </div>
  )
}