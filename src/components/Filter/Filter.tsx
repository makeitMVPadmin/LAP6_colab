import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { cn } from "../lib/utils"
import RoleBadge from './RoleBadge'
import MentorBadge from './MentorBadge'
import GoalBuddyBadge from './GoalBuddyBadge'
import NetworkingBadge from './NetworkingBadge'

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
        <Card className={cn("lg:w-64 h-16 lg:h-44 mt-4 ml-4 pb-0 md:border-none shadow-none")}>
            <CardHeader className={cn("pb-1 pt-2 pr-4")}>
                <CardDescription 
                    className={cn("text-right font-light m-0 cursor-pointer")}
                    onClick={() => filterGoalBuddies('')}>Clear All
                </CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-row justify-between lg:flex-col gap-4 p-0 md:pr-4 md:pl-4")}>
                <div className="flex flex-row justify-between relative">
                    <label className="rounded-lg border-2 border-black w-10/12">
                        <MentorBadge />
                        Mentor
                    </label>
                    <span 
                        className={filter.mentor
                            ? cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-black self-center")
                            : cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-white self-center")}
                        onClick={() => {filterGoalBuddies('mentor')}}
                    />
                </div>
                <div className="flex flex-row justify-between relative">
                    <label>
                        <GoalBuddyBadge />Goal Buddy
                    </label>
                    <span 
                        className={filter.accountability
                            ? cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-black self-center")
                            : cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-white self-center")}
                        onClick={() => {filterGoalBuddies('accountability')}}
                    />
                </div>
                <div className="flex flex-row justify-between">
                    <label>
                    <NetworkingBadge />
                        Networking
                    </label>
                    <span 
                        className={filter.networking
                            ? cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-black self-center")
                            : cn("cursor-pointer h-5 w-5 rounded-sm border-2 border-slate-600 bg-white self-center")}
                        onClick={() => {filterGoalBuddies('networking')}}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Filter;