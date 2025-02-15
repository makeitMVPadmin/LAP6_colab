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
        <Card className={cn("w-52 h-44 pb-0 border-black border-b-2 border-r-2")}>
            <CardHeader className={cn("pt-2 pr-4")}>
            <CardDescription 
                className={cn("text-right text-sm font-light m-0 cursor-pointer")}
                onClick={() => filterGoalBuddies('')}>Clear All
            </CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-col gap-4 pr-4 pl-4 pb-0")}>
                <div className="flex flex-row justify-between relative">
                    <CardDescription>
                        <span className="h-3 w-3 mr-1 inline-block align-center bg-blue-600"></span>
                        Mentor
                    </CardDescription>
                    <Checkbox 
                        checked={filter.mentor}
                        onClick={() => {filterGoalBuddies('mentor')}}>
                    </Checkbox>
                    <span className="w-full border-b border-slate-700 absolute top-6"></span>
                </div>
                <div className="flex flex-row justify-between relative">
                    <CardDescription>
                        <span className="h-3 w-3 mr-1 inline-block align-center bg-orange-600"></span>
                        Goal Buddy
                    </CardDescription>
                    <Checkbox 
                        checked={filter.accountability}
                        onClick={() => {filterGoalBuddies('accountability')}}>
                    </Checkbox>
                    <span className="w-full border-b border-slate-700 absolute top-6"></span>
                </div>
                <div className="flex flex-row justify-between">
                    <CardDescription>
                        <span className="h-3 w-3 mr-1 inline-block align-center bg-green-600"></span>
                        Networking
                    </CardDescription>
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