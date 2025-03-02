import React, { useState, useEffect } from 'react'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import TimeSelectionList from '../TimeSelectionList/TimeSelectionList'
import { CalendarEvents, AllGoalBuddyData, Availabilities, TimePeriod, Time, EventData } from '@/types/types'
import { getUserEvents } from '../../../firebase/functions/calendarEventsByUserId'
import { createCalendarEvent } from '../../../firebase/functions/createCalendarEvent'
import { Timestamp } from 'firebase/firestore'
import { dayAsString, findAvailabilityForDay, createTimestamp, isExistingStartTime, formatTimeString } from '../../utils/dateHelpers'
import { Button } from '../ui/button'
import ConfirmationIcon from "../ConfirmationIcon/ConfirmationIcon";

interface MeetingSetupSectionProps {
  activeUserId: string
  showingUser: AllGoalBuddyData
}

const MeetingSetupSection: React.FC<MeetingSetupSectionProps> = ({
  activeUserId, showingUser
}) => {
  const [availability, setAvailability] = useState<Availabilities[]>([]);
  const [userMeetings, setUserMeetings] = useState<CalendarEvents[] | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [availableTimes, setAvailableTimes] = useState<TimePeriod[]>([]);
  const [selectedTime, setSelectedTime] = useState<TimePeriod | undefined>(undefined);
  const [confirmationState, setConfirmationState] = useState<boolean>(false);
  const [backendError, setBackendError] = useState<string>("");

  useEffect(() => {
    const fetchUserMeetings = async (userId: string) => {
      try {
        const currentDate: Timestamp = Timestamp.now()
        const data = await getUserEvents(userId, currentDate);

        if (data.length === 0) {
          setUserMeetings([]);
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

  function populateTimeListings(selectedDate: Date | undefined) {
    const currentDate: Date = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate === undefined) {
      setAvailableTimes([]);
      setSelectedTime(undefined);
      setDate(undefined);
    }else if(selectedDate < currentDate){
      setAvailableTimes([]);
      setSelectedTime(undefined);
      setDate(undefined);
    } else {
      const availableTimes: TimePeriod[] = [];

      const selectedDay: string = dayAsString(selectedDate.getDay());
      const dailyAvailability: Availabilities | undefined = findAvailabilityForDay(selectedDay, availability);

      if (
        dailyAvailability === undefined ||
        dailyAvailability.timePeriods.length === 0
      ) {

        setAvailableTimes([]);
        setSelectedTime(undefined);
        setDate(selectedDate);
      } else {
        const meetingTimes: TimePeriod[] = dailyAvailability.timePeriods;

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
        setBackendError("");
      }
    }
  }

  async function makeMeetingEvent() {
    if (date && selectedTime) {
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

      try {
        await createCalendarEvent(eventData)
        setConfirmationState(true);

      } catch (error) {
        console.error('Error creating calendar event:', error)
        setBackendError("An error occured while trying to book this meeting. Please close and try again.");
      }
    }
  }

  function resetState(){
    setDate(undefined);
    setAvailableTimes([]);
    setSelectedTime(undefined);
    setConfirmationState(false);
  }

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
    <div className="flex flex-col w-full h-fit md:h-full flex-grow md:flex-grow-0 bg-blue">
      {confirmationState ? (
        <div className="flex flex-col items-center justify-between pt-7 pb-4 px-12 md:px-8 md:py-4 h-[472px] md:h-full w-full">
          <div className="flex flex-col items-center justify-start md:justify-center h-full w-full">
            <div className="bg-[#ECFDF2] w-full h-[340px] md:h-[66%] flex flex-col items-center justify-between p-4 rounded">
                <div className="bg-[#ECFDF2] w-full h-full flex flex-col items-center justify-center my-1">
                    <ConfirmationIcon />
                    <h3 className="text-[#00892d] text-base font-medium font-montserrat leading-none py-4 text-center my-2">
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
            variant="colabPrimary"
            size="colabPrimary"
            className={`mb-2 md:mb-0 tracking-wide md:whitespace-normal md:min-h-12 md:h-fit md:py-1 lg:min-w-[195px]`}
          >
            {`Book Another Session`}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full flex-grow md:flex-grow-0">
        {backendError ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="w-full h-[60%] flex flex-col items-center justify-center bg-red-100 rounded">
              <h3 className="text-red-700 text-center text-lg my-2">{`${backendError}`}</h3>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between py-4 px-12 md:py-3 md:px-8 h-full w-full flex-grow md:flex-grow-0">
            <div className="flex flex-col items-center justify-start flex-grow max-h-[90%] w-full">
              <h2 className="font-semibold font-fraunces tracking-wide text-center text-2xl mb-1">{`Book a Meeting`}</h2>
              {date ? (
                <h3 className="font-medium font-montserrat text-base md:text-sm mb-1">{date.toDateString()}</h3>
              ) : (
                <h3 className="font-medium font-montserrat text-base md:text-sm mb-1">{`Select a date`}</h3>
                // Monday, 7th Nov 2023
              )}
              <BookingCalendar selectedDate={date} setDate={populateTimeListings} />
              {date &&
                <div className="flex flex-col items-center justify-start flex-grow w-full px-3 md:px-0 my-6 md:my-3">
                  <h3 className="text-[#0c0c0c] text-sm text-center font-semibold font-montserrat leading-[14.80px] my-1">{`Time Zone: Eastern Standard Time`}</h3>

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
              variant="colabPrimary"
              size="colabPrimary"
              className="my-10 md:my-2"
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
