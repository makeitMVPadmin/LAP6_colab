import { TimePeriod } from "@/types/types";
import React, { useState } from "react";

interface TimeSelectionListProps {
    timesList: TimePeriod[];
    selectedDate: Date | undefined;
    setTime: (date: Date | undefined) => void;
}

const TimeSelectionList: React.FC<TimeSelectionListProps> = ({timesList, selectedDate, setTime}) => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div className="p-5 max-h-[500px] bg-white border-2 border-black rounded-lg">
      <div className="sticky top-0 bg-white z-10 p-2 border-b border-gray-600">
        <span className="font-bold">{selectedDate?.toDateString()}</span>
      </div>
      {/* <div className="overflow-auto scrollbar-hide max-h-[150px]">
        {timesList.map((time: string, index: number) => (
          <div
            key={index}
            className={`flex items-center mb-2 border-b border-gray-600 pb-2 ${
              activeRow === index + 1 ? "bg-[#EEEEEE]" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveRow(index + 1)}
          >
            <span className="mr-2">{activeRow === index + 1 ? "✔" : ""}</span>
            <span className="text-lg">{time}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TimeSelectionList;
