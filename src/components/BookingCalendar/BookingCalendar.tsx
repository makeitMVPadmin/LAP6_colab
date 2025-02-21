
import { Calendar } from "../ui/calendar";

interface BookingCalendarProps {
    selectedDate: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ selectedDate, setDate }) => {

  return (
    <div className="border-2 border-black rounded-lg mt-1 mb-3 mx-2">
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
