import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { TimePeriodDisplay, AvailabilityErrors } from "@/types/types";


interface AvailabilityInputProps {
    index: number;
    timePeriod: TimePeriodDisplay;
    errors: AvailabilityErrors[];
    setTimePeriod: (index: number, time: string, isStart: boolean) => void;
    deleteTimePeriod: (index: number) => void;
}

const AvailabilityInput: React.FC<AvailabilityInputProps> = ({index, timePeriod, errors, setTimePeriod, deleteTimePeriod}) => {

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
        <div className="w-full flex flex-col mb-2">
            <div className="p-3 max-h-[500px] bg-white border border-1 border-b-2 border-r-2 border-black rounded-lg">
                <div className="w-full flex flex-col my-3">
                    <div className="w-full flex flex-row justify-between items-center">
                        <Label className="" htmlFor={`startTime`+{index}}>Start Time</Label>
                        <Input type="string" id={`startTime`+{index}} placeholder='0:00' value={timePeriod.startTime} onChange={handleStartTimeChange} className={`w-[45%] h-[1.75rem] ${startError ? "border-[#e53935]": ""}`}/>
                    </div>
                    {startError && 
                        <p className='text-xs text-[#e53935]'>{startError}</p>
                    }
                </div>
                <div className="w-full flex flex-col my-3">
                    <div className="w-full flex flex-row justify-between items-center">
                        <Label className="" htmlFor={`endTime`+{index}}>End Time</Label>
                        <Input type="string" id={`endTime`+{index}} placeholder='0:00' value={timePeriod.endTime} onChange={handleEndTimeChange} className={`w-[45%] h-[1.75rem] ${endError ? "border-[#e53935]": ""}`}/>
                    </div>
                    {endError && 
                        <p className='text-xs text-[#e53935]'>{endError}</p>
                    }
                </div>
            </div>
            <Button className="w-[4rem] h-[1.5rem] my-1 bg-white text-black hover:bg-black hover:text-white" onClick={handleDeleteClick}>{`Delete`}</Button>
        </div>
    );
}
export default AvailabilityInput;