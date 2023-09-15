import { cn } from "@/lib/utils"
import { Teams } from "@/app/interface/teams"
import { ChatMessage } from "@/app/interface/chat-message"
import { Chrono } from "../chrono"
import { NewChallenge } from "../new-challenge"
import { useStore } from "@/app/store"

export function Game() {
  const page = useStore(state => state.page)

  return (
    <div className={cn(
      `fixed inset-0 w-screen h-screen`,
      `flex flex-col items-center justify-center`,
      `transition-all duration-300 ease-in-out`,
      page === "chat" ? "opacity-1 translate-x-0" : "opacity-0 translate-x-[1000px] pointer-events-none"
    )}>
      <div className={cn(
        `flex flex-col md:flex-row`,
        `w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl max-h-[80vh]`,
        `space-y-3 md:space-y-0 md:space-x-6`,
      )}>
        <Chrono />
        <Teams />

        <div className={cn(
          `flex flex-col`,
          `flex-grow rounded-2xl md:rounded-3xl`,
          `backdrop-blur-lg bg-white/40`,
          `border-2 border-white/10`,
          `p-3 md:p-6 xl:p-8`
        )}>
          <div>
          <ChatMessage author="Poli" side="left">
              A dog playing guitar and wearing sunglasses, drinking a mojito
            </ChatMessage>
            <ChatMessage author="Julian" side="right">
              Some cool response
            </ChatMessage>
            <ChatMessage author="Joshua" side="left">
              <NewChallenge />
            </ChatMessage>
            <ChatMessage author="Victor" side="right">
              A llama on top of a taxi inside tokyo
            </ChatMessage>
          </div>
        </div>
      </div>
    </div>
  )
}