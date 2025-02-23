import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { cn } from "../lib/utils"
import MentorBadge from './MentorBadge'
import GoalBuddyBadge from './GoalBuddyBadge'
import NetworkingBadge from './NetworkingBadge'
import { useState } from 'react'

interface filterProps {
    filterGoalBuddies: Function,
    filter: {
        mentor: boolean,
        accountability: boolean,
        networking: boolean
    }
}

const Filter: React.FC<filterProps> = ({ filterGoalBuddies, filter }) => {
    const [tooltip, setTooltip] = useState({
        mentor: 'invisible',
        goalBuddy: 'invisible',
        networking: 'invisible'
    })
    
    const renderCheckbox = (bool: boolean, role: string) => {
        return (
            <span 
                className={cn(`cursor-pointer h-5 w-5 rounded-sm border-2 border-black self-center ${bool
                    ? "bg-black" : "bg-white"
                }`)}
                onClick={() => {filterGoalBuddies(role)}}
            />
        )
    }

    const showTooltip = (tag: string) => {
        setTooltip(prevTooltip => {
            const newTooltip = { ...prevTooltip }
            if (tag === 'mentor') newTooltip.mentor = 'visible'
            if (tag === 'goalBuddy') newTooltip.goalBuddy = 'visible'
            if (tag === 'networking') newTooltip.networking = 'visible'
            return newTooltip
        })
    }

    const hideTooltip = (tag: string) => {
        setTooltip(prevTooltip => {
            const newTooltip = { ...prevTooltip }
            if (tag === 'mentor') newTooltip.mentor = 'invisible'
            if (tag === 'goalBuddy') newTooltip.goalBuddy = 'invisible'
            if (tag === 'networking') newTooltip.networking = 'invisible'
            return newTooltip
        })
    }

    const renderTooltipNub = () => {
        return <svg className="absolute -left-1.5 top-12" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
            <path d="M2.5 10.831C-0.833337 8.90653 -0.833336 4.09528 2.5 2.17078L6.25 0.00571251V12.9961L2.5 10.831Z" fill="black"/>
        </svg>
    }

    const bounds = {
        card: "rounded-lg border border-r-2 border-b-2 border-black w-44 pl-2 relative",
        tooltip: `flex flex-col items-center text-center rounded-lg border border-r-2 border-b-2 border-black
        w-64 pt-1 pb-4 px-2 absolute z-10 -right-80 -top-10`,
        role: "flex flex-row justify-between relative h-8",
        cardHeader: "font-bold text-lg p-0"
    } 

    return (
        <Card className={cn("lg:w-60 h-16 lg:h-44 mt-4 ml-4 pb-0 md:border-none shadow-none")}>
            <CardHeader className={cn("pb-1 pt-2 pr-4")}>
            </CardHeader>
            <CardContent className={cn("flex flex-row justify-between lg:flex-col gap-4 p-0 md:pr-4 md:pl-4")}>
                <div className={bounds.role}>
                    <label 
                        className={bounds.card}
                        onMouseEnter={() => {showTooltip('mentor')}}
                        onMouseLeave={() => hideTooltip('mentor')}
                    >
                        <MentorBadge width="w-5" stroke="2" /> Mentor
                        <Card className={`${bounds.tooltip} ${tooltip.mentor}`}>
                            {renderTooltipNub()}
                            <MentorBadge width="w-6" stroke="3" />
                            <CardHeader className={cn(bounds.cardHeader)}>Mentor</CardHeader>
                            <CardDescription className="text-black">Translating your ambitions into action with expert advice!</CardDescription>
                        </Card>
                    </label>
                    {renderCheckbox(filter.mentor, 'mentor')}
                </div>
                <div className={bounds.role}>
                <label 
                        className={bounds.card}
                    onMouseEnter={() => {showTooltip('goalBuddy')}}
                    onMouseLeave={() => hideTooltip('goalBuddy')}
                >
                        <GoalBuddyBadge width="w-5" stroke="2" /> Goal Buddy
                        <Card className={`${bounds.tooltip} ${tooltip.goalBuddy}`}>
                            {renderTooltipNub()}
                            <GoalBuddyBadge width="w-6" stroke="3"/>
                            <CardHeader className={cn(bounds.cardHeader)}>Goal Buddy</CardHeader>
                            <CardDescription>Optimize your career path with a buddy who keeps you accountable!</CardDescription>
                        </Card>
                    </label>
                    {renderCheckbox(filter.accountability, 'accountability')}
                </div>
                <div className="flex flex-row justify-between h-8">
                <label 
                    className={bounds.card}
                    onMouseEnter={() => {showTooltip('networking')}}
                    onMouseLeave={() => hideTooltip('networking')}
                >
                    <NetworkingBadge width="w-6" stroke="2" /> Networking
                        <Card className={`${bounds.tooltip} ${tooltip.networking}`}>
                            {renderTooltipNub()}
                            <NetworkingBadge width="w-6" stroke="2.5"/>
                            <CardHeader className={cn(bounds.cardHeader)}>Networking</CardHeader>
                            <CardDescription> Build friendships while building your career — you're not in this alone!</CardDescription>
                        </Card>
                    </label>
                    {renderCheckbox(filter.networking, 'networking')}
                </div>
                <CardDescription 
                    className={cn("text-right text-black text-md m-0 -mt-3 cursor-pointer")}
                    onClick={() => filterGoalBuddies('')}>Clear All
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default Filter;