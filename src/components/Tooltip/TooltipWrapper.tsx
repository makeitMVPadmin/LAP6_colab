import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TooltipWrapperProps {
  roleItem: Record<string, string>
  children: React.ReactNode
}

export function TooltipWrapper({ roleItem, children }: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={`flex flex-col items-center p-5 gap-2 w-[391px] h-[120] text-black 
          rounded-md border-t border-black border-r-2 border-b-2 border-l overflow-visible
          bg-white absolute left-[105px] -top-[47px] transition duration-200 fade-in-0`}>
          <svg className="absolute -left-[6px] top-[60px]" xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
            <path d="M2.5 10.831C-0.833337 8.90653 -0.833336 4.09528 2.5 2.17078L6.25 0.00571251V12.9961L2.5 10.831Z" fill="black"/>
          </svg>
          <img className="w-[30px]" src={roleItem.icon} alt="mentor-icon" />
          <p className="font-montserrat font-semibold text-[20px]">{roleItem.role}</p>
          <p className="font-montserrat font-normal text-center text-[16px]">{roleItem.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
