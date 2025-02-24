import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
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
    
    
    const renderCheckbox = (bool: boolean, role: string) => {
        return (
            <span 
                className={cn(`cursor-pointer h-5 w-5 rounded-sm border-2 border-black self-center ml-4 ${bool
                    ? "bg-black" : "bg-white"
                }`)}
                onClick={() => {filterGoalBuddies(role)}}
            />
        )
    }
    
    const bounds = {
        card: "rounded-lg border border-r-2 border-b-2 border-black w-44 pl-2 relative",
        role: "flex flex-row justify-between relative h-8",
        cardHeader: "font-bold text-lg p-0"
    } 

    const renderRole = (tag: string, label: string) => {
        const smallBadge = (
            tag === 'mentor' && <MentorBadge width="w-5" stroke="2" /> ||
            tag === 'goalBuddy' && <GoalBuddyBadge width="w-5" stroke="2" /> ||
            tag === 'networking' && <NetworkingBadge width="w-5" stroke="2" />
        )
        
        return (
            <div className={bounds.role}>
                <label 
                    className={bounds.card}
                >
                    {smallBadge} {label}
                </label>
                {renderCheckbox(filter.mentor, 'mentor')}
            </div>
        )
    }

    return (
        <Card className={cn("lg:w-60 h-16 lg:h-44 mt-4 ml-4 pb-0 border-none shadow-none")}>
            <CardContent className={cn("flex flex-row justify-between lg:flex-col gap-4 p-0 md:pr-4 md:pl-4")}>
                {renderRole('mentor', 'Mentor')}
                {renderRole('goalBuddy', 'Goal Buddy')}
                {renderRole('networking', 'Networking')}
                <CardDescription 
                    className={cn("text-right text-black text-md m-0 -mt-3 cursor-pointer")}
                    onClick={() => filterGoalBuddies('')}>Clear All
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default Filter;