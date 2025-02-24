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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="flex flex-col items-center p-4 gap-2 w-[390px] h-[120] text-black rounded-md border-t border-t-black border-r-2 border-r-black border-b-2 border-b-black border-l border-l-black bg-white absolute left-36 top-1/2 transform -translate-y-1/2">
          <img className="w-[30px]" src={roleItem.icon} alt="mentor-icon" />
          <p className="font-semibold text-[20px]">{roleItem.role}</p>
          <p className="text-center text-[16px]">{roleItem.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
