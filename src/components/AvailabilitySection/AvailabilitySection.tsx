import React, { useEffect, useState } from "react";
import { Availabilities, TimePeriod, GoalBuddy, DayOfWeek, TimePeriodDisplay, AvailabilityErrors } from "@/types/types";
import { editGoalBuddy } from "../../../firebase/functions/editGoalBuddy";
import { Button } from "@/components/ui/button";
import DaySelection from "../DaySelection/DaySelection";
import { createTimeFromStrings, findAvailabilityForDay, formatTimeString } from "@/utils/dateHelpers";
import AvailabilityInput from "../AvailabilityInput/AvailabilityInput";
import { hasOverlap, validateAllAvailabilities } from "@/utils/timePeriodValidation";
import AddIcon from "../AddIcon/AddIcon";
import ConfirmationIcon from "../ConfirmationIcon/ConfirmationIcon";

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
        oneMoreTimePeriodInputs.push({startTime: "", endTime: ""});

        if(timeErrors.length !== 0){
            const oneMoreTimeErrors: AvailabilityErrors[] = [...timeErrors];
            oneMoreTimeErrors.push({startTimeError: "", endTimeError: "", errorsExist: false});
            setTimeErrors(oneMoreTimeErrors);
        }
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
            updateErrorStates("", [], "*Time periods cannot overlap");
            return;
        }

        // Create the new Availabilities object with the current input
        const updatedTimePeriods: TimePeriod[] = [];
        timePeriodInputs?.forEach((period) => {
            updatedTimePeriods.push({ startTime: createTimeFromStrings(period.startTime), endTime: createTimeFromStrings(period.endTime) });
        });
        const createdAvailability: Availabilities = { day: selectedDay!, timePeriods: updatedTimePeriods };

        // Copy the availability items to updatedAvailabilities
        let selectDayExists: boolean = false;
        const updatedAvailabilities: Availabilities[] = [];
        availability?.forEach((dailyAvailability)=> {
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

    function makeConfirmationMessage(justTimes: boolean){
        if(timePeriodInputs.length == 0 && justTimes){
            return "";
        
        }else if(timePeriodInputs.length == 0){
            return `You've set ${selectedDay}s as unavailable.`;
        
        }else if(!justTimes){
            return `You've set availability for ${selectedDay}s at `;
        
        }else{
            let message: string = "";
            timePeriodInputs.forEach(period =>{
                message += `${period.startTime} - ${period.endTime} and `;
            });
            message = message.substring(0, (message.length-5));
            message += ".";

            return message
        }
    }

  return (
    <div className="w-full h-full flex flex-col justify-center pt-16 pb-8 px-8 flex-grow md:flex-grow-0">
        {confirmationState ? (
            <div className="bg-[#ECFDF2] w-full h-[75%] flex flex-col items-center justify-between p-4 rounded">
                <div className="bg-[#ECFDF2] w-full h-full flex flex-col items-center justify-center my-1">
                    <ConfirmationIcon />
                    <h3 className="text-[#00892d] text-xl font-medium font-montserrat leading-none py-4">{`Confirmed`}</h3>
                    <p className="text-[#00892d] text-sm font-normal font-montserrat  leading-tight text-center">{makeConfirmationMessage(false)}</p>
                    <p className="text-[#00892d] text-sm font-normal font-montserrat  leading-tight text-center">{makeConfirmationMessage(true)}</p>
                </div>
                <Button variant="colabSecondary" size="colabSecondary" className="h-8" onClick={resetComponent}>{`Edit`}</Button>
            </div>
        ) : (
            <div className="w-full h-full flex flex-col flex-grow md:flex-grow-0 items-center justify-between">
                <div className="w-full md:h-[90%] flex flex-col flex-grow md:flex-grow-0 items-center">
                    <h2 className="text-slate-950 text-2xl font-semibold font-fraunces leading-tight">
                        {`Set my availability`}
                    </h2>
                    {backendError && 
                        <div className="flex justify-center items-center w-full">
                            <div className="w-fit h-[29.56px] px-[9.85px] py-[6.57px] bg-white rounded-[5px] border-l border-r-2 border-t border-b-2 border-[#28363f] inline-flex">
                                <p className="text-[#b71c1c] text-xs font-medium font-montserrat leading-none text-center w-auto">{backendError}</p>
                            </div> 
                        </div>
                    }
                    <DaySelection setSelectedDay={showAvailability} isError={dayError} />
                    {selectedDay && (
                        <div className="w-full h-full flex flex-col flex-grow md:flex-grow-0 justify-start">
                            <div className="w-full md:max-h-[372px] flex flex-col">
                                <div className="sticky top-0 z-10">
                                    <h3 className="mt-4 mb-1 text-[#0c0c0c] text-base font-semibold font-montserrat leading-[14.80px]">
                                        {`Time Zone: Eastern Standard Time`}
                                    </h3>
                                </div>
                                {overlapError && 
                                    <div className="flex justify-center items-center w-full">
                                        <div className="w-fit h-[29.56px] px-[9.85px] py-[6.57px] bg-white rounded-[5px] border-l border-r-2 border-t border-b-2 border-[#28363f] inline-flex">
                                            <p className="text-[#b71c1c] text-xs font-medium font-montserrat leading-none text-center w-auto">{overlapError}</p>
                                        </div> 
                                    </div>
                                }
                                <div className="overflow-auto h-full ">
                                    {timePeriodInputs.map((period, index) => (
                                    <AvailabilityInput key={index} index={index} idName={`${selectedDay}_${index}`} timePeriod={period} setTimePeriod={updateTimePeriod} deleteTimePeriod={deleteTimePeriod} errors={timeErrors} />
                                    ))}
                                </div>
                            </div>
                            <Button variant="colabAdd" size="colabAdd" className="my-1" onClick={addTimeRow}>
                                <AddIcon />
                                {`Add`}
                            </Button>
                        </div>
                    )}
                </div>
                <Button variant="colabPrimary" size="colabPrimary" disabled={!selectedDay} className={`h-[38px] ${selectedDay ? "mt-2" : "mt-10 md:mt-2"}`}  onClick={updateGoalBuddyAvailability}>
                {selectedDay ? "Confirm" : "Edit"}
                </Button>
            </div>
        )}
    </div>
  );
};

export default AvailabilitySection;