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
import './AppSidebar.css'
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
  const [userData, setUserData] = React.useState<User | null>(null)
  const [goalBuddyData, setGoalBuddyData] = React.useState<GoalBuddy | null>(null)
  useEffect(() => {
    const getUserData = async (userId: string) => {
      try {
        const userResponse = await getUserById(userId)
        setUserData(userResponse)
   
      } catch (error) {
        console.error('Failed to fetch userData data:', error)
      }
    }
    const getGoalBuddyData = async (userId: string) => {
      try{
        const goalBuddyResponse=await getGoalBuddyByUserId(userId);
        setGoalBuddyData(goalBuddyResponse);
      }
      catch(error){
        console.error('Failed to fetch goalBuddy ',error)
    }
    }
    getUserData('1KL05hixbzlvikTNILWv')
    getGoalBuddyData('1KL05hixbzlvikTNILWv')
  }, [])

  return (
    <div className="w-[screen] h-screen flex justify-end z-90 ">
      <div className="bg-black w-[250px] max-h-[80%] relative overflow-hidden">
        <Sidebar className="w-[200px] absolute h-[90%] top-[10%] bg-white opacity-100 rounded-xl shadow-md">
          <SidebarContent className="px-2">
            <SidebarGroup className="items-center mt-2">
              <Avatar className="w-12 h-12 mt-2 mb-4">
                <AvatarFallback className="bg-[#B7D9B9]" />
                <AvatarImage
                  src={userData ? userData.profilePhoto : ''}
                  alt="@shadcn"
                />
              </Avatar>
              <div className="text-sm font-bold">
                {' '}
                {goalBuddyData? goalBuddyData.bio:<p className="bg-gray-200 text-red-900 p-2 rounded-lg  motion-safe:animate-bounce "> Please provide a small bio of yours</p>}
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
