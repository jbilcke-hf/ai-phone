"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { playerColors } from "@/types"
import { useStore } from "@/app/store"

import { headingFont } from "../fonts"

export function Teams() {
  const players = useStore(state => state.party.players)

  return (
  <div className={cn(
    `flex flex-col`,
    `w-full md:w-64 rounded-2xl`,
    `backdrop-blur-xl bg-white/20`,
    `border-2 border-white/10`,
    ``
  )}>
   <div
      className={cn(
        `flex md:flex-col`,
        `p-3 space-x-3 md:p-6 md:space-x-0 md:space-y-2`
      )}>
    {/*
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
            */}
      <div className={cn(
        `flex md:flex-col`,
        `space-x-3 md:space-x-0 md:space-y-4`
      )}>

        {players.map(player => (
          <div
            key={player.id}
            className={cn(
            `text-xl md:text-xl lg:text-2xl xl:text-2xl font-semibold`,
            playerColors[player.color] || playerColors.stone,
            headingFont.className
          )}>{player.name}</div>)
        )}
        </div>
      {/*
      </div>
      ))}
       */}
      </div>
    </div>
  )
}