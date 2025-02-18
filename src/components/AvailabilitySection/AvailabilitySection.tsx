import React, { useEffect, useState } from "react";
import { Availabilities, TimePeriod, GoalBuddy, DayOfWeek, TimePeriodDisplay, AvailabilityErrors } from "@/types/types";
import { editGoalBuddy } from "../../../firebase/functions/editGoalBuddy";
import { Button } from "@/components/ui/button";
import DaySelection from "../DaySelection/DaySelection";
import { createTimeFromStrings, findAvailabilityForDay, formatTimeString } from "@/utils/dateHelpers";
import AvailabilityInput from "../AvailabilityInput/AvailabilityInput";

interface AvailabilitySectionProps {
    activeGoalBuddy: GoalBuddy,
    updateGoalBuddy: (data: GoalBuddy) => void
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ activeGoalBuddy, updateGoalBuddy }) => {
    // Set state variables
    const [availability, setAvailability] = useState<Availabilities[]>(activeGoalBuddy.availabilities);
    const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
    const [selectedDayAvailability, setSelectedDayAvailability] = useState<Availabilities | null>(null);
    const [dayError, setDayError] = useState<string>("");
    const [timePeriodInputs, setTimePeriodInputs] = useState<TimePeriodDisplay[]>([]);
    const [timeErrors, setTimeErrors] = useState<AvailabilityErrors[]>([]);
    const [backendError, setBackendError] = useState<string>("");
    const [confirmationState, setConfirmationState] = useState<boolean>(false);

    useEffect(() => {
        // Clear the inputs when there is no selected day or any availabilities on that day
        if (selectedDay === null || selectedDayAvailability === null) {
            setTimePeriodInputs([]);

        // Populate the inputs when the selected day changes to one with times
        } else {
            const currentTimePeriods: TimePeriodDisplay[] = [];      
            selectedDayAvailability.timePeriod.forEach((period) => {
                const startString: string = formatTimeString(period.startTime);
                const endString: string = formatTimeString(period.endTime);
                currentTimePeriods.push({startTime: startString, endTime: endString})
            });
            setTimePeriodInputs(currentTimePeriods);
        }
        // // Erase previous time errors
        // setTimeErrors([]);
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
        setTimeErrors([]);
        setSelectedDay(day);
    }

    // Function to update the time period input for start or end time in one row
    function updateTimePeriod(index: number, input: string, isStartTime: boolean){
        const updatedTimePeriodInputs: TimePeriodDisplay[] = [...timePeriodInputs];
        if(isStartTime){
            updatedTimePeriodInputs[index].startTime = input;
        }else{
            updatedTimePeriodInputs[index].endTime = input;
        }

        setTimePeriodInputs(updatedTimePeriodInputs);
        
    }

    function deleteTimePeriod(index: number){
        if(timePeriodInputs.length <= 1){
            setTimeErrors([]);
            setTimePeriodInputs([]);
        }else{
            const timePeriodsWithRemoval: TimePeriodDisplay[] = [];
            const timeErrorsWithRemoval: AvailabilityErrors[] = [];
            for(let i: number = 0; i < timePeriodInputs.length; i++){
                if(i !== index){
                    timePeriodsWithRemoval.push(timePeriodInputs[i]);
                    if(timeErrors.length !== 0){
                        timeErrorsWithRemoval.push(timeErrors[i]);
                    }
                }
            }
            setTimeErrors(timeErrorsWithRemoval);
            setTimePeriodInputs(timePeriodsWithRemoval);
        }
    }

    // Function to validate the time inputs of one time period display
    function validateAvailability(startTime: string, endTime: string): AvailabilityErrors {
        const presentErrors = {startTimeError: "", endTimeError: "", errorsExist: false };

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
        
        // Verify that a day has been selected
        let isDayError: string = "";
        if (selectedDay === null) {
            isDayError = "Please select a date";
        }
        
        // Look for errors in the time period fields.
        const errors: AvailabilityErrors[] = [];
        timePeriodInputs.forEach((period) => {
            errors.push(validateAvailability(period.startTime, period.endTime));
        });

        //  If any errors are found, halt the update process and show them.
        const hasErrors = errors.some(error => error.errorsExist);
        if (hasErrors || isDayError) {
            updateErrorStates(isDayError, errors);
            return;
        }

        // Create the new Availabilities object with the current input
        const updatedTimePeriods: TimePeriod[] = [];
        timePeriodInputs.forEach((period) => {
            updatedTimePeriods.push({ startTime: createTimeFromStrings(period.startTime), endTime: createTimeFromStrings(period.endTime) });
        });
        const createdAvailability: Availabilities = { day: selectedDay!, timePeriod: updatedTimePeriods };

        // Copy the availability items to updatedAvailabilities
        let selectDayExists: boolean = false;
        const updatedAvailabilities: Availabilities[] = [];
        availability.forEach((dailyAvailability)=> {
            if (dailyAvailability.day === selectedDay){
                selectDayExists = true;
                // Remove the edited availability if it has no time periods
                if(updatedTimePeriods.length !== 0) {
                    updatedAvailabilities.push(createdAvailability);
                }
            }else{
                updatedAvailabilities.push(dailyAvailability);
            }
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

            // Update the goal buddy data for page rerender
            const updatedGoalBuddy: GoalBuddy = {
                ...activeGoalBuddy,
                availabilities: updatedAvailabilities
            };
            updateGoalBuddy(updatedGoalBuddy);
            
        } catch (error) {
            // Show error state
            setBackendError(`Something went wrong with updating your availability. ${error} Please try again.`);
        }
    }

    // Function to return component to "pristine" look after a successful update
    function resetComponent() {
        setSelectedDay(null);
        setSelectedDayAvailability(null);
        setDayError("");
        setTimeErrors([]);
        setBackendError("")
        setConfirmationState(false);
    }

    function updateErrorStates(dayError: string, timeErrors: AvailabilityErrors[]) {
        setDayError(dayError);
        setTimeErrors(timeErrors);
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
            <div className="p-5 max-h-[500px] bg-white border-2 border-black rounded-lg">
                <div className="sticky top-0 bg-white z-10 p-2 border-b border-gray-600">
                    <p className="font-bold">{`Timezone: ${activeGoalBuddy.timezone} - 24 hour clock`}</p>
                </div>
                <div className="overflow-auto scrollbar-hide max-h-[150px]">
                    {timePeriodInputs.map((period, index) => (
                        <AvailabilityInput key={index} index={index} timePeriod={period} setTimePeriod={updateTimePeriod} deleteTimePeriod={deleteTimePeriod} errors={timeErrors} />
                    ))}
                </div>
            </div>
          )}
          <Button type="submit" onClick={updateGoalBuddyAvailability}>
            {selectedDay ? "Confirm" : "Edit"}
          </Button>
          
        </div>
      )}
    </div>
  );
};

export default AvailabilitySection;