
type Timestamp = { seconds: number; nanoseconds: number }

//import { Timestamp } from "firebase/firestore"

export interface BaseEvents {
  createdAt: Timestamp
  createdUserId: string
  invitedUserId: string
  eventDescription: string
  eventEndTime:Timestamp
  eventStartTime: Timestamp
  eventTitle: string
  eventStatus: 'pending' | 'completed' | 'canceled'

  googleEventId: string
}
export interface CalendarEvents extends BaseEvents {
  id:string
}


export interface BaseGoalBuddy {
  availabilities: []
  bio: string
  createdAt: Timestamp
  googleCalendarId: string
  isAccountabilityPartner: boolean
  isMentor: boolean
  isNetworking: boolean
  skills: []
  timezone: string
  updatedAt: Timestamp
  userId: string
  yearsOfExperience: string
}

export interface GoalBuddy extends BaseGoalBuddy {

  id: string
}

export interface BaseUser {
  city: string,
  country: string,
  createdAt: Timestamp,
  discipline: string,
  email: string,
  firstName: string,
  interests: [],
  lastName: string,
  profilePhoto: string,
  roleId: string,
  state: string,
  updatedAt: Timestamp,
  username: string
}

export interface User extends BaseUser {
  id: string
}
