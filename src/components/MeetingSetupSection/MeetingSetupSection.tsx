import React, { useState, useEffect } from 'react'
import BookingCalendar from '../BookingCalendar/BookingCalendar'
import TimeSelectionList from '../TimeSelectionList/TimeSelectionList'
import {
  CalendarEvents,
  GoalBuddy,
  Availabilities,
  TimePeriod,
  Time,
} from '@/types/types'
import { getUserEvents } from '../../../firebase/functions/calendarEventsbyUserId'
import {
  createCalendarEvent,
  EventData,
} from '../../../firebase/functions/createCalendarEvent'
import { Timestamp } from 'firebase/firestore'
import {
  dayAsString,
  findAvailabilityForDay,
  createTimestamp,
  isExistingStartTime,
} from '../../utils/dateHelpers'

interface MeetingSetupSectionProps {
  activeUserId: string
  showingUser: GoalBuddy
}

const MeetingSetupSection: React.FC<MeetingSetupSectionProps> = ({
  activeUserId,
  showingUser,
}) => {
  // Define state variables needed for creating a meeting event
  const [availability, setAvailability] = useState<Availabilities[]>([])
  const [userMeetings, setUserMeetings] = useState<
    CalendarEvents[] | undefined
  >(undefined)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [availableTimes, setAvailableTimes] = useState<TimePeriod[]>([])
  const [selectedTime, setSelectedTime] = useState<TimePeriod | undefined>(
    undefined,
  )

  // Fetch the user's current meetings so they can be used to help determine availability
  useEffect(() => {
    const fetchUserMeetings = async (userId: string) => {
      // Limit the user's meetings to only those that occur on or after the current date
      try {
        const currentDate: Timestamp = Timestamp.now()
        const data = await getUserEvents(userId, currentDate)

        // If the user has no meetings, set the userMeetings state to an empty array
        if (data.length === 0) {
          setUserMeetings([])

          // Otherwise, set the userMeetings state to the data returned from the getUserEvents function
        } else {
          setUserMeetings(data as CalendarEvents[])
        }
      } catch (error) {
        console.error(
          `Error in fetching meetings with user ID ${userId}:`,
          error,
        )
      }
    }

    setAvailability(showingUser.availabilities)
    fetchUserMeetings(showingUser.userId)
  }, [])

  // Using the selected date and the user's availability, create a list of times that can be selected for meetings on that day
  function populateTimeListings(selectedDate: Date | undefined) {
    // If there is no date selected then there should be no time listings
    if (selectedDate === undefined) {
      setAvailableTimes([])
      setSelectedTime(undefined)
      setDate(undefined)

      //Otherwise, we will look at the user's availability and their current meetings for that date and make a list of available times in 30 minute intervals
    } else {
      const availableTimes: TimePeriod[] = []

      const selectedDay: string = dayAsString(selectedDate.getDay())
      const dailyAvailability: Availabilities | undefined =
        findAvailabilityForDay(selectedDay, availability)

      // If the user has no availability for the selected day, set the times state to an empty array as no times will be available
      if (
        dailyAvailability === undefined ||
        dailyAvailability.timePeriod.length === 0
      ) {
        setAvailableTimes([])
        setSelectedTime(undefined)
        setDate(selectedDate)

        // Otherwise, we will create a list of available times for the selected day
      } else {
        const meetingTimes: TimePeriod[] = dailyAvailability.timePeriod

        // Go throuh each of the user's availability time periods for this day and add each 30 minute interval to the availableTimes array
        for (let i = 0; i < meetingTimes.length; i++) {
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
            }
            if (meetingEndTime.minutes === 30) {
              meetingEndTime.minutes = 0
              meetingEndTime.hours++
            } else {
              meetingEndTime.minutes = 30
            }

            // Check if the user already has a meeting scheduled for this time
            // If not, then add the time to the availableTimes array
            const meetingAsTimestamp: Timestamp = createTimestamp(
              selectedDate,
              meetingStartTime,
            )
            if (!isExistingStartTime(meetingAsTimestamp, userMeetings)) {
              const meetingPeriod: TimePeriod = {
                startTime: meetingStartTime,
                endTime: meetingEndTime,
              }
              availableTimes.push(meetingPeriod)
            }

            // Set the next start time to be 30 minutes later (aka the meetingEndTime)
            meetingStartTime = meetingEndTime
          }
        }
        setAvailableTimes(availableTimes)
        setSelectedTime(undefined)
        setDate(selectedDate)
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
        const response = await createCalendarEvent(eventData)
      } catch (error) {
        console.error('Error creating calendar event:', error)
      }
    }
  }

  return (
    <div className="border-2 border-black rounded-lg w-80 flex flex-col items-center p-5">
      <BookingCalendar selectedDate={date} setDate={populateTimeListings} />
      {date === undefined ? (
        <div>No date selected atm</div>
      ) : (
        <TimeSelectionList
          timesList={availableTimes}
          selectedDate={date}
          setTime={setSelectedTime}
        />
      )}
      <button
        onClick={makeMeetingEvent}
        disabled={date === undefined || selectedTime === undefined}
        className={`px-4 py-2 rounded border border-black my-4
          ${date === undefined || selectedTime === undefined ? 'bg-gray-400 text-white' : 'bg-white text-black hover:bg-black hover:text-white active:bg-black active:text-white'}`}
      >
        Confirm
      </button>
    </div>
  )
}

export default MeetingSetupSection
