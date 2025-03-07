// Date Helpers Functions

import { Availabilities, CalendarEvents, Time } from "@/types/types";
import { Timestamp } from "firebase/firestore";

// Function to convert the day number returned from Date's .getDay() to a string
// author: Katrina
export function dayAsString(day: number): string {
    switch (day) {
    case 0:
        return 'Sunday';
    case 1:
        return 'Monday';
    case 2:
        return 'Tuesday';
    case 3:
        return 'Wednesday';
    case 4:
        return 'Thursday';
    case 5:
        return 'Friday';
    case 6:
        return 'Saturday';
    default:
        return '';
    }
}

// Function return the availability for a specific day from the list of availabilities
// author: Katrina
export function findAvailabilityForDay(day: string, availabilities: Availabilities[]): Availabilities | undefined {
    return availabilities.find((availability) => availability.day === day);
}

// Function to create a Timestamp object from a Date object and a Time object
// author: Katrina
export function createTimestamp(date: Date, time: {hours: number, minutes: number}): Timestamp {
    const constructed: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes);
    return Timestamp.fromDate(constructed);
}

// Function to check if a Timestamp is an existing start time of a meeting
// author: Katrina
export function isExistingStartTime(timestamp: Timestamp, meetings: CalendarEvents[] | undefined): boolean {
    if (!meetings) return false;
    return meetings.some((meeting) => meeting.eventStartTime.seconds === timestamp.seconds);
}

// Function to update the availability for a specific day
// author: Katrina
export function updateAvailabilityForDay(newAvailability: Availabilities, availabilities: Availabilities[]): Availabilities[] {
    const updatedAvailabilities = availabilities.map((availability) => {
        if (availability.day === newAvailability.day) {
            return newAvailability;
        }
        return availability;
    });
    return updatedAvailabilities;
}

// Function to convert a time string "hh:mm" to a Time object
// author: Katrina
export function createTimeFromStrings(timeString: string): Time{
    const [hours, minutes] = timeString.split(':').map(Number);
    return {hours: hours, minutes: minutes};
}

// Function to format the Time object as a string "hh:mm"
// author: Katrina
export function formatTimeString(time: {hours: number, minutes: number}): string {
    const hours = time.hours.toString().padStart(2, '0');
    const minutes = time.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};