import React from 'react';
import { Select, SelectContent,SelectItem,SelectTrigger, SelectValue} from "../../components/ui/select";

interface DaySelectionProps {
    setSelectedDay: (day: string) => void;
}

const DaySelection: React.FC<DaySelectionProps> = ({setSelectedDay}) => {

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <Select onValueChange={(value) => setSelectedDay(value)}>
            <SelectTrigger>
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
    );
};

export default DaySelection;