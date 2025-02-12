import { Avatar } from "../ui/avatar"
import { AvatarImage } from "../ui/avatar"

export const UserProfile:React.FC=()=>{
    return(
        <div>
            <Avatar className="w-24 h-24 ml-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <h1>User Profile</h1>
            {/* Add User Profile components here */}
        </div>
    )
}