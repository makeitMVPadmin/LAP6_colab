import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface AvailabilityInputProps {
    startTime: string;
    endTime: string;
    setStartTime: (time: string) => void;
    setEndTime: (time: string) => void;
    isStartError: string;
    isEndError: string;
}

const AvailabilityInput: React.FC<AvailabilityInputProps> = ({startTime, endTime, setStartTime, setEndTime, isStartError, isEndError}) => {
    
    // Event handlers for input changes
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);

    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    };

    return (
        <div className="p-5 max-h-[500px] bg-white border-2 border-black rounded-lg">
            <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input type="string" id="startTime" placeholder='0:00' value={startTime} onChange={handleStartTimeChange} className={`${isStartError ? "border-red-500": ""}`}/>
                {isStartError && 
                    <p className='text-red-500'>{isStartError}</p>
                }
            </div>
            <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input type="string" id="endTime" placeholder='0:00' value={endTime} onChange={handleEndTimeChange} className={`${isEndError ? "border-red-500": ""}`}/>
                {isEndError && 
                    <p className='text-red-500'>{isEndError}</p>
                }
            </div>
        </div>
    );
}
export default AvailabilityInput;