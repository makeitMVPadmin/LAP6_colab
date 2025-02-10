import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React, { useEffect } from 'react'
import { AvatarImage } from '@radix-ui/react-avatar'
import { getUserById } from '../../../firebase/functions/getUserById'
import { getGoalBuddyByUserId } from '../../../firebase/functions/getGoalBuddyByUserId'
import { GoalBuddy, User } from '@/types/types'
const items = [
  {
    title: 'My Profile',
    url: '#',
  },
  {
    title: 'NetWork',
    url: '#',
  },
  {
    title: 'Events',
    url: '#',
  },
]

export function AppSidebar() {
  const [userData, setUserData] = React.useState<User | []>()
  const [goalBuddyData, setgoalBuddyData] = React.useState<GoalBuddy | []>()
  useEffect(() => {
    const getUserData = async (userId: string) => {
      try {
        const response = await getUserById(userId)
        const response1 = await getGoalBuddyByUserId(userId)
        setUserData(response)
        setgoalBuddyData(response1)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }
    getUserData('2KvD8l1UXZJ9sBNjG2mm')
  }, [])

  return (
    <div className="w-[screen] h-screen flex justify-end  z-100">
      <div className="bg-black w-[250px] max-h-[80%] relative z-10 opacity-95">
        <Sidebar className="w-[200px] absolute h-[90%] top-[10%] bg-white rounded-xl shadow-md">
          <SidebarContent>
            <SidebarGroup className="items-center mt-2">
              <Avatar className="w-12 h-12 mt-2 mb-4">
                <AvatarFallback className="bg-[#B7D9B9]" />
                <AvatarImage
                  src={userData ? userData.profilePhoto : ''}
                  alt="@shadcn"
                />
              </Avatar>
              <div>
                {' '}
                {goalBuddyData && goalBuddyData.bio}
              </div>
              

              <SidebarGroupContent>
                <SidebarMenu className="mt-6 items-center">
                  {items.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="border w-[180px] rounded-full bg-white hover:bg-gray-200 transition duration-200 mb-4 shadow-lg border-0"
                    >
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <span className="">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  )
}
