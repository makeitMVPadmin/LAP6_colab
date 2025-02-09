//import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
    <Sidebar
      className={`absolute top-[120px]  w-[250px] bg-black shadow-lg`}
    >
      <SidebarContent className="h-[90%] bg-white w-[80%] absolute right-0 bottom-3 rounded-xl inset-shadow-md ring-2">
        <SidebarGroup className="items-center">
          <Avatar className="w-12 h-12 mt-2 mb-2">
            <AvatarFallback className="bg-[#D9D9D9]" />
          </Avatar>
          <div className="w-[60%] bg-[#757575] items-center h-[8px] mb-3"></div>
          <div className="w-[60%] bg-[#757575] items-center h-[8px]"></div>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 items-center">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="border w-[180px] rounded-full bg-white hover:bg-gray-200 transition duration-200 mb-4"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span className="">{item.title}</span>
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
