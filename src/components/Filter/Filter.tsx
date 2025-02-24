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
    },
    setModalState: Function
}

const Filter: React.FC<filterProps> = ({ filterGoalBuddies, filter, setModalState }) => {
    const [tooltip, setTooltip] = useState({
        mentor: 'invisible',
        goalBuddy: 'invisible',
        networking: 'invisible'
    })
    
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

    const updateTooltip = (tag: string, visibility: string) => {
        setTooltip(prevTooltip => ({
            ...prevTooltip,
            [tag]: visibility
        }))
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

    const renderRole = (tag: string, label: string, description: string) => {
        const render = (
            tag === 'mentor' && tooltip.mentor ||
            tag === 'goalBuddy' && tooltip.goalBuddy ||
            tag === 'networking' && tooltip.networking
        )

        const smallBadge = (
            tag === 'mentor' && <MentorBadge width="w-5" stroke="2" /> ||
            tag === 'goalBuddy' && <GoalBuddyBadge width="w-5" stroke="2" /> ||
            tag === 'networking' && <NetworkingBadge width="w-5" stroke="2" />
        )

        const bigBadge = (
            tag === 'mentor' && <MentorBadge width="w-5" stroke="3" /> ||
            tag === 'goalBuddy' && <GoalBuddyBadge width="w-5" stroke="3" /> ||
            tag === 'networking' && <NetworkingBadge width="w-5" stroke="3" />
        )
        
        return (
            <div className={bounds.role}>
                <label 
                    className={bounds.card}
                    onMouseEnter={() => {
                        updateTooltip(tag, 'visible')
                        setModalState(true)
                    }}
                    onMouseLeave={() => {
                        updateTooltip(tag, 'invisible')
                        setModalState(false)
                    }}
                >
                    {smallBadge} {label}
                    <Card className={`${bounds.tooltip} ${render}`}>
                        {renderTooltipNub()}
                        {bigBadge}
                        <CardHeader className={cn(bounds.cardHeader)}>{label}</CardHeader>
                        <CardDescription className="text-black">{description}</CardDescription>
                    </Card>
                </label>
                {renderCheckbox(filter.mentor, 'mentor')}
            </div>
        )
    }

    return (
        <Card className={cn("lg:w-60 h-16 lg:h-44 mt-4 ml-4 pb-0 border-none shadow-none")}>
            <CardContent className={cn("flex flex-row justify-between lg:flex-col gap-4 p-0 md:pr-4 md:pl-4")}>
                {renderRole('mentor', 'Mentor', 'Translating your ambitions into action with expert advice!')}
                {renderRole('goalBuddy', 'Goal Buddy', 'Optimize your career path with a buddy who keeps you accountable!')}
                {renderRole('networking', 'Networking', 'Build friendships while building your career — you\'re not in this alone!')}
                <CardDescription 
                    className={cn("text-right text-black text-md m-0 -mt-3 cursor-pointer")}
                    onClick={() => filterGoalBuddies('')}>Clear All
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default Filter;