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
