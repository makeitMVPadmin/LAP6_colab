import { ReactNode, useState } from 'react'
import { createContext } from 'react'

interface SidebarType {
  isSidebarOpen: boolean
  setIsSideBarOpen: (isSidebarOpen: boolean) => void
}
export const SidebarContext = createContext<SidebarType | undefined>(undefined)
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false)
  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSideBarOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}
