import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useEffect, useState } from 'react'
import getAllGoalBuddies from '../../../firebase/functions/goalBuddies'
import { GoalBuddy } from '@/types/types'


export function AppSidebar() {
  const [goalBuddiesArray, setGoalBuddiesArray] = useState<GoalBuddy[]>([])
  const [filteredGoalBuddies, setFilteredGoalBuddies] = useState<GoalBuddy[]>([])

  const filterGoalBuddies = async() => {
      const allGoalBuddies = await getAllGoalBuddies()
      setGoalBuddiesArray(allGoalBuddies)
  }

  useEffect(() => {
      filterGoalBuddies();
  }, [])

  const filterMentors = () => {
      const filtered = goalBuddiesArray.filter(goalBuddy => {
          return goalBuddy.isMentor === true
      })
      setFilteredGoalBuddies(filtered)
      console.clear()
      console.log(filteredGoalBuddies)
  }

  const filterAccountabilityPartners = () => {
      setGoalBuddiesArray(goalBuddiesArray.filter(goalBuddy => {
          return goalBuddy.isAccountabilityPartner
      }))
      console.clear();
      console.log(goalBuddiesArray)
  }

  const filterNetworking = () => {
      setGoalBuddiesArray(goalBuddiesArray.filter(goalBuddy => {
          return goalBuddy.isNetworking
      }))
      console.clear();
      console.log(goalBuddiesArray)
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <button onClick={() => {filterMentors()}}>Mentor</button>
              <button onClick={() => {filterAccountabilityPartners()}}>Goal Buddy</button>
              <button onClick={() => {filterNetworking()}}>Networking</button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
