"use client"

import { cn } from "@/lib/utils"

import { paragraphFont } from "@/app/interface/fonts"

import { Join } from "@/app/interface/join"
import { Play } from "@/app/interface/play"
import { Results } from "./interface/results"
import { Background } from "./interface/background"


export function Main() {
  return (
    <div className={cn(
      `flex flex-col h-screen items-center justify-center`,
      `px-3 md:px-0`,
      paragraphFont.className
    )}>
      <Background />
      <Join />
      <Play />
      <Results />
    </div>
  )
}