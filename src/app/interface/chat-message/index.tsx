import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { headingFont } from "../fonts"

export function ChatMessage({
  author = "Anon",
  avatar = "/images/mock-avatar.jpeg",
  children = null,
  side = "left"
}: {
  author?: string
  avatar?: string
  children?: ReactNode
  side?: "left" | "right"
}) {
  return (
    <div className={cn(
      `chat`,
      side === "right" ? "chat-end" : "chat-start"
    )}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full border-2 border-white/40">
          <img src={avatar} />
        </div>
      </div>
      <div className="chat-header">
        <div className={cn(
          `text-xl md:text-xl lg:text-2xl xl:text-2xl `,
          `font-semibold mb-1`,
          side === "right" ? "text-emerald-800" : "text-sky-800",
          headingFont.className
          )}>{author}</div>
      </div>
      <div className={cn(`chat-bubble`, 
      `text-lg md:text-lg lg:text-xl xl:text-xl`,
      side === "right" ? "chat-bubble-info" : "chat-bubble-success",
      "text-black/70"
      )}>{children}</div>
    </div>
  )
}