import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn } from "../lib/utils"
import { Checkbox } from '../ui/checkbox'

interface filterProps {
    filterGoalBuddies: Function,
    filter: {
        mentor: boolean,
        accountability: boolean,
        networking: boolean
    }
}

const Filter: React.FC<filterProps> = ({ filterGoalBuddies, filter }) => {
    return (
        <Card className={cn("w-52 h-44")}>
            <CardHeader>
            <CardTitle 
                className={cn("text-right text-xs cursor-pointer")}
                onClick={() => filterGoalBuddies('')}>Clear All
            </CardTitle>
            </CardHeader>
            <CardContent className={cn("flex flex-col gap-4")}>
                <div className="flex flex-row justify-between relative">
                    <CardDescription>#Mentors</CardDescription>
                    <Checkbox 
                        checked={filter.mentor}
                        onClick={() => {filterGoalBuddies('mentor')}}>
                    </Checkbox>
                    <span className="w-full border-b border-slate-700 absolute top-6"></span>
                </div>
                <div className="flex flex-row justify-between relative">
                    <CardDescription>#Goal Buddies</CardDescription>
                    <Checkbox 
                        checked={filter.accountability}
                        onClick={() => {filterGoalBuddies('accountability')}}>
                    </Checkbox>
                    <span className="w-full border-b border-slate-700 absolute top-6"></span>
                </div>
                <div className="flex flex-row justify-between">
                    <CardDescription>#Networking</CardDescription>
                    <Checkbox 
                        checked={filter.networking}
                        onClick={() => {filterGoalBuddies('networking')}}>
                    </Checkbox>
                </div>
                </CardContent>
        </Card>
    )
}

export default Filter;