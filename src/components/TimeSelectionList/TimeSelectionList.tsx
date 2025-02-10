import React, { useState } from "react";

const TimeSelectionList: React.FC = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const generateTimeSlots = (): string[] => {
    const times: string[] = [];
    let hour = 0;
    let minute = 0;

    while (hour < 12) {
      const time = `${hour < 10 ? "0" : ""}${hour}:${minute === 0 ? "00" : "30"} AM`;
      times.push(time);

      minute = minute === 0 ? 30 : 0;

      if (minute === 0) hour++;
    }

    hour = 12;
    minute = 0;

    while (hour < 24) {
      const time = `${hour < 10 ? "0" : ""}${hour - 12}:${minute === 0 ? "00" : "30"} PM`;
      times.push(time);

      minute = minute === 0 ? 30 : 0;

      if (minute === 0) hour++;
    }

    return times;
  };

  return (
    <div className="p-5 max-h-[500px] bg-white border-2 border-black rounded-lg">
      <div className="sticky top-0 bg-white z-10 p-2 border-b border-gray-600">
        <span className="font-bold">Sunday, February 2, 2025</span>
      </div>
      <div className="overflow-auto scrollbar-hide max-h-[150px]">
        {generateTimeSlots().map((time, index) => (
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
      </div>
    </div>
  );
};

export default TimeSelectionList;
