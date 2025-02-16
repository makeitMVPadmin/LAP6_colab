import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { cn } from "../lib/utils"
import { Checkbox } from '../ui/checkbox'
import RoleBadge from './RoleBadge'

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
        <Card className={cn("w-64 h-44 pb-0 border-black border-b-2 border-r-2")}>
            <CardHeader className={cn("pt-2 pr-4")}>
                <CardDescription 
                    className={cn("text-right font-light m-0 cursor-pointer")}
                    onClick={() => filterGoalBuddies('')}>Clear All
                </CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-col gap-4 pr-4 pl-4 pb-0")}>
                <div className="flex flex-row justify-between relative">
                    <label>
                        <RoleBadge colour={"bg-blue-600"} />
                        Mentor
                    </label>
                    <Checkbox 
                        className={cn("h-5 w-5 border-2 border-slate-600 rounded-sm")}
                        checked={filter.mentor}
                        onClick={() => {filterGoalBuddies('mentor')}}
                    />
                </div>
                <div className="flex flex-row justify-between relative">
                    <label>
                        <RoleBadge colour={"bg-orange-600"} />Goal Buddy
                    </label>
                    <Checkbox 
                        className={cn("h-5 w-5 border-2 border-slate-600 rounded-sm")}
                        checked={filter.accountability}
                        onClick={() => {filterGoalBuddies('accountability')}}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <label>
                    <RoleBadge colour={"bg-green-600"} />
                        Networking
                    </label>
                    <Checkbox 
                        className={cn("h-5 w-5 border-2 border-slate-600 rounded-sm")}
                        checked={filter.networking}
                        onClick={() => {filterGoalBuddies('networking')}}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Filter;