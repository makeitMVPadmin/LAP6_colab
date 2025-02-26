import React from 'react';
import { Select, SelectContent,SelectItem,SelectTrigger, SelectValue} from "../../components/ui/select";
import { DayOfWeek } from '@/types/types';

interface DaySelectionProps {
    setSelectedDay: (day: DayOfWeek) => void;
    isError: string;
}

const DaySelection: React.FC<DaySelectionProps> = ({setSelectedDay, isError}) => {

    const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="w-full mt-4 flex flex-col justify-center items-center">
            <Select onValueChange={(value: DayOfWeek) => setSelectedDay(value)}>
                <SelectTrigger className={`h-[49.68px] px-[16.26px] py-[10.84px] bg-white rounded-lg border-l border-r-2 border-t border-b-2 border-[#28363f] justify-between items-center inline-flex" ${isError ? "border-[#e53935]": ""}`}>
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
                <p className="text-[#f44336] text-sm font-semibold font-['Montserrat'] leading-tight bg-red-100 rounded pl-1 w-full">{isError}</p>
            }
        </div>
    );
};

export default DaySelection;