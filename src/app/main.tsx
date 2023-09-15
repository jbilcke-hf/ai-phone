"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Snowfall from "react-snowfall"
import { AvatarGenerator } from "random-avatar-generator"

import { cn } from "@/lib/utils"

import { paragraphFont } from "@/app/interface/fonts"

import { useStore } from "@/app/store"
import { Starter } from "@/app/interface/starter"
import { useCanvasImage } from "@/lib/useCanvasImage"
import { Game } from "./interface/game"

 const generator = new AvatarGenerator()

export function Main() {
  const page = useStore(state => state.page)
  const [itsRainingFaces, makeItRain] = useState(false)
  const [nbFaces, setNbFaces] = useState(1)
  const nbFacesRef = useRef(0)

  const [sprite, setSprite] = useState<HTMLImageElement>()
  
  const [_isPending, startTransition] = useTransition()

  useEffect(() => {
    const newSprite = document.createElement('img')
    newSprite.src = "/images/sprite.png" // '/images/hf.png'
    setSprite(newSprite)
  }, [])

  // just to delay things a bit
  useEffect(() => {
    setTimeout(() => { makeItRain(true) }, 1000)
  }, [])

  // effect is more interesting if progressive
  useEffect(() => {
   let interval = setInterval(() => {
     // if (!itsRainingFaces) { return }
      if (nbFacesRef.current > 25) {
        clearInterval(interval)
      } else {
        setNbFaces(nbFacesRef.current += 1)
      }
    }, 1000)
  }, [])

  return (
    <div className={cn(
      `flex flex-col h-screen items-center justify-center`,
      `px-3 md:px-0`,
      paragraphFont.className
    )}>
      {itsRainingFaces && sprite ? <Snowfall
        // Applied to the canvas element.

        style={{
          background: 'transparent',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          transitionProperty: "color",
          transitionDuration: "2000ms",
          opacity: page === "starter" ? 1 : 0,
        }}
        radius={[10, 80]}
        speed={[2, 4]}
        wind={[1, 3.0]}
        // Controls the number of snowflakes that are created (defaults to 150).
        snowflakeCount={nbFaces}
        images={[sprite]}
      /> : null}
      <Starter />
      <Game />
    </div>
  )
}