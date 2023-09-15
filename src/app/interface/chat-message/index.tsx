"use client"

import { cn } from "@/lib/utils"
import { Message } from "@/types"
import { useStore } from "@/app/store"
import { ChatAvatar } from "@/app/interface/chat-avatar"
import { ChatUsername } from "@/app/interface/chat-username"

export function ChatMessage({
  message,
  side,
}: {
  message: Message
  side: "left" | "right"
}) {
  const players = useStore(state => state.party.players)
  const player = players.find(p => p.id === message.playerId)

  if (!player) { return null }

  return (
    <div className={cn(`chat`, side === "right" ? "chat-end" : "chat-start")}>
      <ChatAvatar player={player} />
      <ChatUsername player={player} />
      <div className={cn(`chat-bubble`, 
      `text-lg md:text-lg lg:text-xl xl:text-xl`,
      side === "right" ? "chat-bubble-info" : "chat-bubble-success",
      "text-black/70"
      )}>{message.type === "invented" ? message.input : message.output}</div>
    </div>
  )
}