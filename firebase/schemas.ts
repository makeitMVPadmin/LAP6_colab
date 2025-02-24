import { z } from "zod"

const TimeSchema = z.object({
  hours: z.number().int().min(0).max(23),
  minutes: z.number().int().min(0).max(59),
})

const TimePeriodSchema = z.object({
  startTime: TimeSchema,
  endTime: TimeSchema,
})

const TimestampSchema = z.object({
  seconds: z.number().int(),
  nanoseconds: z.number().int()
})

export const AvailabilitiesSchema = z.object({
  day: z.enum([
    'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
  ]),
  timePeriods: z.array(TimePeriodSchema)
})

export const GoalBuddySchema = z.object({
  availabilities: z.array(AvailabilitiesSchema).optional(),
  bio: z.string().optional(),
  createdAt: TimestampSchema.optional(),
  googleCalendarId: z.string().optional(),
  isAccountabilityPartner: z.boolean().optional(),
  isMentor: z.boolean().optional(),
  isNetworking: z.boolean().optional(),
  skills: z.array(z.string()).optional(),
  timezone: z.string().optional(),
  updatedAt: TimestampSchema.optional(),
  userId: z.string().optional(),
  yearsOfExperience: z.string().optional(),
})
