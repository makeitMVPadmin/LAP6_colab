import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TooltipWrapperProps {
  content: React.ReactNode
  children: React.ReactNode
}

export function TooltipWrapper({ content, children }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="text-black rounded-md border-t border-t-black border-r-2 border-r-black border-b-2 border-b-black border-l border-l-black bg-white absolute ml-36 top-1/2 transform -translate-y-1/2">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
