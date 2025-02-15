import { Time, TimePeriod } from '@/types/types';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface AvailabilityInputProps {
    startTime: string;
    endTime: string;
    setStartTime: (time: string) => void;
    setEndTime: (time: string) => void;
}

const AvailabilityInput: React.FC<AvailabilityInputProps> = ({startTime, endTime, setStartTime, setEndTime}) => {
    
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
                <Input type="string" id="startTime" placeholder='0:00' defaultValue={startTime} onChange={handleStartTimeChange}/>
            </div>
            <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input type="string" id="endTime" placeholder='0:00' defaultValue={endTime} onChange={handleEndTimeChange}/>
            </div>
        </div>
    );
}
export default AvailabilityInput;