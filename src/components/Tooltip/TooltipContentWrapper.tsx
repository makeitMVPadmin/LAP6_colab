interface TooltipContentWrapperProps {
  children: React.ReactNode // Accepts any JSX
  className?: string // Allow styling if needed
}

export function TooltipContentWrapper({
  children,
  className,
}: TooltipContentWrapperProps) {
  return (
    <div
      className={`flex flex-col items-center p-4 gap-2 w-[390px] h-[120]${className}`}
    >
      {children}
    </div>
  )
}
