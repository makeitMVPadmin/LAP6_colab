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
        <div className="w-[100%]">
            <Select onValueChange={(value: DayOfWeek) => setSelectedDay(value)}>
                <SelectTrigger className={`bg-white ${isError ? "border-red-500": ""}`}>
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
                <p className='text-red-500'>{isError}</p>
            }
        </div>
    );
};

export default DaySelection;