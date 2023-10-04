"use server"

import { Challenge, Party, Player } from "@/types"

import { readParty } from "@/app/server/party/readParty"
import { writeParty } from "@/app/server/party/writeParty"
import { deleteParty } from "@/app/server/party/deleteParty"
import { newPlayer } from "@/app/store/newPlayer"
import { newChallenge } from "@/app/store/newChallenge"
import { pick } from "@/lib/pick"

// 
export async function joinParty(partyId: string, partialPlayer: Partial<Player>): Promise<{ party: Party, player: Player }> {
  let party: Party = {
    partyId,
    durationInMs: 5 * 60 * 1000,
    startedAt: "", // not started yet
    players: [],
    status: "waiting",
    challenges: []
  }
  try {
    party = await getParty(partyId)
  } catch (err) {
    console.log(`couldn't find an existing party ${partyId}, creating it..`)
  }

  const player = newPlayer(partialPlayer)
  const alreadyPlaying = party.players.some(p => p.id === player.id)

  console.log("newParty id: " + party.partyId)
  
  if (alreadyPlaying) {
    console.log(`player ${player.id} is already playing`)
    return { party, player }
  }

  console.log("writting a new party:", JSON.stringify(party, null, 2))
  const written = await writeParty({
    ...party,
    players: party.players.concat(player)
  })

  console.log("written a new party:", JSON.stringify(written, null, 2))
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

    // make sure we don't reveal the prompts until the very end
    const isEnded = party.status === "ended"
    if (!isEnded) {
      party.challenges = party.challenges.map(c => ({ ...c, prompt: "" }))
    }

    return party
  } catch (err) {
    console.error(`couldn't get party ${partyId} (not found)`)
    throw new Error(`couldn't get party ${partyId} (not found)`)
  }

}

export async function solveChallenge({
  partyId,
  existingChallengeId,
  nextChallenge
}: {
  partyId: string
  existingChallengeId?: string
   nextChallenge: Partial<Challenge>
}): Promise<Party> {
  let party: Party
  try {
    party = await readParty(partyId)

    // mark the challenge as done
    party.challenges = party.challenges.map(c => ({
      ...c,
      solved: c.id === existingChallengeId ? true : c.solved,
    }))

    const tmpChallenge = newChallenge(nextChallenge)

    const otherPlayers = party.players.filter(p => p.id !== nextChallenge.fromPlayer).map(p => p.id)

    // TODO: pick someone who isn't already busy with messages
    const otherPlayer = pick(otherPlayers) || ""

    tmpChallenge.toPlayer = otherPlayer

    party.challenges.push(tmpChallenge)

    const newParty = await writeParty(party)

    return newParty
  } catch (err) {
    console.error(`couldn't get party ${partyId} (not found)`)
    throw new Error(`couldn't get party ${partyId} (not found)`)
  }

}