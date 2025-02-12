import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import CommunitiLogo from '../../assets/images/communiti.png'
import SearchIcon from '../../assets/images/Search Icon.svg'
import { FiMenu } from 'react-icons/fi'

const NavBar: React.FC = () => {
  return (
    <nav
      className="flex flex-col p-6 shadow-md h-30"
      style={{ backgroundColor: '#AFACAC' }}
    >
      <div className="flex items-center justify-between w-full ">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center justify-end space-x-5">
          <FiMenu viewBox="0 0 20 20" className="text-4xl" />
          <img src={CommunitiLogo} alt="Communiti Logo" className="h-10" />
        </div>

        {/* Search and Avatar */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-75"
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
      <div className="flex space-x-6 mt-4 ml-12">
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
