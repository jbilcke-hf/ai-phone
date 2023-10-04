"use client"

import { cn } from "@/lib/utils"
import { Challenge } from "@/types"
import { useStore } from "@/app/store"
import { ChatAvatar } from "@/app/interface/chat-avatar"
import { ChatUsername } from "@/app/interface/chat-username"

export function ChallengeChatItem({
  challenge,
  side,
}: {
  challenge: Challenge
  side: "left" | "right"
}) {
  const players = useStore(state => state.party.players)
  const fromPlayer = players.find(p => p.id === challenge.fromPlayer)

  if (!fromPlayer) { return null }

  return (
    <>
      {challenge.assetUrl ? <div className={cn(`chat`, side === "right" ? "chat-end" : "chat-start")}>
        <ChatAvatar player={fromPlayer} />
        <ChatUsername player={fromPlayer} />
        <div className={cn(`chat-bubble`, 
        `text-lg md:text-lg lg:text-xl xl:text-xl`,
        side === "right" ? "chat-bubble-info" : "chat-bubble-success",
        "text-black/70"
        )}>
          <img
            src={challenge.assetUrl}
            className={cn(
              `w-[512px] object-cover`,
              `rounded-2xl`
              )}
          />
          <div>Prompt: {challenge.prompt}</div>
        </div>
      </div> : null}
    </>
  )
}