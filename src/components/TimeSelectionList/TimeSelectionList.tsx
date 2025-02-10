import { TimePeriod } from "@/types/types";
import React, { useState } from "react";

interface TimeSelectionListProps {
    timesList: TimePeriod[];
    selectedDate: Date | undefined;
    setTime: (date: Date | undefined) => void;
}

const TimeSelectionList: React.FC<TimeSelectionListProps> = ({timesList, selectedDate, setTime}) => {
    const [activeRow, setActiveRow] = useState<number | null>(null);
    console.log("provided timesList: ");
    console.log(timesList);

    return (
        selectedDate === undefined ? (
            <div>No Date Selected</div>
        ) : (
            <div className="p-5 max-h-[500px] bg-white border-2 border-black rounded-lg">
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
                            className={`flex items-center mb-2 border-b border-gray-600 pb-2 ${
                            activeRow === index + 1 ? "bg-[#EEEEEE]" : "hover:bg-gray-200"
                            }`}
                            onClick={() => setActiveRow(index + 1)}
                            >
                                <span className="mr-2">{activeRow === index + 1 ? "✔" : ""}</span>
                                <span className="text-lg">{time.startTime.hours + ":" + time.startTime.minutes + " - " + time.endTime.hours + ":"+ time.endTime.minutes}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    );
};

export default TimeSelectionList;
