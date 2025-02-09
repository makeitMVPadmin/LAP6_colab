import React from 'react';
import BookingCalendar from "../BookingCalendar/BookingCalendar";
import EventBox from '../EventBox/EventBox';


export default function MeetingSetupSection() {
    function makeMeetingEvent(event : React.MouseEvent<HTMLButtonElement>){
      console.log(event);
    }

    return (
      <div>
        <BookingCalendar />
        <EventBox />
        <button onClick={makeMeetingEvent}>Submit</button>
      </div>
    )
  }