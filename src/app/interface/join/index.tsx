"use client"

import QRCode from "react-qr-code"
import { useSpring, config, animated } from "@react-spring/web"

import { cn } from "@/lib/utils"
import { headingFont } from "@/app/interface/fonts"
import { useEffect, useState, useTransition } from "react"
import { useRandomName } from "@/lib/useRandomName"
import { useStore } from "@/app/store"
import { joinParty } from "@/app/server/actions/party"

export function Join() {

  const panel = useStore(state => state.panel)
  const setPanel = useStore(state => state.setPanel)
  const setParty = useStore(state => state.setParty)
  const setPlayer = useStore(state => state.setPlayer)

  const [_isPending, startTransition] = useTransition()

  const party = useStore(state => state.party)
  const [isLoading, setLoading] = useState(false)
  const [name, setName] = useState("")

  const autoGeneratedName = useRandomName()
  useEffect(() => {
    if (autoGeneratedName) { setName(autoGeneratedName) }
  }, [autoGeneratedName])

  const [isOverName, setOverName] = useState(false)
  const nameBouncer = useSpring({
    y: isOverName ? 12 : -4,
    loop: true,
    config: {
      tension: 100,
      friction: 5,
    },

  })

  const [isOverPartyId, setOverPartyId] = useState(false)
  const partyIdBouncer = useSpring({
    y: isOverPartyId ? 12 : -4,
    loop: true,
    config: {
      tension: 100,
      friction: 10,
    },
  })

  const [isOverStartButton, setOverStartButton] = useState(false)
  const startButtonBouncer = useSpring({
    transform: isOverStartButton
      ? 'scale(1.1)'
      : 'scale(1.0)',
    boxShadow: isOverStartButton 
      ? `0px 5px 15px 0px rgba(0, 0, 0, 0.05)`
      : `0px 0px 0px 0px rgba(0, 0, 0, 0.05)`,
    loop: true,
    config: {
      tension: 300,
      friction: 10,
    },
  })

  const canPlay = name && party.partyId && !isLoading

  const handlePlay = () => {
    if (isLoading) { return }
    setLoading(true)
    startTransition(async () => {
      try {
        const newData = await joinParty(party.partyId, { name })
        console.log("newData:", newData)

        window.history.pushState(
          {},
          `AI Telephone Game 🤗 (party: ${party.partyId})`,
          `/party/${party.partyId}`
        )

        setParty(newData.party)
        setPlayer(newData.player)
        setPanel("play")
      } catch (err) {
        console.log(`failed to join a party: ${err}`)
      } finally {
        setLoading(false)
      }
    })
  }

  return (
    <div className={cn(
      `fixed inset-0 w-screen h-screen`,
      `flex flex-col items-center justify-center`,
      `transition-all duration-300 ease-in-out`,
      `px-3 md:px-0`,
      panel === "join" ? "opacity-1 translate-x-0" : "opacity-0 translate-x-[-1000px] pointer-events-none"
      )}>
      <div className={cn(
        `flex flex-col md:flex-row`,
        `w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl max-h-[80vh]`,
        `space-y-3 md:space-y-0 md:space-x-6`,
        `transition-all duration-300 ease-in-out`,

      )}>
        <div className={cn(
          `flex flex-col`,
          `flex-grow rounded-2xl md:rounded-3xl`,
          `backdrop-blur-lg bg-white/40`,
          `border-2 border-white/10`,
          `items-center`,
          `space-y-6 md:space-y-8 lg:space-y-12 xl:space-y-16`,
          `px-3 py-6 md:px-6 md:py-12 xl:px-8 xl:py-16`
        )}>
          <div className={cn(
            `flex flex-col md:flex-row`,
            `space-y-12 md:space-y-0 md:space-x-6`,
          )}>
            <div
              className={cn(
                `flex flex-col md:w-1/2`,
                `space-y-3 md:space-y-6`,
                `items-center justify-around`,
              )}>
              <div className={cn(
                `flex flex-col`,
                `space-y-3 md:space-y-6`,
                `items-center`
              )}>
                <animated.h3
                style={nameBouncer}
                  className={cn(
                    `text-4xl text-sky-700`,
                    headingFont.className
                  )}>Choose a name</animated.h3>
                <input
                  type="text"
                  placeholder="Enter a name"
                  className={cn(
                    headingFont.className,
                    `input input-bordered bg-sky-100/80 w-full max-w-sm rounded-full`,
                    `text-sky-600 selection:bg-sky-200`,
                    `text-center`,
                    `text-3xl leading-10 px-6 h-16 pt-1`
                  )}
                  value={name}
                  onMouseEnter={() => setOverName(true)}
                  onMouseLeave={() => setOverName(false)}
                  onChange={e => setName(e.target.value)}
                />
              </div> 
            </div>
            <div
              className={cn(
                `flex flex-col md:w-1/2`,
                `space-y-3 md:space-y-6`,
                `items-center`,
              )}>

                {/*
                <div className="w-full bg-white rounded-xl p-4 border-2 border-sky-950/40">
                  <QRCode
                    size={256}
                    className="h-auto max-w-full w-full"
                    value={partyId}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              */}
              <div className={cn(
                `flex flex-col`,
                `space-y-3 md:space-y-6`,
                `items-center`
              )}>
                <animated.h3
                style={partyIdBouncer}
                className={cn(
                  `text-4xl text-sky-700`,
                  headingFont.className
                )}>Join a party</animated.h3>
                <input
                  type="text"
                  placeholder="Party code"
                  className={cn(
                    headingFont.className,
                    `input input-bordered bg-sky-100/80 w-full max-w-sm rounded-full`,
                    `text-sky-600 selection:bg-sky-200`,
                    `text-center`,
                    `text-3xl leading-10 px-6 h-16 pt-1`
                  )}
                  value={party.partyId}
                  onMouseEnter={() => setOverPartyId(true)}
                  onMouseLeave={() => setOverPartyId(false)}
                  onChange={e => setParty({
                    partyId: e.target.value
                  })}
                />
              </div>
            </div>
          </div>

          <div>
            <animated.button
              style={{
                textShadow: "0px 0px 1px #000000ab",
                ...startButtonBouncer
              }}
              onMouseEnter={() => {
                if (canPlay) {
                  setOverStartButton(true)
                }
              }}
              onMouseLeave={() => setOverStartButton(false)}
              className={cn(
                `px-6 py-3`,
                `rounded-full`,
                `text-center`,
                `text-4xl`,
                canPlay
                  ? `bg-sky-500/80 hover:bg-sky-400/100 text-sky-50`
                  :  `bg-sky-500/50 hover:bg-sky-400/50 text-sky-50/80`,
                `border border-sky-800/20`,
                headingFont.className,
                // `transition-all duration-300`,
                // `hover:animate-bounce`
              )}
              onClick={() => {
                if (canPlay) {
                  handlePlay()
                }
              }}
              disabled={!canPlay}
              >
              Let&apos;s play!
            </animated.button>
          </div>
        </div>
      </div>
    </div>
  )
}