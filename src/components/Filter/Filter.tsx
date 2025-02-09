import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from "../lib/utils"
import { Button } from '../ui/button'

interface filterProps {
    filterGoalBuddies: Function,
    filtered: {
        mentor: boolean,
        accountability: boolean,
        networking: boolean
    }
}

const Filter: React.FC<filterProps> = ({ filterGoalBuddies, filtered }) => {
    const filterIndication = filtered.mentor 
        ? cn("font-light bg-black text-white") 
        : cn("font-light bg-white text-black")

    return (
        <Card className={cn("w-96 h-52")}>
            <CardHeader>
            <CardTitle className={cn("text-center text-l")}>Sort & Filter</CardTitle>
            </CardHeader>
            <CardContent className={cn("flex flex-col")}>
                <Button 
                    className={filterIndication} 
                    onClick={() => {filterGoalBuddies('mentor')}}>
                Mentors</Button>
                <Button 
                    className={filterIndication} 
                    onClick={() => {filterGoalBuddies('accountability')}}>
                Accountability Partners</Button>
                <Button 
                    className={filterIndication} 
                    onClick={() => {filterGoalBuddies('networking')}}>
                Networking</Button>
                </CardContent>
        </Card>
    )
}

export default Filter;