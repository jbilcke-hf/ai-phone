import { Party, Player } from "@/types"

import { getParty } from "@/app/server/party/getParty"
import { saveParty } from "@/app/server/party/saveParty"
import { deleteParty } from "../party/deleteParty"

// 
export async function joinParty(partyId: string, player: Player) {
  let party: Party = {
    partyId,
    durationInMs: 5 * 60 * 1000,
    startedAt: "", // not started yet
    players: [],
    status: "waiting",
    messages: []
  }
  try {
    party = await getParty(partyId)
  } catch (err) {
    console.log("couldn't find an existing party, creating it..")
  }

  const alreadyPlaying = party.players.some(p => p.id !== player.id)

  if (alreadyPlaying) {
    return party
  }

  await saveParty({
    ...party,
    players: party.players.concat(player)
  })
}

export async function startParty(partyId: string) {
  let party: Party
  try {
    party = await getParty(partyId)
  } catch (err) {
    console.error(`couldn't start party ${partyId} (not found)`)
    throw new Error(`couldn't start party ${partyId} (not found)`)
  }

  if (!party) { return }

  if (party.status === "running") {
    console.error(`party is already running`)
    return party
  }

  if (party.status === "ended") {
    console.error(`party has already ended`)
    return party
  }

  try {
    await saveParty({
      ...party,
      startedAt: new Date().toISOString(),
      status: "running"
    })
  } catch (err) {
    console.error(`couldn't start party ${partyId} (${err})`)
    throw new Error(`couldn't start party ${partyId} (${err})`)
  }
}

// this is optional, since we are going to clear all parties from time to time anyway
export async function stopParty(partyId: string) {
  let party: Party
  try {
    party = await getParty(partyId)
  } catch (err) {
    console.error(`couldn't stop party ${partyId} (not found)`)
    throw new Error(`couldn't stop party ${partyId} (not found)`)
  }

  if (!party) { return }

  try {
    await deleteParty(party)
  } catch (err) {
    console.error(`couldn't delete party ${partyId} (${err})`)
    throw new Error(`couldn't delete party ${partyId} (${err})`)
  }
}

