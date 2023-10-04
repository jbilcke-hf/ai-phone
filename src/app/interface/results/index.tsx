import { cn } from "@/lib/utils"
import { Teams } from "@/app/interface/teams"
import { ChallengeChatItem } from "@/app/interface/challenge-chat-item"

import { useStore } from "@/app/store"

export function Results() {
  const panel = useStore(state => state.panel)
  const status = useStore(state => state.party.status)
  const players = useStore(state => state.party.players)
  const challenges = useStore(state => state.party.challenges)

  return (
    <div className={cn(
      `fixed inset-0 w-screen h-screen`,
      `flex flex-col items-center justify-center`,
      `transition-all duration-300 ease-in-out`,
      panel === "results" ? "opacity-1 translate-x-0" : "opacity-0 translate-x-[1000px] pointer-events-none"
    )}>
      <div className={cn(
        `flex flex-col md:flex-row`,
        `w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl max-h-[80vh]`,
        `space-y-3 md:space-y-0 md:space-x-6`,
      )}>
        <Teams />

        <div className={cn(
          `flex flex-col`,
          `flex-grow rounded-2xl md:rounded-3xl`,
          `backdrop-blur-lg bg-white/40`,
          `border-2 border-white/10`,
          `p-3 md:p-6 xl:p-8`
        )}>
          <div>
            {challenges.map((challenge, i) => (
              <ChallengeChatItem
                key={`${challenge.id}`}
                challenge={challenge}
                side={i % 2 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}