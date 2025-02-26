import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { DayOfWeek } from '@/types/types'

interface DaySelectionProps {
  setSelectedDay: (day: DayOfWeek) => void
  isError: string
}

const DaySelection: React.FC<DaySelectionProps> = ({
  setSelectedDay,
  isError,
}) => {
  const daysOfWeek: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  return (
    <div className="w-[100%]">
      <Select onValueChange={(value: DayOfWeek) => setSelectedDay(value)}>
        <SelectTrigger
          className={`bg-white ${isError ? 'border-[#e53935]' : ''}`}
        >
          <SelectValue
            className="font-montserrat text-[16px] peer-placeholder-shown:font-semibold peer-placeholder-shown:text-gray-400"
            placeholder="Select a day"
          />
        </SelectTrigger>
        <SelectContent>
          {daysOfWeek.map((day) => (
            <SelectItem key={day} value={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isError && (
        <p className="text-xs text-[#e53935] bg-red-100 rounded pl-1">
          {isError}
        </p>
      )}
    </div>
  )
}

export default DaySelection
