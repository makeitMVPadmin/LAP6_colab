
export interface baseEvents {
  createdAt: { seconds: Number; nanoseconds: Number }
  createdUserId: string
  invitedUserId: string
  eventDescription: string
  eventEndTime: { seconds: Number; nanoseconds: Number }
  eventStartTime: { seconds: Number; nanoseconds: Number }
  eventTitle: string
  eventStatus: string
  googleEventId: string
}
export interface calendarEvents extends baseEvents {
  id:string
}

type Timestamp = {
  seconds: number
  nanoseconds: number
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
