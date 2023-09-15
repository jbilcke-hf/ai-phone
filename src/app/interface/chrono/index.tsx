import { cn } from "@/lib/utils"

export function Chrono() {
  const maxTime = 40
  const remainingTime = 25
  const remainingPercent = (remainingTime / maxTime) * 100


  return (
    <div
      className={cn(
        `fixed top-8 right-8`,
        `radial-progress text-primary-content border-4`,
        `bg-sky-600/30`,
        `border-sky-800/30`
      )}
      style={{
        "--value": remainingPercent
      } as any}
    >{
      remainingTime
    }s
    </div>
  )
}