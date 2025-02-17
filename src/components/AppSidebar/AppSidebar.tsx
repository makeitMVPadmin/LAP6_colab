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
import React, { useContext, useEffect } from 'react'
import { AvatarImage } from '@radix-ui/react-avatar'
import { getUserById } from '../../../firebase/functions/getUserById'
import { getGoalBuddyByUserId } from '../../../firebase/functions/getGoalBuddyByUserId'
import { GoalBuddy, User } from '@/types/types'
import './AppSidebar.css'
import UserprofileModal from '../Modal/UserprofileModal'
import { IdContext } from '../context/IdContext'
import clsx from 'clsx'
import { SidebarContext } from '../context/SidebarContext'
const items = [
  {
    title: 'Profile',

  },
]

export function AppSidebar() {
  const [userData, setUserData] = React.useState<User | null>(null)
  const [goalBuddyData, setGoalBuddyData] = React.useState<GoalBuddy | null>(
    null,
  )
  const [modalOpen, setModalOpen] = React.useState(false)

  const context = useContext(IdContext)
  const userId = context?.userId
  const sidebarContext = useContext(SidebarContext)
  if (!sidebarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen, setIsSideBarOpen } = sidebarContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, goalBuddyResponse] = await Promise.all([
          getUserById(userId as string),
          getGoalBuddyByUserId(userId as string),
        ])
        setUserData(userResponse)
        setGoalBuddyData(goalBuddyResponse)
      } catch (error) {
        console.error('Failed to fetch data', error)
      }
    }
    fetchData()
  }, [userId])

  const handleClick = (title: string) => {
    if (title === 'Profile') setModalOpen(!modalOpen)
  }
  return (
    <>
      <div className="w-screen max-h-screen relative z-50">
        <Sidebar className="w-[25%] absolute  top-[1%] right-7 shadow-md border border-[2px] border-gray-600">
          <SidebarContent className="gap-0">
            <div className="h-[50%] bg-yellow-400">
              <button
                className={clsx(
                  'text-red-600 text-left pl-3 pt-1 font-semibold',
                )}
                onClick={() => setIsSideBarOpen(!isSidebarOpen)}
              >
                X
              </button>
              <SidebarGroup className="items-center mt-2 ">
                <Avatar className="w-20 h-20 mt-2 mb-2">
                  <AvatarFallback className="bg-[#B7D9B9]" />
                  <AvatarImage
                    className=" w-full"
                    src={userData ? userData.profilePhoto : ''}
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="text-lg font-bold">
                  {userData && (
                    <>
                      {userData.firstName} {userData.lastName}
                    </>
                  )}
                </div>
                <div> {userData?.discipline}</div>
                <div>
                  {goalBuddyData?.skills.map((skill) => <span>#{skill} </span>)}
                </div>
                <SidebarMenu className="mt-1 items-center">
                  {items.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="border mt-5 w-[80%] bg-white hover:bg-gray-200 transition rounded-md duration-200 shadow-lg border border-gray-600"
                    >
                      <SidebarMenuButton asChild>
                        <a onClick={() => handleClick(item.title)}>
                          <span >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </div>
            <div className="bg-blue-600 h-[50%]"></div>
          </SidebarContent>
        </Sidebar>
      </div>

      {modalOpen && (
        <UserprofileModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          userId={userId || ''}
        />
      )}
    </>
  )
}
