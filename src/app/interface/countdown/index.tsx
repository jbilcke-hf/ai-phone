import { cn } from "@/lib/utils"

export function Countdown({
  remainingTimeInSec,
  progressPercent
}: {
  remainingTimeInSec: number,
  progressPercent: number
}) {
  return (
    <div
      className={cn(
        `fixed top-8 right-8`,
        `radial-progress text-primary-content border-4`,
        `transition-all duration-1000`,
        `bg-sky-600/30`,
        `border-sky-800/30`,
        progressPercent > 85
          ?  `text-red-400` :
        progressPercent > 70
          ?  `text-orange-300` :
          progressPercent > 55
          ?  `text-orange-200` :
        progressPercent > 40
          ?  `text-yellow-200` :
          `text-blue-100`

      )}
      style={{
        "--value": progressPercent
      } as any}
    >{
      remainingTimeInSec
    }s
    </div>
  )
}