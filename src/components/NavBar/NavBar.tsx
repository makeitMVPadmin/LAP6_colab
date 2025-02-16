import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '../ui/avatar'
import CommunitiLogo from '../../assets/logo/Communiti Logo.png'
import { SidebarContext } from '@/components/context/SidebarContext'
import { AppSidebar } from '../AppSidebar/AppSidebar'
import clsx from 'clsx'

const NavBar: React.FC = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  const sideBarContext = useContext(SidebarContext)
  if (!sideBarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen, setIsSideBarOpen } = sideBarContext
  const handleClick = () => {
    setIsSideBarOpen(!isSidebarOpen)
  }
  return (
    <nav
      className={clsx(
        'flex flex-col mb-2 shadow-md h-[100px]',
        isSidebarOpen && 'z-0',
      )}
    >
      <div className="flex items-center justify-between w-full p-6">
        {/* Communiti Logo (navigation to ColabPage.tsx) */}
        <div
          className="flex items-center justify-end"
          onClick={handleLogoClick}
        >
          <img src={CommunitiLogo} alt="Communiti Logo" className="h-10" />
        </div>

        {/*Avatar (opens profile sidebar) */}
        <div className="flex items-center">
          <Avatar className="w-10 h-10 cursor-pointer" onClick={handleClick}>
            <AvatarFallback className="bg-gray-200"></AvatarFallback>
          </Avatar>
        </div>
      </div>

      {isSidebarOpen && <AppSidebar />}
    </nav>
  )
}

export default NavBar
