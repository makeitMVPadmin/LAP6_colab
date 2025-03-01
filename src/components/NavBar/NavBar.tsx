import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import CommunitiLogo from '../../assets/Logo/communiti_logo.png'
import { SidebarContext } from '@/components/context/SidebarContext'
import { AppSidebar } from '../AppSidebar/AppSidebar'
import clsx from 'clsx'
import { IdContext } from '../context/IdContext'
import UserProfileModal from '../Modal/UserProfileModal'


const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  const handleLogoClick = () => {
    navigate('/', { replace: true })
    window.location.reload()
  }
  const sideBarContext = useContext(SidebarContext)
  const idContext = useContext(IdContext)
  if (!sideBarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen, setIsSidebarOpen } = sideBarContext
  const userProfileData = idContext?.userData

  const userContext = useContext(IdContext)
  if (!userContext) {
    throw new Error('IdContext not found')
  }
  const { goalBuddyData, setGoalBuddyData } = userContext

  const sidebarContext = useContext(SidebarContext)
  if (!sidebarContext) {
    throw new Error('Sidebar context not found')
  }

  if (!userProfileData) {
    return null
  }
  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setModalOpen(false)
  }

  const handleProfileClick = (title: string) => {
    if (title === 'Profile') {
      setModalOpen(!modalOpen)
      setIsSidebarOpen(!isSidebarOpen)
    }
  }

  return (
    <nav
      className={clsx(
        'flex flex-col shadow-md h-[100px]',
        // isSidebarOpen && 'z-0',
      )}
    >
      <div className="flex items-center justify-between w-full p-6">
        <div
          className="flex items-center justify-end"
          onClick={handleLogoClick}
        >
          <img
            src={CommunitiLogo}
            alt="Communiti Logo"
            className="h-5 lg:h-10 md:h-7"
          />
        </div>

        {/*Avatar (opens profile sidebar) */}
        <div className="flex items-center">
          <Avatar
            className="h-7 w-7 md:w-10 md:h-10 cursor-pointer"
            onClick={handleClick}
          >
            <AvatarFallback className="bg-gray-200"></AvatarFallback>
            <AvatarImage
              className="w-full"
              src={userProfileData?.profilePhoto}
              alt="@shadcn"
            />
          </Avatar>
        </div>
      </div>

      {isSidebarOpen && <AppSidebar handleProfileClick={handleProfileClick} />}

      {modalOpen && (
        <UserProfileModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          goalBuddyData={goalBuddyData}
          updateGoalBuddyData={setGoalBuddyData}
        />
      )}
    </nav>
  )
}

export default NavBar
