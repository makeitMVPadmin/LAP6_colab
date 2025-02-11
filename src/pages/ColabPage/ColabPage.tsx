import { SidebarContext } from '@/components/context/SidebarContext'
import GoalBuddyCard from '@/components/GoalBuddyCard/GoalBuddyCard'
import Layout from '@/components/Layout/Layout'

import { useContext } from 'react'

export default function ColabPage() {
  const { isSidebarOpen } = useContext(SidebarContext)
  return (
    <div className={isSidebarOpen ? 'bg-black bg-opacity-70' : ''}>
      <Layout>
        <div className="flex justify-center">
          <GoalBuddyCard goalBuddyList={[]} />
        </div>
      </Layout>
    </div>
  )
}
