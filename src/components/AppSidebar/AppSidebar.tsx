import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useContext, useState } from 'react'
import { AvatarImage } from '@radix-ui/react-avatar'
import './AppSidebar.css'
import UserProfileModal from '../Modal/UserProfileModal'
import { IdContext } from '../context/IdContext'
import clsx from 'clsx'
import { SidebarContext } from '../context/SidebarContext'
const items = [
  {
    title: 'Profile',
  },
]

export function AppSidebar() {
  const [modalOpen, setModalOpen] = useState(false)

  const userContext = useContext(IdContext)
  if (!userContext) {
    throw new Error('IdContext not found')
  }
  const { userData, goalBuddyData, setGoalBuddyData } = userContext

  const sidebarContext = useContext(SidebarContext)
  if (!sidebarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen, setIsSideBarOpen } = sidebarContext

  const handleClick = (title: string) => {
    if (title === 'Profile') {
   
      setModalOpen(!modalOpen)
  
    }
  }
 
  return (
    <>
      <div className="w-screen max-h-screen relative z-50">
        <Sidebar className="w-[20%] rounded-md absolute h-[70%] top-[1%] right-7 shadow-md border border-[2px] border-gray-600">
          <SidebarContent className="gap-0 rounded-md">
            <div className="h-[50%] bg-yellow">
              <button
                className={clsx('text-black text-left pl-3 pt-1 font-semibold')}
                onClick={() => setIsSideBarOpen(!isSidebarOpen)}
              >
                X
              </button>
              <SidebarGroup className="items-center mt-2 ">
                <Avatar className="w-20 h-20 mt-2 mb-2">
                  <AvatarFallback className="bg-[#B7D9B9]" />
                  <AvatarImage
                    className="w-full"
                    src={userData ? userData.profilePhoto : ''}
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="text-[20px] font-semibold font-fraunces">
                  {userData && (
                    <>
                      {userData.firstName} {userData.lastName}
                    </>
                  )}
                </div>
                <div className="text-sm font-medium font-montserrat">
                  {' '}
                  {userData?.discipline}
                </div>
                <div>
                  {goalBuddyData?.skills.map((skill, index) => (
                    <span
                      className="text-sm font-medium font-montserrat"
                      key={index}
                    >
                      #{skill}{' '}
                    </span>
                  ))}
                </div>
                <SidebarMenu className="mt-1 items-center">
                  {items.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="border mt-5 w-[80%] bg-white hover:bg-gray-200 transition rounded-md duration-200 shadow-lg border border-gray-600 border-r-2 border-b-2"
                    >
                      <SidebarMenuButton asChild>
                        <a onClick={() => handleClick(item.title)}>
                          <span className="text-sm font-medium font-montserrat">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </div>
            <div className="bg-blue h-[50%]"></div>
          </SidebarContent>
        </Sidebar>
      </div>

      {modalOpen && (
        <UserProfileModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          goalBuddyData={goalBuddyData}
          updateGoalBuddyData={setGoalBuddyData}
        />
      )}
    </>
  )
}
