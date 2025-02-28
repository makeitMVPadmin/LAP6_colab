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
        <div className="flex flex-col justify-start w-full p-1 bg-white border border-1 border-black border-r-2 border-b-2 rounded-lg my-1 max-h-[9rem]">
            <div className="sticky top-0 bg-white z-10 p-2 pb-0">
                <p className="text-slate-950 text-base font-semibold leading-[17.78px] font-fraunces">{`Select a time`}</p>

            </div>
            {timesList.length === 0 ? (
                <p className="font-monserrat text-sm p-1">{`No Availability for this Date`}</p>
            ) : (
                <div className="overflow-auto scrollbar-hide">
                    {timesList.map((time: TimePeriod, index: number) => (
                        <div 
                            key={index} 
                            className={`flex items-center justify-center m-2 rounded cursor-pointer border border-gray-200 py-[5.08px] text-slate-950
                            ${activeRow === index ? "bg-black text-white" : "hover:bg-gray-200"}`}
                            onClick={() => setSelectedTime(index, time)}
                        >
                            <p className="font-montserrat text-sm font-normal leading-3 text-center">
                                {createMeetingDisplayString(time)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimeSelectionList;
