import { useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TooltipWrapperAdaptiveProps {
  roleItem: Record<string, string>
  children: React.ReactNode
}

export function TooltipWrapperAdaptive({
  roleItem,
  children,
}: TooltipWrapperAdaptiveProps) {
  const [open, setOpen] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={isTouchDevice ? open : undefined} onOpenChange={setOpen}>
        <TooltipTrigger
          asChild
          onClick={(e) => {
            if (isTouchDevice) {
              e.stopPropagation()
              setOpen((prev) => !prev)
            }
          }}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={`flex flex-col items-center p-5 pl-2 pr-2 gap-3 lg:gap-1 w-[135px] h-[255px] lg:w-[391px] lg:h-[120px] text-black 
          rounded-md border-t border-black border-r-2 border-b-2 border-l overflow-visible
          bg-white absolute top-[70px] sm:top-[60px] -left-[40px] lg:left-[105px] lg:-top-[47px] transition duration-200 fade-in-0`}
        >
          <svg
            className="absolute -top-[13px] lg:-left-[6px] lg:top-[60px] rotate-90 lg:rotate-0"
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
          >
            <path
              d="M2.5 10.831C-0.833337 8.90653 -0.833336 4.09528 2.5 2.17078L6.25 0.00571251V12.9961L2.5 10.831Z"
              fill="black"
            />
          </svg>
          <img className="w-[30px]" src={roleItem.icon} alt="mentor-icon" />
          <p className="font-montserrat font-semibold text-[20px]">
            {roleItem.role}
          </p>
          <p className="font-montserrat font-normal lg:text-center text-[16px]">
            {roleItem.description}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
