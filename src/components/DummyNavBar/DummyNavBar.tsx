import React, { useContext, useState } from 'react'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { AppSidebar } from '../AppSidebar/AppSidebar'
import { SidebarContext } from '../context/SidebarContext'
import clsx from 'clsx'

const DummyNavBar: React.FC = () => {
  const sibebarcontext = useContext(SidebarContext)
  if (!sibebarcontext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebaropen, setIsSideBarOpen } = sibebarcontext
  const handleClick = () => {
    setIsSideBarOpen(!isSidebaropen)
  }
  return (
    <div
      className={clsx( 
        'h-[120px] mb-4 bg-[#EEEEEE]',
        isSidebaropen && 'bg-black bg-opacity-70',
      )}
    >
      <div className="flex flex-row justify-between evenly h-2/4 p-2">
        <div className="w-3/12 h-4 ml-3 mt-6 mb-4 bg-[#757575]"></div>
        <Avatar className="w-12 h-12 mt-2 mr-2" onClick={handleClick}>
          <AvatarFallback className="bg-[#D9D9D9]" />
        </Avatar>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
        <div className="w-[15%] h-5 mt-[1.5%] bg-[#D9D9D9]"></div>
      </div>
      {isSidebaropen && <AppSidebar isOpen={isSidebaropen} />}
    </div>
  )
}

export default DummyNavBar
