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
          `cursor-pointer appearance-none h-6 w-6 sm:self-center sm:ml-[22px] mt-1 
          rounded-sm border-[3px] border-black lg:inline 
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
      <div className="flex flex-row relative h-16 sm:h-8 lg:mb-4 flex-grow justify-around items-end">
        <TooltipWrapper roleItem={getRoleItem(roleName)}>
          <label
            className="xs:bg-transparent sm:bg-card rounded-lg sm:border sm:border-r-2 sm:border-b-2 sm:border-black xs:w-[50px] sm:w-[120px] md:w-[194px] h-[100%] pl-2 
                    text-md lg:text-xl leading-5 sm:leading-[35px] relative font-montserrat font-medium 
                    sm:block flex flex-col justify-end
                    "
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
        `lg:w-68 m-2 mt-4 sm:ml-4 pb-0 border sm:border-none shadow-none sm:bg-transparent

        ${isSidebarOpen ? ' fade-in-0 duration-200 opacity-50 bg-opacity-50' : ''}`,
      )}
    >
      <CardContent
        className={cn(
          'flex flex-row justify-between lg:flex-col p-0 md:pr-4 md:pl-4',
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
