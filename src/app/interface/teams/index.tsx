import { cn } from "@/lib/utils"
import { Team, TeamColor } from "@/types"
import { useStore } from "@/app/store"

import { headingFont } from "../fonts"

export function Teams() {
  const teams = useStore(state => state.teams)
  
  const teamColors: Record<TeamColor, string> = {
    stone: "text-stone-700",
    red: "text-red-700",
    orange: "text-orange-700",
    amber: "text-amber-700",
    yellow: "text-yellow-700",
    lime: "text-lime-700",
    green: "text-green-700",
    emerald: "text-emerald-700",
    teal: "text-teal-700",
    cyan: "text-cyan-700",
    sky: "text-sky-700",
    blue: "text-blue-700",
    indigo: "text-indigo-700",
    violet: "text-violet-700",
    purple: "text-purple-700",
    fuchsia: "text-fuchsia-700",
    pink: "text-pink-700",
    rose: "text-rose-700",
  }

  // players have a deeper color
  const playerColors: Record<TeamColor, string> = {
    stone: "text-stone-800",
    red: "text-red-800",
    orange: "text-orange-800",
    amber: "text-amber-800",
    yellow: "text-yellow-800",
    lime: "text-lime-800",
    green: "text-green-800",
    emerald: "text-emerald-800",
    teal: "text-teal-800",
    cyan: "text-cyan-800",
    sky: "text-sky-800",
    blue: "text-blue-800",
    indigo: "text-indigo-800",
    violet: "text-violet-800",
    purple: "text-purple-800",
    fuchsia: "text-fuchsia-800",
    pink: "text-pink-800",
    rose: "text-rose-800",
  }

  return (
  <div className={cn(
    `flex flex-col`,
    `w-full md:w-64 rounded-2xl`,
    `backdrop-blur-xl bg-white/20`,
    `border-2 border-white/10`,
    ``
  )}>
    {teams.map(({ id, name, score, players, color }) => (
    <div
      key={id}
      className={cn(
        `flex md:flex-col`,
        `p-3 space-x-3 md:p-6 md:space-x-0 md:space-y-2`
      )}>
      <h2 className={cn(
        `text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold`,
         teamColors[color] || teamColors.stone,
        headingFont.className
      )}>{name}</h2>
      <h3 className={cn(
        `text-base md:text-lg lg:text-xl xl:text-xl font-bold pb-2`,
         teamColors[color] || teamColors.stone,
        headingFont.className
      )}>{score} points</h3>
      <div className={cn(
        `flex md:flex-col`,
        `space-x-3 md:space-x-0 md:space-y-4`
      )}>
        {players.map(player => (
          <div
            key={player}
            className={cn(
            `text-xl md:text-xl lg:text-2xl xl:text-2xl font-semibold`,
            playerColors[color] || playerColors.stone,
            headingFont.className
          )}>{player}</div>)
        )}
        </div>
      </div>
      ))}
    </div>
  )
}