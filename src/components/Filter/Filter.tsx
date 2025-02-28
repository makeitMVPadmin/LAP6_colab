import { Card, CardContent, CardDescription } from '../ui/card'
import { cn } from '../lib/utils'
import MentorBadge from './MentorBadge'
import GoalBuddyBadge from './GoalBuddyBadge'
import NetworkingBadge from './NetworkingBadge'
import { roleItems } from '@/utils/data'
import { TooltipWrapper } from '../Tooltip/TooltipWrapper'
import { useContext } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import useScreenWidth from '@/hooks/useScreenWidth'

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
  const screenWidth = useScreenWidth()

  const renderCheckbox = (filtered: boolean, role: string) => {
    return (
      <input
        type="checkbox"
        className={cn(
          `cursor-pointer appearance-none h-6 w-6 sm:self-center mb-1 sm:mb-0
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
        return (
          <MentorBadge
            width="w-6"
            stroke="2"
            yOffset={
              screenWidth === 'sm'
                ? 19
                : screenWidth === 'md'
                  ? 24
                  : screenWidth === 'lg'
                    ? 26
                    : screenWidth === 'xl'
                      ? 24
                      : 16
            }
          />
        )
      case 'accountability':
        return (
          <GoalBuddyBadge
            width="w-6"
            stroke="2"
            yOffset={
              screenWidth === 'sm'
                ? 23
                : screenWidth === 'md'
                  ? 18
                  : screenWidth === 'lg'
                    ? 19
                    : screenWidth === 'xl'
                      ? 19
                      : 23
            }
          />
        )
      case 'networking':
        return (
          <NetworkingBadge
            width="w-6"
            stroke="2"
            yOffset={
              screenWidth === 'sm'
                ? 21
                : screenWidth === 'md'
                  ? 20
                  : screenWidth === 'lg'
                    ? 20
                    : screenWidth === 'xl'
                      ? 20
                      : 23
            }
          />
        )
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
      <div className="flex flex-row relative sm:h-8 lg:mb-4 flex-grow justify-around items-end gap-1 lg:gap-5 sm:items-center">
        <TooltipWrapper roleItem={getRoleItem(roleName)}>
          <label
            className="lg:bg-card rounded-lg lg:border lg:border-r-2 lg:border-b-2 lg:border-black xs:w-[50px] sm:w-[120px] md:w-[194px] h-[100%] pl-2 
                    text-md lg:text-xl leading-5 sm:leading-[35px] relative
                    flex flex-col sm:flex-row justify-end md:justify-center lg:justify-start
                    "
          >
            <div className="flex flex-col items-center sm:flex-row lg:justify-start sm:justify-around sm:gap-2">
              {renderBadge(tag)}
              <span className="text-sm font-medium font-montserrat md:text-lg">
                {roleName}
              </span>
            </div>
          </label>
        </TooltipWrapper>
        {renderCheckbox(roleToFilter, tag)}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col lg:mt-3">
        <Card
          className={cn(
            `lg:w-68 mb-0 mt-0  pb-0 border rounded-[0.5rem] border-slate-950 border-r-2 border-b-2 lg:border-none shadow-none lg:bg-transparent

            ${isSidebarOpen ? ' fade-in-0 duration-200 opacity-50 bg-opacity-50' : ''}`,
          )}
        >
          <CardContent
            className={cn(
              'flex flex-row justify-between lg:flex-col py-1 px-1 md:pr-4 md:pl-4',
            )}
          >
            {renderRole('mentor', 'Mentor', filter.mentor)}
            {renderRole('accountability', 'Goal Buddy', filter.accountability)}
            {renderRole('networking', 'Networking', filter.networking)}
          </CardContent>
        </Card>
        <button
          onClick={() => filterGoalBuddies('')}
          className=" text-gray-800 text-sm font-montserrat font-medium  cursor-pointer w-max self-end mx-2"
        >
          Clear All
        </button>
      </div>
    </>
  )
}

export default Filter
