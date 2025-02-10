import React, { useState, useEffect } from "react";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import TimeSelectionList from "../TimeSelectionList/TimeSelectionList";
import { CalendarEvents, GoalBuddy, Availabilities, TimePeriod, Time } from "@/types/types";
import {getUserEvents} from "../../../firebase/functions/calendarEventsbyUserId";
import { Timestamp } from "firebase/firestore";
import {dayAsString, findAvailabilityForDay, createTimestamp, isExistingStartTime} from "../../utils/dateHelpers";

interface MeetingSetupSectionProps {
  goalBuddy: GoalBuddy;
}

const MeetingSetupSection: React.FC<MeetingSetupSectionProps> = ({goalBuddy}) => {

  // Define state variables needed for creating a meeting event
  const[availability, setAvailability] = useState<Availabilities[]>(goalBuddy.availabilities);
  const[userMeetings, setUserMeetings] = useState<CalendarEvents[] | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [times, setTimes] = useState<TimePeriod[]>([]);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);

  // console.log("See user data: ")
  // console.log(goalBuddy);
  // console.log("See user availability: ")
  // console.log(availability);

  // Fetch the user's current meetings so they can be used to help determine availability
  useEffect(() => {
    const fetchUserMeetings = async (userId: string) => {
      // Limit the user's meetings to only those that occur on or after the current date
      const currentDate : Timestamp = Timestamp.now();
      const data = await getUserEvents(userId, currentDate);
      // console.log("Fetch user meetings: ")
      // console.log(data);
      
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
    console.log("User selected date:" + selectedDate);

    // If there is no date selected then there should be no time listings
    if (selectedDate === undefined){
      // console.log("No date selected or something went wrong as it was undefined");
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
        setDate(selectedDate);

      // Otherwise, we will create a list of available times for the selected day
      }else{
        const meetingTimes: TimePeriod[] = dailyAvailability.timePeriod;
        
        // Go throuh each of the user's availability time periods for this day and add each 30 minute interval to the availableTimes array
        for(let i = 0; i < meetingTimes.length; i++){
          let meetingStartTime: Time = meetingTimes[i].startTime;
          let endTime: Time = meetingTimes[i].endTime;
          
          // Add each available 30 minute interval in this TimePeriod to the availableTimes array
          while(!(meetingStartTime.hours === endTime.hours && meetingStartTime.minutes === endTime.minutes)){

            // Create a Time object for the end of the meeting by incrementing by 30
            let meetingEndTime: Time = {hours: meetingStartTime.hours, minutes: meetingStartTime.minutes};
            if(meetingEndTime.minutes === 30){
              meetingEndTime.minutes = 0;
              meetingEndTime.hours++;
              
            }else{
              meetingEndTime.minutes = 30;
            }

            // Check if the user already has a meeting scheduled for this time
            // If not, then add the time to the availableTimes array
            const meetingAsTimestamp: Timestamp = createTimestamp(selectedDate, meetingStartTime);
            // console.log("possible meeting's timestamp: " + meetingAsTimestamp.seconds + " seconds, " + meetingAsTimestamp.nanoseconds + " nanoseconds");

            if(!isExistingStartTime(meetingAsTimestamp, userMeetings)){
              // console.log("meeting start time");
              // console.log(meetingStartTime);
              // console.log("meeting end time");
              // console.log(meetingEndTime);
              const meetingPeriod: TimePeriod = {startTime: meetingStartTime, endTime: meetingEndTime};
              // meetingPeriod.startTime.hours = meetingStartTime.hours;
              // meetingPeriod.startTime.minutes = meetingStartTime.minutes;
              availableTimes.push(meetingPeriod);
              // console.log("Added time: ")
              // console.log(meetingPeriod);
            }

            // Increment the meetingTime to the next 30 minute interval
            meetingStartTime = meetingEndTime;
          }
        }

        // console.log("Available times: ")
        // console.log(availableTimes);
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

export default MeetingSetupSection;