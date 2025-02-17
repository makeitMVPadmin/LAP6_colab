import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { cn } from "../lib/utils"
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
        <Card className={cn("w-64 h-44 pb-0 border-black rounded-md border-b-2 border-r-2")}>
            <CardHeader className={cn("pt-2 pr-4")}>
                <CardDescription 
                    className={cn("text-right font-light m-0 cursor-pointer")}
                    onClick={() => filterGoalBuddies('')}>Clear All
                </CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-col gap-4 pr-4 pl-4 pb-0")}>
                <div className="flex flex-row justify-between relative">
                    <label>
                        <RoleBadge colour={"blue-600"} />
                        Mentor
                    </label>
                    <span 
                        className={filter.mentor
                            ? cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-black")
                            : cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-white")}
                        onClick={() => {filterGoalBuddies('mentor')}}
                    />
                </div>
                <div className="flex flex-row justify-between relative">
                    <label>
                        <RoleBadge colour={"#amber-500"} />Goal Buddy
                    </label>
                    <span 
                        className={filter.accountability
                            ? cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-black")
                            : cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-white")}
                        onClick={() => {filterGoalBuddies('accountability')}}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <label>
                    <RoleBadge colour={"green-600"} />
                        Networking
                    </label>
                    <span 
                        className={filter.networking
                            ? cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-black")
                            : cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-white")}
                        onClick={() => {filterGoalBuddies('networking')}}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Filter;