import { Time, TimePeriod } from '@/types/types';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
interface AvailabilityInputProps {
    time: TimePeriod | null;
    index: number;
    // removeAnAvailability: (index: number) => void;
    // updateAnAvailability: (timePeriod: TimePeriod, index: number) => void;
}

// , removeAnAvailability, updateAnAvailability
const AvailabilityInput: React.FC<AvailabilityInputProps> = ({time, index}) => {
    
    // State to manage the input values
    const [startTime, setStartTime] = useState<string>(time ? formatTime(time.startTime) : '00:00');
    const [endTime, setEndTime] = useState<string>(time ? formatTime(time.endTime) : '00:00');

    // Event handlers for input changes
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    };

    // // Event handlers for deleting, editing or adding a TimePeriod in an Availability
    // function removeTime(){
    //     removeAnAvailability(index);
    // }

    // function addOrEditTime(){
    //     const startHour: number = parseInt(startTime.substring(0, startTime.lastIndexOf(':')), 10);
    //     const startMinute: number = parseInt(startTime.substring(startTime.lastIndexOf(':') + 1), 10);
    //     const endHour: number = parseInt(endTime.substring(0, endTime.lastIndexOf(':')), 10);
    //     const endMinute: number = parseInt(endTime.substring(endTime.lastIndexOf(':') + 1), 10);
    
    //     const createStartTime: Time = { hours: startHour, minutes: startMinute };
    //     const createEndTime: Time = { hours: endHour, minutes: endMinute };
    //     const createdTime: TimePeriod = { startTime: createStartTime, endTime: createEndTime };

    //     updateAnAvailability(createdTime, index);
    // }

    // Function to format the time to a string
    function formatTime(time: {hours: number, minutes: number}): string {
        const hours = time.hours.toString().padStart(2, '0');
        const minutes = time.minutes.toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // const startTimeValue = time ? formatTime(time.startTime) : '00:00';
    // const endTimeValue = time ? formatTime(time.endTime) : '00:00';

    return (
        <div className="p-5 max-h-[500px] bg-white border-2 border-black rounded-lg">
            <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input type="string" id="startTime" defaultValue={startTime} onChange={handleStartTimeChange}/>
            </div>
            <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input type="string" id="endTime" defaultValue={endTime} onChange={handleEndTimeChange}/>
            </div>
            {time ? (
                <div>
                    {/* <Button onClick={addOrEditTime}>Edit</Button> */}
                    {/* <Button onClick={removeTime}>Delete</Button> */}
                </div>
            ) : (
                <div>
                    {/* <Button onClick={addOrEditTime}>Add</Button> */}
                </div>
            )}
        </div>
    );
}
export default AvailabilityInput;