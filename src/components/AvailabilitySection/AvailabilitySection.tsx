import React, { useEffect, useState } from "react";
import { Availabilities, TimePeriod, AllGoalBuddyData, DayOfWeek } from "@/types/types";
import {editGoalBuddy} from "../../../firebase/functions/editGoalBuddy";
import { Button } from "@/components/ui/button"
import DaySelection from "../DaySelection/DaySelection";
import { createTimeFromStrings, findAvailabilityForDay, formatTimeString } from "@/utils/dateHelpers";
import AvailabilityInput from "../AvailabilityInput/AvailabilityInput";


interface AvailabilitySectionProps {
  activeGoalBuddy: AllGoalBuddyData;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({activeGoalBuddy}) => {

    // Set state variables
    const[availability, setAvailability] = useState<Availabilities[]>(activeGoalBuddy.availabilities);
    const[selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
    const [selectedDayAvailability, setSelectedDayAvailability] = useState<Availabilities | null>(null);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [dayError, setDayError] = useState<boolean>(false);
    const [startTimeError, setStartTimeError] = useState<boolean>(false);
    const [endTimeError, setEndTimeError] = useState<boolean>(false);
    const [backendError, setBackendError] = useState<boolean>(false);
    const [confirmationState, setConfirmationState] = useState<boolean>(false);
    
    useEffect(() => {
        // Clear the inputs when the selected day changes
        if (selectedDay === null || selectedDayAvailability === null) {
            setStartTime("");
            setEndTime("");
        
        // Populate the inputs when the selected day changes to one with times
        }else{
            const startString = formatTimeString(selectedDayAvailability.timePeriod[0].startTime);
            const endString = formatTimeString(selectedDayAvailability.timePeriod[0].endTime);
            setStartTime(startString);
            setEndTime(endString);
        }

        setStartTimeError(false);
        setEndTimeError(false);
    }, [selectedDay, selectedDayAvailability]);

    // Function to show availability for a specific day
    function showAvailability(day: DayOfWeek) {
        const availabilityForDay = findAvailabilityForDay(day, availability);

        if(availabilityForDay === undefined) {
            setSelectedDayAvailability(null);

        } else {
            setSelectedDayAvailability(availabilityForDay);

        }
        setDayError(false);
        setSelectedDay(day);
    }

    // Function to handle the user trying to confirm their new availiability for a day
    async function updateGoalBuddyAvailability(){
        // Verify that a day has been selected
        if(selectedDay === null){
            setDayError(true);
            return;
        }

        // Verify that the time period is valid
        // Check if matches "hh:mm" format
        const timePattern24Hour = /^([0-9]|[01][0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timePattern24Hour.test(startTime)) {
            setStartTimeError(true);
            return;
        }
        if (!timePattern24Hour.test(endTime)) {
            setEndTimeError(true);
            return;
        }

        // Check that the endTime is after the startTime
        let testStartTime : Date;
        let testEndTime: Date;
        if(startTime.length === 4){
            testStartTime = new Date(`1970-01-01T0${startTime}:00`);
        }else{
            testStartTime = new Date(`1970-01-01T${startTime}:00`);
        }
        if(endTime.length === 4){
            testEndTime = new Date(`1970-01-01T0${endTime}:00`);
        }else{
            testEndTime = new Date(`1970-01-01T${endTime}:00`);
        }
        if (testEndTime < testStartTime) {
            console.log("Before start");
            setEndTimeError(true);
            return;
        }

        // Create the updated Availability from the input for the selected day
        const updatedTimePeriod: TimePeriod = {startTime: createTimeFromStrings(startTime), endTime: createTimeFromStrings(endTime)};
        const createdAvailability: Availabilities = { day: selectedDay!, timePeriod: [updatedTimePeriod] };

        // Copy the availability items to updatedAvailabilities
        let selectDayExists: boolean = false;
        const updatedAvailabilities: Availabilities[] = availability.map((dailyAvailability) => {
            // If the selected day already has a set TimePeriod, replace it with new one
            if (dailyAvailability.day === selectedDay) {
                selectDayExists = true;
                return createdAvailability;
            }
            return dailyAvailability;
        });
        // If there was no availability to update, then push the new daily availability to the array
        if(!selectDayExists){
            updatedAvailabilities.push(createdAvailability);
        }

        // Make the call to firebase to update the user's goal_buddy document availabilities field.
        try{
            await editGoalBuddy(activeGoalBuddy.id, { availabilities: updatedAvailabilities });
            setAvailability(updatedAvailabilities);
            setConfirmationState(true);

        }catch(error){
            // Show error state
            setBackendError(true);
        }
        
    }

    return (
        <div>
            {confirmationState ? (
                <p className="text-green-500">{`Congratulations! Your availability has been successfully updated.`}</p>
            ) : (
                <div>
                    <h2>Set My Availabilities</h2>
                    {backendError && (
                        <p className="text-red-500">{`Something went wrong with updating your availability. Please try again.`}</p>
                    )}
                    <DaySelection setSelectedDay={showAvailability} isError={dayError}/>
                    {selectedDay && (
                        <div>
                            <p>{`Timezone: ${activeGoalBuddy.timezone}`}</p>
                            <AvailabilityInput startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} isStartError={startTimeError} isEndError={endTimeError}/>
                        </div>
                    )}
                    <Button type="submit" onClick={updateGoalBuddyAvailability}>Confirm</Button>
                </div>
            )}
        </div>
    );
}
export default AvailabilitySection;