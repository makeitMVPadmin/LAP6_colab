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
      <div className="w-screen max-h-screen relative z-50">
        <Sidebar className="w-[250px] absolute h-[70%] top-[1%] right-7 rounded-xl shadow-md p-2 bg-white">
          
          <SidebarContent className="h-[40%] bg-yellow-600  gap-0">
          <button
            className={clsx('text-red-600 text-left pl-3')}
            onClick={() => setIsSideBarOpen(!isSidebarOpen)}
          >
            X
          </button>
            <SidebarGroup className="items-center mt-0">
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
                    className="border w-[180px] rounded-full bg-white hover:bg-gray-200 transition duration-200 shadow-lg border-0"
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
            </SidebarGroup>
          </SidebarContent>
          <div className='bg-blue-600 h-[50%]'></div>
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
