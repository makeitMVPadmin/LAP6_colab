import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { TimePeriodDisplay, AvailabilityErrors } from "@/types/types";


interface AvailabilityInputProps {
    index: number
    idName: string;
    timePeriod: TimePeriodDisplay;
    errors: AvailabilityErrors[];
    setTimePeriod: (index: number, time: string, isStart: boolean) => void;
    deleteTimePeriod: (index: number) => void;
}

const AvailabilityInput: React.FC<AvailabilityInputProps> = ({index, idName, timePeriod, errors, setTimePeriod, deleteTimePeriod}) => {

    const [startError, setStartError] = useState<string>("");
    const [endError, setEndError] = useState<string>("")

    useEffect(() => {
        if(errors.length !== 0){
            setStartError(errors[index].startTimeError);
            setEndError(errors[index].endTimeError);
        }else{
            setStartError("");
            setEndError("");
        }
    }, [errors]);
    
    // Event handlers for input changes
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimePeriod(index, e.target.value, true);

    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimePeriod(index, e.target.value, false);
    };

    // Event handler for deletion
    const handleDeleteClick = () => {
        deleteTimePeriod(index);
    }

    return (
        <div className="w-full flex flex-col mb-3 ">
            <div className="p-3 my-1 bg-white border border-1 border-b-2 border-r-2 border-black rounded-lg">
                <div className="w-full flex flex-col my-3">
                    <div className="w-full flex flex-row justify-between items-center">
                        <Label className="text-slate-900 text-sm font-medium font-['Montserrat'] leading-3" htmlFor={`startTime_${idName}`}>
                            {`Start Time`}
                        </Label>
                        <Input type="string" id={`startTime_${idName}`} placeholder='0:00' value={timePeriod.startTime} onChange={handleStartTimeChange} className={`w-[40%] h-[24px] pl-[7.57px] pr-[7.57px] py-[5.05px] bg-white rounded border border-slate-300 justify-start items-center inline-flex text-slate-900 text-sm font-normal font-['Montserrat'] leading-3 ${startError ? "border-[#f44336]": ""}`}/>
                    </div>
                    {startError && 
                        <p className="text-[#f44336] text-sm font-semibold font-['Montserrat'] leading-tight">{startError}</p>
                    }
                </div>
                <div className="w-full flex flex-col my-3">
                    <div className="w-full flex flex-row justify-between items-center">
                        <Label className="text-slate-900 text-sm font-medium font-['Montserrat'] leading-3" htmlFor={`endTime_${idName}`}>
                            {`End Time`}
                        </Label>
                        <Input type="string" id={`endTime_${idName}`} placeholder='0:00' value={timePeriod.endTime} onChange={handleEndTimeChange} className={`w-[40%] h-[24px] pl-[7.57px] pr-[7.57px] py-[5.05px] bg-white rounded border border-slate-300 justify-start items-center inline-flex text-slate-900 text-sm font-normal font-['Montserrat'] leading-3 ${endError ? "border-[#f44336]": ""}`}/>
                    </div>
                    {endError && 
                        <p className="text-[#f44336] text-sm font-semibold font-['Montserrat'] leading-tight">{endError}</p>
                    }
                </div>
            </div>
            <Button variant="colabDelete" size="colabDelete" onClick={handleDeleteClick}>{`Delete`}</Button>
        </div>
    );
}
export default AvailabilityInput;
