import React, { useContext } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import CommunitiLogo from '../../assets/images/communiti.png'
import { SidebarContext } from '@/components/context/SidebarContext'
import { AppSidebar } from '../AppSidebar/AppSidebar'
import clsx from 'clsx'

const NavBar: React.FC = () => {
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
      // style={{ backgroundColor: '#AFACAC' }}
    >
      <div className="flex items-center justify-between w-full p-6">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center justify-end ">
          <img src={CommunitiLogo} alt="Communiti Logo" className="h-10" />
        </div>

        {/* Search and Avatar */}
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
