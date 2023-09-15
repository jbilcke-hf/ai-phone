"use client"

import { Moodie } from "moodie"

import { Player } from "@/types"

export function ChatAvatar({ player }: { player: Player }) {
  return (
    <div className="chat-image avatar">
      <div className="w-10 rounded-full border-2 border-white/40">
        <Moodie
          size={40}
          name={player.name}
          expression={{
            eye: player.avatar.eye,
            mouth: player.avatar.mouth
          }}
          colors={player.avatar.colors}
        />
      </div>
    </div>
  )
}