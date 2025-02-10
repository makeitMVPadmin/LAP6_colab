
import { Calendar } from "../ui/calendar";

c

const BookingCalendar: React.FC<BookingCalendarProps> = ({ selectedDate, setDate }) => {

  return (
    <div className="border-2 border-black rounded-lg">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setDate}
        className="rounded-md border bg-white"
      />
    </div>
  );
};

export default BookingCalendar;
