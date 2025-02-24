import React, { useEffect, useState } from "react";
import { Availabilities, TimePeriod, GoalBuddy, DayOfWeek, TimePeriodDisplay, AvailabilityErrors } from "@/types/types";
import { editGoalBuddy } from "../../../firebase/functions/editGoalBuddy";
import { Button } from "@/components/ui/button";
import DaySelection from "../DaySelection/DaySelection";
import { createTimeFromStrings, findAvailabilityForDay, formatTimeString } from "@/utils/dateHelpers";
import AvailabilityInput from "../AvailabilityInput/AvailabilityInput";
import { hasOverlap, validateAllAvailabilities } from "@/utils/timePeriodValidation";

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
    const [overlapError, setOverlapError] = useState<string>("");
    const [backendError, setBackendError] = useState<string>("");
    const [confirmationState, setConfirmationState] = useState<boolean>(false);

    useEffect(() => {
        // Clear the inputs when there is no selected day or any availabilities on that day
        if (selectedDay === null || selectedDayAvailability === null) {
            setTimePeriodInputs([]);

        // Populate the inputs when the selected day changes to one with times
        } else {
            const currentTimePeriods: TimePeriodDisplay[] = [];      
            selectedDayAvailability.timePeriods.forEach((period) => {
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

    // Function to delete the TimePeriod from the index'th spot in timePeriodInputs
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

    // Function to add another row for time period inputs
    function addTimeRow(){
        const oneMoreTimePeriodInputs: TimePeriodDisplay[] = [...timePeriodInputs];
        oneMoreTimePeriodInputs.push({startTime: "", endTime: ""})
        setTimePeriodInputs(oneMoreTimePeriodInputs);

    }

    // Function to handle the user trying to confirm their new availability for a day
    async function updateGoalBuddyAvailability() {
        
        // Verify that a day has been selected
        let isDayError: string = "";
        if (selectedDay === null) {
            isDayError = "Please select a date";
        }
        
        // Look for errors in the time period fields.
        const errors: AvailabilityErrors[] = validateAllAvailabilities(timePeriodInputs);

        //  If any errors are found, halt the update process and show them.
        const hasErrors = errors.some(error => error.errorsExist);
        if (hasErrors || isDayError) {
            updateErrorStates(isDayError, errors, "");
            return;
        }

        // Check if any of the time periods overlap
        if(hasOverlap(timePeriodInputs)){
            updateErrorStates("", [], "Time periods cannot overlap");
            return;
        }

        // Create the new Availabilities object with the current input
        const updatedTimePeriods: TimePeriod[] = [];
        timePeriodInputs.forEach((period) => {
            updatedTimePeriods.push({ startTime: createTimeFromStrings(period.startTime), endTime: createTimeFromStrings(period.endTime) });
        });
        const createdAvailability: Availabilities = { day: selectedDay!, timePeriods: updatedTimePeriods };

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
        setOverlapError("");
        setBackendError("");
        setConfirmationState(false);
    }

    function updateErrorStates(dayError: string, timeErrors: AvailabilityErrors[], overlapError: string) {
        setDayError(dayError);
        setTimeErrors(timeErrors);
        setOverlapError(overlapError);
        setBackendError("");
    }

  return (
    <div className="w-full h-full flex flex-col justify-center pt-12 pb-6 px-6">
        {confirmationState ? (
            <div className="bg-green-200 w-full h-[60%] flex flex-col items-center justify-between p-4 rounded">
                <p className="text-green-500 my-16">{`Congratulations! Your availability has been successfully updated.`}</p>
                <Button className="bg-[#0264d4] color-white" onClick={resetComponent}>{`Edit`}</Button>
            </div>
        ) : (
            <div className="w-full h-full flex flex-col items-center justify-between">
                <div className="w-full h-[90%] flex flex-col items-center">
                    <h2 className="font-bold text-center text-xl mb-4">{`Set My Availabilities`}</h2>
                    {backendError && <p className="text-[#e53935] mb-2 bg-red-100 rounded pl-1">{backendError}</p>}
                    <DaySelection setSelectedDay={showAvailability} isError={dayError} />
                    {selectedDay && (
                        <div className="w-full h-full flex flex-col justiy-start">
                            <div className="w-full max-h-[75%] flex flex-col">
                                <div className="sticky top-0 z-10">
                                    <h3 className="font-bold text-sm my-1">{`Timezone: ${activeGoalBuddy.timezone} - 24 hour clock`}</h3>
                                </div>
                                <div className="overflow-auto scrollbar-hide">
                                    {timePeriodInputs.map((period, index) => (
                                    <AvailabilityInput key={index} index={index} timePeriod={period} setTimePeriod={updateTimePeriod} deleteTimePeriod={deleteTimePeriod} errors={timeErrors} />
                                    ))}
                                </div>
                                {overlapError && 
                                    <p className="text-xs text-[#e53935] my-1 bg-red-100 rounded pl-1">{overlapError}</p>
                                }
                            </div>
                            <Button className="w-[4rem] h-[1.5rem] my-1 hover:bg-white hover:text-black" onClick={addTimeRow}>{`+ Add`}</Button>
                        </div>
                    )}
                </div>
                <Button variant="secondary" className="bg-[#ffd22f] color-black" onClick={updateGoalBuddyAvailability}>
                {selectedDay ? "Confirm" : "Edit"}
                </Button>
            </div>
        )}
    </div>
  );
};

export default AvailabilitySection;