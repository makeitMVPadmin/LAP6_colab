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
        if (selectedDay === null || selectedDayAvailability === null) {
            setTimePeriodInputs([]);

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

    async function updateGoalBuddyAvailability() {
        let isDayError: string = "";
        if (selectedDay === null) {
            isDayError = "Please select a date";
        }
        
        const errors: AvailabilityErrors[] = validateAllAvailabilities(timePeriodInputs);

        const hasErrors = errors.some(error => error.errorsExist);
        if (hasErrors || isDayError) {
            updateErrorStates(isDayError, errors, "");
            return;
        }

        if(hasOverlap(timePeriodInputs)){
            updateErrorStates("", [], "*Time periods cannot overlap");
            return;
        }

        const updatedTimePeriods: TimePeriod[] = [];
        timePeriodInputs?.forEach((period) => {
            updatedTimePeriods.push({ startTime: createTimeFromStrings(period.startTime), endTime: createTimeFromStrings(period.endTime) });
        });
        const createdAvailability: Availabilities = { day: selectedDay!, timePeriods: updatedTimePeriods };

        let selectDayExists: boolean = false;
        const updatedAvailabilities: Availabilities[] = [];
        availability?.forEach((dailyAvailability)=> {
            if (dailyAvailability.day === selectedDay){
                selectDayExists = true;
                if(updatedTimePeriods.length !== 0) {
                    updatedAvailabilities.push(createdAvailability);
                }
            }else{
                updatedAvailabilities.push(dailyAvailability);
            }
        });

        if (!selectDayExists) {
            updatedAvailabilities.push(createdAvailability);
        }

        try {
            await editGoalBuddy(activeGoalBuddy.id, { availabilities: updatedAvailabilities });
            setAvailability(updatedAvailabilities);
            setBackendError("");
            setConfirmationState(true);

            const updatedGoalBuddy: GoalBuddy = {
                ...activeGoalBuddy,
                availabilities: updatedAvailabilities
            };
            updateGoalBuddy(updatedGoalBuddy);
            
        } catch (error) {
            setBackendError(`Something went wrong with updating your availability. ${error} Please try again.`);
        }
    }

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
    <div className="w-full min-h-[48vh] md:min-h-0 h-fit md:h-full flex flex-col justify-center pt-4 md:pt-16 pb-10 md:pb-8 px-[56px] md:px-8 flex-grow md:flex-grow-0 overflow-hidden bg-blue">
        {confirmationState ? (
            <div className="w-full h-full flex flex-col items-center justify-center min-h-[480px] md:min-h-0">
                <div className="bg-[#ECFDF2] w-full min-h-[348px] md:min-h-0 md:h-[75%] flex flex-col items-center justify-between p-4 rounded">
                    <div className="bg-[#ECFDF2] w-full h-full flex flex-col items-center justify-center my-1">
                        <ConfirmationIcon />
                        <h3 className="text-[#00892d] text-xl font-medium font-montserrat leading-none py-4">{`Confirmed`}</h3>
                        <p className="text-[#00892d] text-sm font-normal font-montserrat  leading-tight text-center">{makeConfirmationMessage(false)}</p>
                        <p className="text-[#00892d] text-sm font-normal font-montserrat  leading-tight text-center">{makeConfirmationMessage(true)}</p>
                    </div>
                    <Button variant="colabSecondary" size="colabSecondary" className="h-8 mb-4 md:mb-0" onClick={resetComponent}>{`Edit`}</Button>
                </div>
            </div>
        ) : (
            <div className="w-full h-full min-h-[464px] flex flex-col flex-grow md:flex-grow-0 items-center justify-between">
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
                        <div className="w-full md:max-h-[80%] flex flex-col">
                            <h3 className="mt-4 mb-1 text-[#0c0c0c] text-base font-semibold font-montserrat leading-[14.80px]">
                                {`Time Zone: Eastern Standard Time`}
                            </h3>
                            <div className="w-full h-full flex flex-col flex-grow md:flex-grow-0 md:overflow-y-auto justify-start">
                                <div className="w-full flex flex-col">
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
                            </div>
                            <Button variant="colabAdd" size="colabAdd" className="my-1" onClick={addTimeRow}>
                                <AddIcon />
                                {`Add`}
                            </Button>
                        </div>
                    )}
                </div>
                <Button variant="colabPrimary" size="colabPrimary" disabled={!selectedDay} className={`h-[38px] ${selectedDay ? "mt-12 md:mt-2" : "mt-10 md:mt-2"}`}  onClick={updateGoalBuddyAvailability}>
                {selectedDay ? "Confirm" : "Edit"}
                </Button>
            </div>
        )}
    </div>
  );
};

export default AvailabilitySection;