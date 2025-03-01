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
        <div className="w-full mt-3 md:mt-4 flex flex-col justify-center items-center">
            <Select onValueChange={(value: DayOfWeek) => setSelectedDay(value)}>
                <SelectTrigger className={`h-[49.68px] px-[16.26px] py-[10.84px] bg-white rounded-lg border-l border-r-2 border-t border-b-2 border-[#28363f] justify-between items-center inline-flex" ${isError ? "border-[#b71c1c]": ""}`}>
                    <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                    {daysOfWeek.map(day => (
                        <SelectItem key={day} value={day} >
                            {day}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isError && 
                <div className="flex justify-center items-center w-full">
                  <div className="w-fit h-[29.56px] px-[9.85px] py-[6.57px] bg-white rounded-[5px] border-l border-r-2 border-t border-b-2 border-[#28363f] inline-flex">
                      <p className="text-[#b71c1c] text-xs font-medium font-montserrat leading-none text-center w-auto">{isError}</p>
                  </div> 
              </div>
            }
        </div>
    );
};

export default DaySelection
