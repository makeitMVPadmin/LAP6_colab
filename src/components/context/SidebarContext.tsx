import { ReactNode, useState } from 'react'
import { createContext } from 'react'

interface SidebarType {
  isSidebaropen: boolean
  setIsSideBarOpen: (isSidebaropen: boolean) => void
}
export const SidebarContext = createContext<SidebarType>()
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebaropen, setIsSideBarOpen] = useState(false)
  return (
    <SidebarContext.Provider value={{ isSidebaropen, setIsSideBarOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}
