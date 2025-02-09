import { useEffect, useState } from 'react'
import getAllGoalBuddies from '../../../firebase/functions/goalBuddies'
import { GoalBuddy } from '@/types/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from "../lib/utils"
import { Button } from '../ui/button'

export default function Filter() {
    const [goalBuddiesArray, setGoalBuddiesArray] = useState<GoalBuddy[]>([])
    const [filteredGoalBuddies, setFilteredGoalBuddies] = useState<GoalBuddy[]>([])
    const [filterCount, setFilterCount] = useState(0);
    const [filtered, setFiltered] = useState({
        mentor: false,
        accountability: false,
        networking: false
    })

    const initGoalBuddies = async() => {
        const allGoalBuddies = await getAllGoalBuddies()
        setGoalBuddiesArray(allGoalBuddies)
    }

    useEffect(() => {
        initGoalBuddies()
        console.log(filterCount)
        if (filterCount === 0) setFilteredGoalBuddies([])
    }, [!goalBuddiesArray])

    const filterMentors = () => {
        setFilteredGoalBuddies(goalBuddiesArray.filter(goalBuddy => {
            return goalBuddy.isMentor === true
        }))
        setFiltered({...filtered, mentor: !filtered.mentor})
        setFilterCount(filtered.mentor 
            ? filterCount + 1
            : filterCount - 1)
    }

    const filterAccountabilityPartners = () => {
        setFilteredGoalBuddies(goalBuddiesArray.filter(goalBuddy => {
            return goalBuddy.isAccountabilityPartner
        }))
        setFiltered({...filtered, accountability: !filtered.accountability})
        setFilterCount(filtered.accountability 
            ? filterCount + 1
            : filterCount - 1)
    }

    const filterNetworking = () => {
        setFilteredGoalBuddies(goalBuddiesArray.filter(goalBuddy => {
            return goalBuddy.isNetworking
        }))
        setFiltered({...filtered, networking: !filtered.networking})
        setFilterCount(filtered.networking 
            ? filterCount + 1
            : filterCount - 1)
    }

    useEffect(() => {
        console.clear()
        console.log('All goal buddies', goalBuddiesArray)
        console.log('Filtered goal buddies', filteredGoalBuddies)
    }, [initGoalBuddies, filterMentors, filterAccountabilityPartners, filterNetworking])

    return (
        <Card className={cn("w-96")}>
            <CardHeader>
            <CardTitle className={cn("text-center text-l")}>Sort & Filter</CardTitle>
            </CardHeader>
            <CardContent className={cn("flex flex-col")}>
                <Button 
                    className={filtered.mentor 
                        ? cn("bg-black text-white") 
                        : cn("bg-white text-black")} 
                    onClick={() => {filterMentors()}}>Mentors</Button>
                <Button 
                    className={filtered.accountability 
                        ? cn("bg-black text-white") 
                        : cn("bg-white text-black")} 
                    onClick={() => {filterAccountabilityPartners()}}>Goal Buddies</Button>
                <Button 
                    className={filtered.networking 
                        ? cn("bg-black text-white") 
                        : cn("bg-white text-black")} 
                    onClick={() => {filterNetworking()}}>Networking</Button>
                </CardContent>
        </Card>
    )
}