import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import CommunitiLogo from '../../assets/Logo/communiti_logo.png'
import { SidebarContext } from '@/components/context/SidebarContext'
import { AppSidebar } from '../AppSidebar/AppSidebar'
import clsx from 'clsx'
import { IdContext } from '../context/IdContext'

const NavBar: React.FC = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/', { replace: true })
    window.location.reload()
  }
  const sideBarContext = useContext(SidebarContext)
  const idContext = useContext(IdContext)
  if (!sideBarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen, setIsSideBarOpen } = sideBarContext
  const userProfileData = idContext?.userData

  if (!userProfileData) {
    return null
  }
  const handleClick = () => {
    setIsSideBarOpen(!isSidebarOpen)
  }
  return (
    <nav
      className={clsx(
        'flex flex-col shadow-md h-[100px]',
        isSidebarOpen && 'z-0',
      )}
    >
      <div className="flex items-center justify-between w-full p-6 h-full">
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

      {isSidebarOpen && <AppSidebar />}
    </nav>
  )
}

export default NavBar
