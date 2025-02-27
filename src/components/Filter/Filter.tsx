import { Card, CardContent, CardDescription } from '../ui/card'
import { cn } from '../lib/utils'
import MentorBadge from './MentorBadge'
import GoalBuddyBadge from './GoalBuddyBadge'
import NetworkingBadge from './NetworkingBadge'
import { roleItems } from '@/utils/data'
import { TooltipWrapper } from '../Tooltip/TooltipWrapper'
import { useContext } from 'react'
import { SidebarContext } from '../context/SidebarContext'

interface filterProps {
  filterGoalBuddies: Function
  filter: {
    mentor: boolean
    accountability: boolean
    networking: boolean
  }
}

const Filter: React.FC<filterProps> = ({ filterGoalBuddies, filter }) => {
  const sidebarContext = useContext(SidebarContext)
  if (!sidebarContext) {
    throw new Error('Sidebar context not found')
  }
  const { isSidebarOpen } = sidebarContext

  const renderCheckbox = (filtered: boolean, role: string) => {
    return (
      <input
        type="checkbox"
        className={cn(
          `cursor-pointer appearance-none h-6 w-6 self-center ml-[22px] mt-1 
          rounded-sm border-[3px] border-black hidden lg:inline 
          ${filtered ? 'bg-black' : 'bg-white'}
          ${isSidebarOpen ? ' fade-in-0 duration-200 bg-opacity-50' : ''}`,
        )}
        onClick={() => {
          filterGoalBuddies(role)
        }}
      />
    )
  }

  const renderBadge = (tag: string) => {
    switch (tag) {
      case 'mentor':
        return <MentorBadge width="w-8" stroke="2" />
      case 'accountability':
        return <GoalBuddyBadge width="w-8" stroke="2" />
      case 'networking':
        return <NetworkingBadge width="w-8" stroke="2" />
    }
  }

  const getRoleItem = (role: string): Record<string, string> => {
    return (
      roleItems.find((item) => item.role === role) || {
        icon: '',
        role: 'Unknown',
        description: 'Role not found',
      }
    )
  }

  const renderRole = (tag: string, roleName: string, roleToFilter: boolean) => {
    return (
      <div className="flex flex-row justify-between relative h-8">
        <TooltipWrapper roleItem={getRoleItem(roleName)}>
          <label
            className="bg-card rounded-lg border border-r-2 border-b-2 border-black w-[160px] sm:w-[194px] h-[35px] pl-2 
                    text-xl leading-[35px] relative font-montserrat font-medium"
          >
            {renderBadge(tag)} {roleName}
          </label>
        </TooltipWrapper>
        {renderCheckbox(roleToFilter, tag)}
      </div>
    )
  }

  return (
    <Card
      className={cn(
        `lg:w-68 h-16 lg:h-44 mt-4 ml-4 pb-0 border-none shadow-none bg-transparent

        ${isSidebarOpen ? ' fade-in-0 duration-200 opacity-50 bg-opacity-50' : ''}`,
      )}
    >
      <CardContent
        className={cn(
          'flex flex-row justify-between lg:flex-col gap-4 p-0 md:pr-4 md:pl-4',
        )}
      >
        <div className="block"></div>
        {renderRole('mentor', 'Mentor', filter.mentor)}
        {renderRole('accountability', 'Goal Buddy', filter.accountability)}
        {renderRole('networking', 'Networking', filter.networking)}
      </CardContent>
      <CardDescription
        className={cn(
          'text-right text-gray-800 text-base font-montserrat font-medium mr-4 mt-3 cursor-pointer',
        )}
        onClick={() => filterGoalBuddies('')}
      >
        Clear All
      </CardDescription>
    </Card>
  )
}

export default Filter
