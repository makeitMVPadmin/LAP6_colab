//import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

// Menu items.
const items = [
  {
    title: 'My Profile',
    url: '#',
  },
  {
    title: 'NetWork',
    url: '#',
  },
  {
    title: 'Events',
    url: '#',
  },
]

export function AppSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <Sidebar className="absolute top-40 h-[full] w-[250px] ">
      <SidebarContent className="h-[90%] bg-red-300 w-[80%] absolute right-0 bottom-0">
        <SidebarGroup className="items-center">
          <Avatar className="w-12 h-12 mt-2 mb-2">
            <AvatarFallback className="bg-[#D9D9D9]" />
          </Avatar>
          <div className="w-[60%] bg-[#757575] items-center h-[8px] mb-3"></div>
          <div className="w-[60%] bg-[#757575] items-center h-[8px]"></div>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 items-center">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
