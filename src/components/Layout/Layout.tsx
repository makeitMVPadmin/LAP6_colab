import NavBar from '../NavBar/NavBar'
import { SidebarProvider } from '../ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <NavBar />

      {children}
    </SidebarProvider>
  )
}
