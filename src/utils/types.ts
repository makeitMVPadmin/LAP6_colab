type Timestamp = { seconds: number; nanoseconds: number }
export interface BaseEvents {
  createdAt: Timestamp
  createdUserId: string
  invitedUserId: string
  eventDescription: string
  eventEndTime: Timestamp
  eventStartTime: Timestamp
  eventTitle: string
  eventStatus: string
  googleEventId: string
}
export interface CalendarEvents extends BaseEvents {
  id: string
}
