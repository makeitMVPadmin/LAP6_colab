import React, { useState } from "react";
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import EventBox from '../EventBox/EventBox';


export default function MeetingSetupSection() {

    const [date, setDate] = useState<Date | undefined>(new Date());

    function makeMeetingEvent(event : React.MouseEvent<HTMLButtonElement>){
      console.log(event);
      console.log(date);
    }

    return (
      <div>
        <BookingCalendar selectedDate={date} setDate={setDate}/>
        <EventBox />
        <button onClick={makeMeetingEvent}>Submit</button>
      </div>
    )
  }