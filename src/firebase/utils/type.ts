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
    id: string
  }