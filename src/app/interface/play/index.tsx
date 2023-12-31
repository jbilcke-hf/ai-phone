"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useSpring, config, animated } from "@react-spring/web"

import { cn } from "@/lib/utils"
import { headingFont } from "@/app/interface/fonts"
import { useStore } from "@/app/store"
import { Countdown } from "../countdown"
import { useCountdown } from "@/lib/useCountdown"
import { useCharacterLimit } from "@/lib/useCharacterLimit"
import { generateImage } from "@/app/server/actions/image"
import { getParty, solveChallenge } from "@/app/server/actions/party"
import {  Party } from "@/types"

export function Play() {
  const [_isPending, startTransition] = useTransition()
  const intervalRef = useRef<NodeJS.Timeout>()

  const panel = useStore(state => state.panel)
  const setPanel = useStore(state => state.setPanel)
  const party = useStore(state => state.party)
  const setParty = useStore(state => state.setParty)
  const player = useStore(state => state.player)
        
  const nextChallenge = party.challenges.filter(c => !c.solved).find(challenge => challenge.toPlayer === player.id)

  const [isLocked, setLocked] = useState(false)
  const [promptDraft, setPromptDraft] = useState("")
  const [isOverSubmitButton, setOverSubmitButton] = useState(false)
  const { progressPercent, remainingTimeInSec } = useCountdown({
    timerId: "game-1", // everytime we change this, the timer will reset
    durationInSec: 45,
    onEnd: () => {
      console.log("End of turn!")
      setLocked(true)
    }
  })

  const partyRef = useRef<Party>(party)
  useEffect(() => { partyRef.current = party }, [JSON.stringify(party)])

  const { shouldWarn, colorClass, nbCharsUsed, nbCharsLimits } = useCharacterLimit({
    value: promptDraft,
    nbCharsLimits: 50,
    warnBelow: 15,
  })

  const submitButtonBouncer = useSpring({
    transform: isOverSubmitButton
      ? 'scale(1.05)'
      : 'scale(1.0)',
    boxShadow: isOverSubmitButton 
      ? `0px 5px 15px 0px rgba(0, 0, 0, 0.05)`
      : `0px 0px 0px 0px rgba(0, 0, 0, 0.05)`,
    loop: true,
    config: {
      tension: 300,
      friction: 10,
    },
  })

  const handleSubmit = () => {
    console.log("handleSubmit:", { isLocked, promptDraft })
    if (isLocked) { return }
    if (!promptDraft) { return }
    setLocked(true)
    startTransition(async () => {
      try {
        console.log("starting transition, calling generateImage")

        // note: the user won't see their on image - it's on purpose!
        const newAssetUrl = await generateImage({ prompt: promptDraft })
  
        const updatedParty = await solveChallenge({
          partyId: party.partyId,
          existingChallengeId: nextChallenge?.id,
          nextChallenge: {
            fromPlayer: player.id,
            assetUrl: newAssetUrl,
            prompt: promptDraft,
          }
        })
        setParty(updatedParty)
        // then we wait to receive a new challenge before unlocking

        // setPanel("results")
      } catch (err) {
        console.error(err)
      } finally {
        // setLocked(false)
      }
    })
  }

  useEffect(() => {
    console.log("next challenge for us:", nextChallenge)
    setPromptDraft("")
    setLocked(false)
  }, [nextChallenge?.assetUrl])

  useEffect(() => {
    if (party.status === "ended") {
      clearInterval(intervalRef.current)
      setPanel("results")
    }
  }, [party.status])

  const mainLoop = () => {
    startTransition(async () => {
      const state = useStore.getState()
      setParty(await getParty(state.party.partyId))
    })
  }
  
  useEffect(() => {
    // console.log("starting loop")
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(mainLoop, 2000)

    return () => {
      console.log("ending loop")
      clearInterval(intervalRef.current)
    }
  }, [])


  return (
    <div className={cn(
      `fixed inset-0 w-screen h-screen`,
      `flex flex-col items-center justify-center`,
      `transition-all duration-300 ease-in-out`,
      panel === "play" ? "opacity-1 translate-x-0" : "opacity-0 translate-x-[-1000px] pointer-events-none"
      )}>
      <Countdown
        progressPercent={progressPercent}
        remainingTimeInSec={remainingTimeInSec}
      />
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

            {nextChallenge?.assetUrl ? <div
              className={cn(
                `flex flex-col`,
                `space-y-3 md:space-y-6`,
                `items-center`,
              )}>
                <img
                  src={nextChallenge.assetUrl}
                  className={cn(
                    `w-[512px] object-cover`,
                    `rounded-2xl`
                    )}
                />
            </div> : null}

            <div className={cn(
              `flex flex-col md:flex-row`,
              `space-y-3 md:space-y-0 md:space-x-3`,
              ` w-full max-w-[1024px]`,
              `items-center justify-between`
            )}>
              <div className={cn(
                `flex flex-row flex-grow`
              )}>
                <input
                  type="text"
                  placeholder={nextChallenge?.assetUrl ? `What do you see?` : `Imagine a funny scene`}
                  className={cn(
                    headingFont.className,
                    `w-full`,
                    `input input-bordered rounded-full`,
                    `transition-all duration-300 ease-in-out`,
         
                    `disabled:bg-sky-100 disabled:text-sky-500 disabled:border-transparent`,
                    isLocked
                      ? `bg-sky-100 text-sky-500 border-transparent`
                      : `bg-sky-200 text-sky-600 selection:bg-sky-200`,
                    `text-left`,
                    `text-2xl leading-10 px-6 h-16 pt-1`
                  )}
                  value={promptDraft}
                  onChange={e => setPromptDraft(e.target.value)}
                  onKeyDown={({ key }) => {
                    if (key === 'Enter') {
                     if (!isLocked) {
                        handleSubmit()
                     }
                    }
                  }}
                  disabled={isLocked}
                />
                <div className={cn(
                  `flex flew-row ml-[-64px] items-center`,
                  `transition-all duration-300 ease-in-out`,
                  `text-lg`,
                  `bg-sky-200`,
                  `rounded-full`,
                  `text-right`,
                  `p-1`,
                  headingFont.className,
                  colorClass,
                  shouldWarn && !isLocked ? "opacity-100" : "opacity-0"
                )}>
                  <span>{nbCharsUsed}</span>
                  <span>&#47;</span>
                  <span>{nbCharsLimits}</span>
                </div>
              </div>
              <div className="flex flex-row w-52">
              <animated.button
                style={{
                  textShadow: "0px 0px 1px #000000ab",
                  ...submitButtonBouncer
                }}
                onMouseEnter={() => setOverSubmitButton(true)}
                onMouseLeave={() => setOverSubmitButton(false)}
                className={cn(
                  `px-6 py-3`,
                  `rounded-full`,
                  `transition-all duration-300 ease-in-out`,
                  isLocked
                    ? `bg-orange-500/20  border-orange-800/10`
                    : `bg-sky-500/80 hover:bg-sky-400/100  border-sky-800/20`,
                  `text-center`,
                  `w-full`,
                  `text-2xl text-sky-50`,
                  `border`,
                  headingFont.className,
                  // `transition-all duration-300`,
                  // `hover:animate-bounce`
                )}
                disabled={isLocked}
                onClick={handleSubmit}
                >
                {isLocked ? "Generating.." : "Generate"}
              </animated.button>
              </div>
            </div>


        </div>
      </div>
    </div>
  )
}
