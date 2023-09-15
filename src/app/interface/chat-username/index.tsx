"use client"

import { Player, playerColors } from "@/types"
import { cn } from "@/lib/utils"
import { headingFont } from "@/app/interface/fonts"

export function ChatUsername({ player }: { player: Player }) {

  return (
  <div className="chat-header">
    <div className={cn(
      `text-xl md:text-xl lg:text-2xl xl:text-2xl `,
      `font-semibold mb-1`,
      playerColors[player.color] || playerColors.stone,
      headingFont.className
      )}>{player.name}</div>
  </div>
  )
}