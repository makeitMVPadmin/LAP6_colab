import React, { useEffect, useState } from "react";
import { Availabilities, TimePeriod, AllGoalBuddyData, DayOfWeek } from "@/types/types";
import { editGoalBuddy } from "../../../firebase/functions/editGoalBuddy";
import { Button } from "@/components/ui/button";
import DaySelection from "../DaySelection/DaySelection";
import { createTimeFromStrings, findAvailabilityForDay, formatTimeString } from "@/utils/dateHelpers";
import AvailabilityInput from "../AvailabilityInput/AvailabilityInput";

interface AvailabilitySectionProps {
    activeGoalBuddy: AllGoalBuddyData;
}

interface AvailabilityErrors {
    dayError: string;
    startTimeError: string;
    endTimeError: string;
    errorsExist: boolean;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ activeGoalBuddy }) => {
  // Set state variables
    const [availability, setAvailability] = useState<Availabilities[]>(activeGoalBuddy.availabilities);
    const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
    const [selectedDayAvailability, setSelectedDayAvailability] = useState<Availabilities | null>(null);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [dayError, setDayError] = useState<string>("");
    const [startTimeError, setStartTimeError] = useState<string>("");
    const [endTimeError, setEndTimeError] = useState<string>("");
    const [backendError, setBackendError] = useState<string>("");
    const [confirmationState, setConfirmationState] = useState<boolean>(false);

    useEffect(() => {
        // Clear the inputs when the selected day changes
        if (selectedDay === null || selectedDayAvailability === null) {
            setStartTime("");
            setEndTime("");

        // Populate the inputs when the selected day changes to one with times
        } else {
            const startString = formatTimeString(selectedDayAvailability.timePeriod[0].startTime);
            const endString = formatTimeString(selectedDayAvailability.timePeriod[0].endTime);
            setStartTime(startString);
            setEndTime(endString);
        }

        setStartTimeError("");
        setEndTimeError("");
    }, [selectedDay, selectedDayAvailability]);

    // Function to show availability for a specific day
    function showAvailability(day: DayOfWeek) {
        const availabilityForDay = findAvailabilityForDay(day, availability);

        if (availabilityForDay === undefined) {
            setSelectedDayAvailability(null);
        } else {
            setSelectedDayAvailability(availabilityForDay);
        }
        setDayError("");
        setSelectedDay(day);
    }

    // Function to validate the inputs
    function validateAvailability(): AvailabilityErrors {
        const presentErrors = { dayError: "", startTimeError: "", endTimeError: "", errorsExist: false };

        // Verify that a day has been selected
        if (selectedDay === null) {
            presentErrors.dayError = "Please select a date";
            presentErrors.errorsExist = true;
        }

        // Verify that the time period is valid
        // Check if matches "hh:mm" format
        const timePattern24Hour = /^([0-9]|[01][0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timePattern24Hour.test(startTime)) {
            presentErrors.startTimeError = "Start time is not of format 'hh:mm'";
            presentErrors.errorsExist = true;
        }
        if (!timePattern24Hour.test(endTime)) {
            presentErrors.endTimeError = "End time is not of format 'hh:mm'";
            presentErrors.errorsExist = true;
        }

        // Check that the endTime is after the startTime if there were no format errors
        if (!presentErrors.errorsExist) {
            const testStartTime = new Date(`1970-01-01T${startTime.length === 4 ? '0' : ''}${startTime}:00`);
            const testEndTime = new Date(`1970-01-01T${endTime.length === 4 ? '0' : ''}${endTime}:00`);
            if (testEndTime < testStartTime) {
                presentErrors.endTimeError = "End time cannot be set before the start time";
                presentErrors.errorsExist = true;
            }
        }
        return presentErrors;
    }

    // Function to handle the user trying to confirm their new availability for a day
    async function updateGoalBuddyAvailability() {
        // Look for errors. If any are found and halt the update process and show them.
        const errors: AvailabilityErrors = validateAvailability();
        if (errors.errorsExist) {
            updateErrorStates(errors);
            return;
        }

        // Create the updated Availability from the input for the selected day
        const updatedTimePeriod: TimePeriod = { startTime: createTimeFromStrings(startTime), endTime: createTimeFromStrings(endTime) };
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
        if (!selectDayExists) {
            updatedAvailabilities.push(createdAvailability);
        }

        // Make the call to firebase to update the user's goal_buddy document availabilities field.
        try {
            await editGoalBuddy(activeGoalBuddy.id, { availabilities: updatedAvailabilities });
            setAvailability(updatedAvailabilities);
            setBackendError("");
            setConfirmationState(true);
        } catch (error) {
            // Show error state
            setBackendError(`Something went wrong with updating your availability. ${error} Please try again.`);
        }
    }

    // Function to return component to "pristine" look after a successful update
    function resetComponent() {
        setSelectedDay(null);
        setSelectedDayAvailability(null);
        setConfirmationState(false);
    }

    function updateErrorStates(errors: AvailabilityErrors) {
        setDayError(errors.dayError);
        setStartTimeError(errors.startTimeError);
        setEndTimeError(errors.endTimeError);
        setBackendError("");
    }

  return (
    <div>
      {confirmationState ? (
        <div className="bg-green-200">
          <p className="text-green-500">{`Congratulations! Your availability has been successfully updated.`}</p>
          <Button onClick={resetComponent}>Edit</Button>
        </div>
      ) : (
        <div>
          <h2>Set My Availabilities</h2>
          {backendError && <p className="text-red-500">{backendError}</p>}
          <DaySelection setSelectedDay={showAvailability} isError={dayError} />
          {selectedDay && (
            <div>
              <p>{`Timezone: ${activeGoalBuddy.timezone}`}</p>
              <AvailabilityInput startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} isStartError={startTimeError} isEndError={endTimeError} />
            </div>
          )}
          <Button type="submit" onClick={updateGoalBuddyAvailability}>
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySection;