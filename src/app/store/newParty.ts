import { getRandomPartyId } from "@/lib/getRandomPartyId"
import { Party } from "@/types"
import { newPlayer } from "./newPlayer"
import { newMessage } from "./newMessage"

export function newParty(party: Partial<Party> = {}): Party {
  const randomPartyId = getRandomPartyId()
  console.log(`newParty called! randomPartyId = ${randomPartyId}`)
  return {
    partyId: getRandomPartyId(),
    durationInMs: 5 * 60 * 1000,
    startedAt: "", // ISO datetime
    status: "waiting",
    players: [
      newPlayer({
        name: "Julian",
      }),
      newPlayer({
        name: "Poli",
      }),
      newPlayer({
        name: "Joshua",
      }),
      newPlayer({
        name: "victor",
      })
    ],
    messages: [
      newMessage({ input: "hello" }),
      newMessage({ input: "hi" }),
      newMessage({ input: "what's up" }),
    ],
    ...party,
  }
}