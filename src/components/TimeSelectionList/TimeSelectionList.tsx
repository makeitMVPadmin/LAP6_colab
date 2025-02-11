import { TimePeriod } from "@/types/types";
import React, { useEffect, useState } from "react";

interface TimeSelectionListProps {
    timesList: TimePeriod[];
    selectedDate: Date;
    setTime: (date: TimePeriod | undefined) => void;
}

const TimeSelectionList: React.FC<TimeSelectionListProps> = ({timesList, selectedDate, setTime}) => {
    const [activeRow, setActiveRow] = useState<number | null>(null);

    // Reset activeRow when selectedDate changes
    useEffect(() => {
        setActiveRow(null);
    }, [selectedDate]);

    // Function to create a string that displays the start and end time of a meeting TimePeriod
    function createMeetingDisplayString(time: TimePeriod): string{
        let displayString = "";
        displayString += time.startTime.hours + ":";
        if(time.startTime.minutes < 10){
            displayString += "0";
        }
        displayString += time.startTime.minutes + " - " + time.endTime.hours + ":";
        if(time.endTime.minutes < 10){
            displayString += "0";
        }
        displayString += time.endTime.minutes;
        return displayString;
    }

    // Function to set the selected time and active row. If the active row is clicked again, it unselects it.
    function setSelectedTime(index: number, time: TimePeriod){
        if(index === activeRow){
            setActiveRow(null);
            setTime(undefined);
        }else{
            setActiveRow(index);
            setTime(time);
        } 
    }

    return (
        <div className="p-5 max-h-[500px] bg-white border-2 border-black rounded-lg w-64 my-4">
            <div className="sticky top-0 bg-white z-10 p-2 border-b border-gray-600">
                <span className="font-bold">{selectedDate.toDateString()}</span>
            </div>
            {timesList.length === 0 ? (
                <div>No Availability for this Date</div>
            ) : (
                <div className="overflow-auto scrollbar-hide max-h-[150px]">
                    {timesList.map((time: TimePeriod, index: number) => (
                        <div 
                            key={index} 
                            className={`flex items-center mb-2 border-b border-gray-600 pb-2 cursor-pointer
                            ${activeRow === index ? "bg-black text-white" : "hover:bg-gray-200"}`}
                            onClick={() => setSelectedTime(index, time)}
                        >
                            <span className="text-lg">{createMeetingDisplayString(time)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimeSelectionList;
