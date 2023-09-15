"use client"

import { useState } from "react"
import { useSpring, useTransition, config, animated } from "@react-spring/web"

import { cn } from "@/lib/utils"
import { headingFont } from "@/app/interface/fonts"
import { useStore } from "@/app/store"
import { Chrono } from "../chrono"

export function Play() {
  const pendingMessage = useStore(state => state.pendingMessage)

  const panel = useStore(state => state.panel)
  const [prompt, setPrompt] = useState("")
  const [isOverSubmitButton, setOverSubmitButton] = useState(false)

  const maxChars = 40

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

  return (
    <div className={cn(
      `fixed inset-0 w-screen h-screen`,
      `fixed inset-0 w-screen h-screen`,
      `flex flex-col items-center justify-center`,
      `transition-all duration-300 ease-in-out`,
      panel === "results" ? "opacity-1 translate-x-0" : "opacity-0 translate-x-[-1000px] pointer-events-none"
      )}>
      <Chrono />
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

            <div
              className={cn(
                `flex flex-col`,
                `space-y-3 md:space-y-6`,
                `items-center`,
              )}>
            </div>

            <div className={cn(
              `flex flex-col md:flex-row`,
              `space-y-3 md:space-y-0 md:space-x-3`,
              ` w-full max-w-[800px]`,
              `items-center justify-between`
            )}>
              <div className={cn(
                `flex flex-row flex-grow`
              )}>
                <input
                  type="text"
                  placeholder="Imagine a funny scene"
                  className={cn(
                    headingFont.className,
                    `w-full`,
                    `input input-bordered bg-sky-100/80 rounded-full`,
                    `text-sky-600 selection:bg-sky-200`,
                    `text-center`,
                    `text-2xl leading-10 px-6 h-16 pt-1`
                  )}
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                />
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
                  `bg-sky-500/80 hover:bg-sky-400/100 rounded-full`,
                  `text-center`,
                  `w-full`,
                  `text-2xl text-sky-50`,
                  `border border-sky-800/20`,
                  headingFont.className,
                  // `transition-all duration-300`,
                  // `hover:animate-bounce`
                )}
                onClick={() => {
            
                }}
                >
                I&apos;m done!
              </animated.button>
              </div>
            </div>


        </div>
      </div>
    </div>
  )
}
