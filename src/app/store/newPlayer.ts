"use client"

import { pick } from "@/lib/pick"
import { Avatar, GameColor, Player, colors, eyes, mouths } from "@/types"

let nbPlayers = 0
export function newPlayer(player: Partial<Player>): Player {
  return {
    id: `${nbPlayers++}`,
    name: "Anon",
    color: pick(colors) as GameColor,
    avatar: {
      ...player.avatar,
      eye: pick(eyes) as string,
      mouth: pick(mouths) as string,
      colors: ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
    } as Avatar,
    score: 0,
    ...player,
  }
}