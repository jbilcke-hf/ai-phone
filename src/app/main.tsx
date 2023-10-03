"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { paragraphFont } from "@/app/interface/fonts"
import { Join } from "@/app/interface/join"
import { Play } from "@/app/interface/play"

import { Results } from "./interface/results"
import { Background } from "./interface/background"
import { useStore } from "./store"

export function Main({ partyId: requestedPartyId }: { partyId?: string }) {
  const setParty = useStore(state => state.setParty)

  // this helps making sure everything is loaded properly in the client slide
  // otherwise there would be a risk of displaying outdated server-side data (eg. party id)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  useEffect(() => {
    if (loaded && requestedPartyId) {
      setParty({ partyId: requestedPartyId })
    }
  }, [requestedPartyId, loaded])

  if (!loaded) { return null }

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