import { getRandomMessageId } from "@/lib/getRandomMessageId"
import { Message } from "@/types"

export function newMessage(message: Partial<Message> = {}): Message {
  return {
    id: getRandomMessageId(),
    playerId: "",
    type: "invented",
    input: "",
    output: "",
    ...message
  }
}