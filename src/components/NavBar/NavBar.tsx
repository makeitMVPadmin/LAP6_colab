import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import CommunitiLogo from '../../assets/images/communiti.png'
import SearchIcon from '../../assets/images/Search Icon.svg'

const NavBar: React.FC = () => {
  return (
    <nav
      className="flex flex-col p-6 shadow-md h-30"
      style={{ backgroundColor: '#AFACAC' }}
    >
      {/* Top Row: Logo, Links, Search, and Avatar */}
      <div className="flex items-center justify-between w-full">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center space-x-5">
          <span className="text-3xl font-bold cursor-pointer">☰</span>
          <img src={CommunitiLogo} alt="communiti logo" className="h-10" />
        </div>

        {/* Search and Avatar */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-67"
            />
            <img
              src={SearchIcon}
              alt="Search Icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
            />
          </div>
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gray-200"></AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 mt-4">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Who We Are
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          What We Do
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Join the Community
        </a>
      </div>
    </nav>
  )
}

export default NavBar
