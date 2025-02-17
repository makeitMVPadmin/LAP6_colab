type Timestamp = { seconds: number; nanoseconds: number }

export type TimePeriod = {
  startTime: Time,
  endTime: Time
}

export type Time = {
  hours: number,
  minutes: number
}

// Define a type for the days of the week
export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type Availabilities = {
  day: DayOfWeek,
  timePeriod: TimePeriod[]
}

//import { Timestamp } from "firebase/firestore"

export interface BaseEvents {
  createdAt: Timestamp
  updatedAt: Timestamp
  createdUserId: string
  invitedUserId: string
  eventDescription: string
  eventEndTime: Timestamp
  eventStartTime: Timestamp
  eventTitle: string
  eventStatus: 'confirmed' | 'pending' | 'canceled'
  googleEventId: string
}
export interface CalendarEvents extends BaseEvents {
  id: string
}

export interface BaseGoalBuddy {
  availabilities: Availabilities[]
  bio: string
  createdAt: Timestamp
  googleCalendarId: string
  isAccountabilityPartner: boolean
  isMentor: boolean
  isNetworking: boolean
  skills: string[]
  timezone: string
  updatedAt: Timestamp
  userId: string
  yearsOfExperience: string
}

export interface GoalBuddy extends BaseGoalBuddy {
  id: string
}

export type BaseUser = {
  city: string
  country: string
  createdAt: Timestamp
  discipline: string
  email: string
  firstName: string
  interests: string[]
  lastName: string
  profilePhoto: string
  roleId: string
  state: string
  updatedAt: Timestamp
  username: string
}

export interface User extends BaseUser {
  id: string
}

export interface AllGoalBuddyData
  extends Omit<GoalBuddy, 'createdAt' | 'updatedAt'>,
    Omit<User, 'createdAt' | 'updatedAt'> {
  createdAt: {
    goalBuddy: Timestamp
    user: Timestamp
  }
  updatedAt: {
    goalBuddy: Timestamp
    user: Timestamp
  }
}
