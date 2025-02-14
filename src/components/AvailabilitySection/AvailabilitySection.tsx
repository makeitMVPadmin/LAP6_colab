import React, { useState } from "react";
import {GoalBuddy, Availabilities, TimePeriod, Time, AllGoalBuddyData } from "@/types/types";
import { Timestamp } from "firebase/firestore";
import {editGoalBuddy} from "../../../firebase/functions/editGoalBuddy";
import { Button } from "@/components/ui/button"
import DaySelection from "../DaySelection/DaySelection";
import { Label } from "@/components/ui/label";
import { findAvailabilityForDay } from "@/utils/dateHelpers";
import AvailabilityInput from "../AvailabilityInput/AvailabilityInput";


interface AvailabilitySectionProps {
  activeGoalBuddy: AllGoalBuddyData;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({activeGoalBuddy}) => {

    // Set state variables
    const[availability, setAvailability] = useState<Availabilities[]>(activeGoalBuddy.availabilities);
    const[selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedDayAvailability, setSelectedDayAvailability] = useState<Availabilities | null>(null)
    
    // Function to show availability for a specific day
    function showAvailability(day: string) {
        const availabilityForDay = findAvailabilityForDay(day, availability);
        
        if(availabilityForDay === undefined) {
            setSelectedDayAvailability(null);
        } else {
            setSelectedDayAvailability(availabilityForDay);
        }
        setSelectedDay(day);
    }

    // Function to update availability
    function updateAnAvailability() {

    }

    // Function to update availability
    function editTimePeriod(timePeriod: TimePeriod, index: number) {
        
    }

    return (
        <div>
            <h2>Availability</h2>
            <p>{activeGoalBuddy.timezone}</p>
            <Label htmlFor="day">Select a day of the week:</Label>
            <DaySelection setSelectedDay={showAvailability}/>
            {selectedDay && (
                <div>
                    {selectedDayAvailability && (
                        <div>
                            {selectedDayAvailability.timePeriod.map((time: TimePeriod, index: number) => (
                                <AvailabilityInput key={index} time={time} index={index}/>
                            ))}
                        </div>
                    )}
                    <AvailabilityInput time={null} index={-1}/>
                </div>
            )}
            <Button type="submit">Confirm</Button>
        </div>
    );
}
export default AvailabilitySection;