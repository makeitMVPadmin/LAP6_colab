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
    if (title === 'My Profile') setModalOpen(!modalOpen)
  }

  return (
    <>
      <div className="w-screen max-h-screen relative overflow-hidden z-50">
        <Sidebar className="w-[250px] absolute h-[70%] top-[1%] bg-yellow-300 rounded-xl shadow-md p-2">
          <button
            className={clsx('text-red-600 text-left')}
            onClick={() => setIsSideBarOpen(!isSidebarOpen)}
          >
            X
          </button>
          <SidebarContent className="px-2">
            <SidebarGroup className="items-center mt-2">
              <Avatar className="w-12 h-12 mt-2 mb-4">
                <AvatarFallback className="bg-[#B7D9B9]" />
                <AvatarImage className=' w-full'
                  src={userData ? userData.profilePhoto : ''}
                  alt="@shadcn"
                />
              </Avatar>
              <div className="text-sm font-bold">
                {' '}
                {goalBuddyData ? (
                  goalBuddyData.bio
                ) : (
                  <p className="bg-gray-200 text-red-900 p-2 rounded-lg  motion-safe:animate-bounce ">
                    {' '}
                    Please provide a small bio of yours
                  </p>
                )}
              </div>

              <SidebarGroupContent>
                <SidebarMenu className="mt-6 items-center">
                  {items.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="border w-[180px] rounded-full bg-white hover:bg-gray-200 transition duration-200 mb-4 shadow-lg border-0"
                    >
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          onClick={() => handleClick(item.title)}
                        >
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
