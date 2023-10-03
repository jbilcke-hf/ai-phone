"use server"

import path from "node:path"
import lockfile from "proper-lockfile"

import { Party } from "@/types"
import { partiesDirFilePath } from "@/app/server/config"
import { deleteFileIfExists } from "@/app/server/utils/deleteFileIfExists"
import { createDirIfNeeded } from "@/app/server/utils/createDirIfNeeded"

// deletes a party file in a relative safe way
export const deleteParty = async (party: Party) => {
  if (!party.partyId || party.partyId.length < 4) {
    throw new Error(`fatal error: partyId ${party.partyId} is invalid!`)
  }
  createDirIfNeeded(partiesDirFilePath)
  const filePath = path.join(partiesDirFilePath, `${party.partyId}.json`)

  const release = await lockfile.lock(filePath)
  await deleteFileIfExists(filePath)
  await release()
  return party
}
