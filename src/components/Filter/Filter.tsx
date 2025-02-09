import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from "../lib/utils"
import { Button } from '../ui/button'

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
        <Card className={cn("w-96 h-52")}>
            <CardHeader>
            <CardTitle className={cn("text-center text-l")}>Sort & Filter</CardTitle>
            </CardHeader>
            <CardContent className={cn("flex flex-col")}>
                <Button 
                    className={filter.mentor 
                        ? cn("bg-black text-white") 
                        : cn("bg-white text-black")} 
                    onClick={() => {filterGoalBuddies('mentor')}}>Mentors</Button>
                <Button 
                    className={filter.accountability 
                        ? cn("bg-black text-white") 
                        : cn("bg-white text-black")} 
                    onClick={() => {filterGoalBuddies('accountability')}}>Goal Buddies</Button>
                <Button 
                    className={filter.networking 
                        ? cn("bg-black text-white") 
                        : cn("bg-white text-black")} 
                    onClick={() => {filterGoalBuddies('networking')}}>Networking</Button>
                </CardContent>
        </Card>
    )
}

export default Filter;