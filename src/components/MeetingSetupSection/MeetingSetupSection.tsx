import React, { useState, useEffect } from 'react'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import TimeSelectionList from '../TimeSelectionList/TimeSelectionList'
import { CalendarEvents, AllGoalBuddyData, Availabilities, TimePeriod, Time, EventData } from '@/types/types'
import { getUserEvents } from '../../../firebase/functions/calendarEventsByUserId'
import { createCalendarEvent } from '../../../firebase/functions/createCalendarEvent'
import { Timestamp } from 'firebase/firestore'
import { dayAsString, findAvailabilityForDay, createTimestamp, isExistingStartTime, formatTimeString } from '../../utils/dateHelpers'
import { Button } from '../ui/button'
// import ConfirmationIcon from "../ConfirmationIcon/ConfirmationIcon";

interface MeetingSetupSectionProps {
  activeUserId: string
  showingUser: AllGoalBuddyData
}

const MeetingSetupSection: React.FC<MeetingSetupSectionProps> = ({
  activeUserId, showingUser
}) => {

  // Define state variables needed for creating a meeting event
  const [availability, setAvailability] = useState<Availabilities[]>([]);
  const [userMeetings, setUserMeetings] = useState<CalendarEvents[] | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateError, setDateError] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<TimePeriod[]>([]);
  const [selectedTime, setSelectedTime] = useState<TimePeriod | undefined>(undefined);
  const [confirmationState, setConfirmationState] = useState<boolean>(false);
  const [backendError, setBackendError] = useState<string>("");

  // Fetch the user's current meetings so they can be used to help determine availability
  useEffect(() => {
    const fetchUserMeetings = async (userId: string) => {
      // Limit the user's meetings to only those that occur on or after the current date
      try {
        const currentDate: Timestamp = Timestamp.now()
        const data = await getUserEvents(userId, currentDate);

        // If the user has no meetings, set the userMeetings state to an empty array
        if (data.length === 0) {
          setUserMeetings([]);

          // Otherwise, set the userMeetings state to the data returned from the getUserEvents function
        } else {
          setUserMeetings(data as CalendarEvents[]);
        }
      } catch (error) {
        console.error(`Error in fetching meetings with user ID ${userId}:`, error);
        setBackendError("An error occured while trying to get this user's meeting schedule. Please close and try again.");
      }
    }

    setAvailability(showingUser.availabilities);
    fetchUserMeetings(showingUser.userId);
  }, [confirmationState])

  // Using the selected date and the user's availability, create a list of times that can be selected for meetings on that day
  function populateTimeListings(selectedDate: Date | undefined) {
    const currentDate: Date = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // If there is no date selected then there should be no time listings
    if (selectedDate === undefined) {
      setAvailableTimes([]);
      setSelectedTime(undefined);
      setDate(undefined);
      setDateError("");

    //Check that the user hasn't chosen a date in the past
    }else if(selectedDate < currentDate){
      setAvailableTimes([]);
      setSelectedTime(undefined);
      setDate(undefined);
      setDateError("Cannot make a meeting for a date in the past");

    //Otherwise, we will look at the user's availability and their current meetings for that date and make a list of available times in 30 minute intervals
    } else {
      const availableTimes: TimePeriod[] = [];

      const selectedDay: string = dayAsString(selectedDate.getDay());
      const dailyAvailability: Availabilities | undefined = findAvailabilityForDay(selectedDay, availability);

      // If the user has no availability for the selected day, set the times state to an empty array as no times will be available
      if (
        dailyAvailability === undefined ||
        dailyAvailability.timePeriods.length === 0
      ) {

        setAvailableTimes([]);
        setSelectedTime(undefined);
        setDate(selectedDate);
        setDateError("");

      // Otherwise, we will create a list of available times for the selected day
      } else {
        const meetingTimes: TimePeriod[] = dailyAvailability.timePeriods;

        // Go throuh each of the user's availability time periods for this day and add each 30 minute interval to the availableTimes array
        for (let i:number  = 0; i < meetingTimes.length; i++) {
          let meetingStartTime: Time = meetingTimes[i].startTime
          let endTime: Time = meetingTimes[i].endTime

          // Add each available 30 minute interval in this TimePeriod to the availableTimes array
          while (
            !(
              meetingStartTime.hours === endTime.hours &&
              meetingStartTime.minutes === endTime.minutes
            )
          ) {
            // Create a Time object for the end of the meeting by incrementing by 30
            let meetingEndTime: Time = {
              hours: meetingStartTime.hours,
              minutes: meetingStartTime.minutes,
            };
            if (meetingEndTime.minutes === 30) {
              meetingEndTime.minutes = 0;
              meetingEndTime.hours++;

            } else {
              meetingEndTime.minutes = 30;

            }

            // Check if the user already has a meeting scheduled for this time
            // If not, then add the time to the availableTimes array
            const meetingAsTimestamp: Timestamp = createTimestamp(
              selectedDate,
              meetingStartTime,
            );
            if (!isExistingStartTime(meetingAsTimestamp, userMeetings)) {
              const meetingPeriod: TimePeriod = {
                startTime: meetingStartTime,
                endTime: meetingEndTime,
              };
              availableTimes.push(meetingPeriod);

            }
            // Set the next start time to be 30 minutes later (aka the meetingEndTime)
            meetingStartTime = meetingEndTime;
          }
        }

        // Sort the availableTimes array in chronological order
        availableTimes.sort((a, b) => {
          const aStartTime = new Date(selectedDate);
          aStartTime.setHours(a.startTime.hours, a.startTime.minutes, 0, 0);
          const bStartTime = new Date(selectedDate);
          bStartTime.setHours(b.startTime.hours, b.startTime.minutes, 0, 0);
          return aStartTime.getTime() - bStartTime.getTime();
        });

        setAvailableTimes(availableTimes);
        setSelectedTime(undefined);
        setDate(selectedDate);
        setDateError("");
        setBackendError("");
      }
    }
  }

  // Create a meeting event based on the selected date and time
  async function makeMeetingEvent() {
    // If the user has selected a date and time, then create a meeting event
    if (date && selectedTime) {
      // Create the data package to be sent with the firebase function to create a calendar event in the collection
      const eventData: EventData = {
        createdUserId: activeUserId,
        eventDescription: 'Meeting between two goal buddies (default text)',
        eventStartTime: createTimestamp(date, selectedTime.startTime).toDate(),
        eventEndTime: createTimestamp(date, selectedTime.endTime).toDate(),
        eventTitle: 'Goal Buddy Meeting',
        invitedUserId: showingUser.userId,
        eventStatus: 'confirmed',
        googleEventId: 'google-event-id-123', // Currently default - Replace with actual Google Event ID if enabled and available
      }

      // Call the createCalendarEvent function to create the event in the collection
      try {
        await createCalendarEvent(eventData)
        setConfirmationState(true);

      } catch (error) {
        console.error('Error creating calendar event:', error)
        setBackendError("An error occured while trying to book this meeting. Please close and try again.");
      }
    }
  }

  // Function to reset the meeting inputs
  function resetState(){
    setDate(undefined);
    setAvailableTimes([]);
    setSelectedTime(undefined);
    setDateError("");
    setConfirmationState(false);
  }

  // Function to write confirmation messages with a formatted date and time.
  function makeConfirmationMessage(forDate: boolean): string {
    if (!date || !selectedTime) return "";

    if(forDate){
      const day = dayAsString(date.getDay());
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      });

      return `${day}, ${formattedDate}`;

    }else{
      const startTime = formatTimeString(selectedTime.startTime);
      const endTime = formatTimeString(selectedTime.endTime);

      return `at ${startTime} - ${endTime}`
    }
  }
  

  return (
    <div className="flex flex-col w-full h-full">
      {confirmationState ? (
        <div className="flex flex-col items-center justify-between p-4 h-full w-full">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="bg-[#ECFDF2] w-full h-[75%] flex flex-col items-center justify-between p-4 rounded">
                <div className="bg-[#ECFDF2] w-full h-full flex flex-col items-center justify-center my-1">
                    {/* <ConfirmationIcon /> */}
                    <h3 className="text-[#00892d] text-base font-medium font-montserrat leading-none py-4">
                      {`Meeting has been scheduled`}
                    </h3>
                    <p className="text-[#00892d] text-sm font-normal font-montserrat leading-tight text-center">    
                      {makeConfirmationMessage(true)}
                    </p>
                    <p className="text-[#00892d] text-sm font-normal font-montserrat leading-tight text-center">    
                      {makeConfirmationMessage(false)}
                    </p>
                </div>
            </div>
          </div>
          <Button
            onClick={resetState}
            variant="secondary"
            className={`bg-[#ffd22f] text-black hover:bg-black hover:text-white active:bg-black active:text-white`}
          >
            {`Book Another Session`}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
        {backendError ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full h-[60%] flex flex-col items-center justify-center bg-red-100 rounded">
              <h3 className="text-red-700 text-center text-lg my-2">{`${backendError}`}</h3>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between p-3 h-full w-full">
            <div className="flex flex-col items-center justify-start flex-grow max-h-[90%] w-full overflow-auto scrollbar-hide">
              <h2 className="font-bold text-center text-xl mb-3">{`Book a Meeting`}</h2>
              {date &&
                <h3 className="font-bold text-sm mb-1">{date.toDateString()}</h3>
              }
              {dateError &&
                <h3 className="font-bold text-sm mb-1 text-red-500">{dateError}</h3>
              }
              <BookingCalendar selectedDate={date} setDate={populateTimeListings} />
              {date &&
                <div className="flex flex-col items-center justify-start flex-grow w-full px-3">
                  <h3 className="text-[#0c0c0c] text-sm text-center font-semibold font-montserrat leading-[14.80px]">{`Time Zone: Eastern Standard Time`}</h3>

                  <TimeSelectionList
                    timesList={availableTimes}
                    selectedDate={date}
                    setTime={setSelectedTime}
                  />
                </div>
              }
            </div>
            <Button
              onClick={makeMeetingEvent}
              disabled={date === undefined || selectedTime === undefined}
              variant="secondary"
              className={`my-1 
                ${date === undefined || selectedTime === undefined ? 'bg-gray-400 text-white' : 'bg-[#ffd22f] text-black hover:bg-black hover:text-white active:bg-black active:text-white'}`}
            >
              {`Confirm`}
            </Button>
          </div>
        )}
      </div>
    )}
  </div>
  )
}

export default MeetingSetupSection
