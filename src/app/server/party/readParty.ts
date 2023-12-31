"use server"

import path from "node:path"

import { Party } from "@/types"
import { partiesDirFilePath } from "@/app/server/config"
import { readPartyFile } from "@/app/server/party/readPartyFile"
import { createDirIfNeeded } from "@/app/server/utils/createDirIfNeeded"

export const readParty = async (partyId: string): Promise<Party> => {

  createDirIfNeeded(partiesDirFilePath)
  
  const partyFileName = `${partyId}.json`
  const partyFilePath = path.join(partiesDirFilePath, partyFileName)

  try {
    const party = await readPartyFile(partyFilePath)
    return party
  } catch (err) {
    throw new Error(`couldn't find party ${partyId}`)
  }
}