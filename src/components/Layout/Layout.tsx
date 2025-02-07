
import DummyNavBar from '../DummyNavBar/DummyNavBar'
import { SidebarProvider } from '../ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
         <DummyNavBar/>
      {children}
    </SidebarProvider>
  )
}
