import { Card, CardContent, CardDescription } from '../ui/card'
import { cn } from "../lib/utils"
import MentorBadge from './MentorBadge'
import GoalBuddyBadge from './GoalBuddyBadge'
import NetworkingBadge from './NetworkingBadge'

interface filterProps {
    filterGoalBuddies: Function,
    filter: {
        mentor: boolean,
        accountability: boolean,
        networking: boolean
    },
    setModalState: Function
}

const Filter: React.FC<filterProps> = ({ filterGoalBuddies, filter }) => {
    const renderCheckbox = (filtered: boolean, role: string) => {
        return (
            <span 
                className={cn(`cursor-pointer h-5 w-5 rounded-sm border-2 border-black self-center ml-4 ${filtered
                    ? "bg-black" : "bg-white"
                }`)}
                onClick={() => {filterGoalBuddies(role)}}
            />
        )
    }

    const renderRole = (tag: string, roleName: string, roleToFilter: boolean) => {
        const smallBadge = (
            tag === 'mentor' && <MentorBadge width="w-8" stroke="2" /> ||
            tag === 'goalBuddy' && <GoalBuddyBadge width="w-8" stroke="2" /> ||
            tag === 'networking' && <NetworkingBadge width="w-8" stroke="2" />
        )
        
        return (
            <div className="flex flex-row justify-between relative h-8">
                <label className="rounded-lg border-2 border-r-4 border-b-4 border-black w-48 h-9 pl-2 text-xl leading-[30px] relative font[Montserrat] font-medium">
                    {smallBadge} {roleName}
                </label>
                {renderCheckbox(roleToFilter, tag)}
            </div>
        )
    }

    return (
        <Card className={cn("lg:w-68 h-16 lg:h-44 mt-4 ml-4 pb-0 border-none shadow-none")}>
            <CardContent className={cn("flex flex-row justify-between lg:flex-col gap-4 p-0 md:pr-4 md:pl-4")}>
                {renderRole('mentor', 'Mentor', filter.mentor)}
                {renderRole('goalBuddy', 'Goal Buddy', filter.accountability)}
                {renderRole('networking', 'Networking', filter.networking)}
                <CardDescription 
                    className={cn("text-right text-gray-800 text-base font[Montserrat] font-medium m-0 -mt-3 cursor-pointer")}
                    onClick={() => filterGoalBuddies('')}>Clear All
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default Filter;