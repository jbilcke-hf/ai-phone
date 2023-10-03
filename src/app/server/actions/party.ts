"use server"
import { v4 as uuidv4 } from "uuid"

import { Party, Player } from "@/types"

import { readParty } from "@/app/server/party/readParty"
import { writeParty } from "@/app/server/party/writeParty"
import { deleteParty } from "@/app/server/party/deleteParty"
import { newPlayer } from "@/app/store/newPlayer"

// 
export async function joinParty(partyId: string, partialPlayer: Partial<Player>): Promise<{ party: Party, player: Player }> {
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

  const player = newPlayer(partialPlayer)
  const alreadyPlaying = party.players.some(p => p.id === player.id)

  console.log("newParty id: " + party.partyId)
  
  if (alreadyPlaying) {
    return { party, player }
  }

  const written = await writeParty({
    ...party,
    players: party.players.concat(player)
  })

  return { party: written, player }
}

export async function startParty(partyId: string) {
  let party: Party
  try {
    party = await readParty(partyId)
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
    await writeParty({
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
    party = await readParty(partyId)
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


export async function getParty(partyId: string) {
  let party: Party
  try {
    party = await readParty(partyId)

    return party
  } catch (err) {
    console.error(`couldn't get party ${partyId} (not found)`)
    throw new Error(`couldn't get party ${partyId} (not found)`)
  }

}