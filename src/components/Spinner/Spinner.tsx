import { Loader2 } from "lucide-react";

export function Spinner() {
  return (
    <span className="flex-col items-center justify-center">
      <Loader2 className="animate-spin text-primary size-14" />
    </span>
  )
}
