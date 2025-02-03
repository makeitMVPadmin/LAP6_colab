import React, { useState } from "react";
import { Calendar } from "../ui/calendar";

const BookingCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="border-2 border-black rounded-lg">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border bg-white"
      />
    </div>
  );
};

export default BookingCalendar;
