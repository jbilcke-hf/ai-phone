"use server"

import { promises as fs } from "node:fs"
import path from "node:path"
import lockfile from "proper-lockfile"

import { Party } from "@/types"
import { partiesDirFilePath } from "@/app/server/config"

import { createDirIfNeeded } from "@/app/server/utils/createDirIfNeeded"

export const writeParty = async (party: Party): Promise<Party> => {
  createDirIfNeeded(partiesDirFilePath)
  
  const fileName = `${party.partyId}.json`
  const filePath = path.join(partiesDirFilePath, fileName)
  // const release = await lockfile.lock(filePath)
  await fs.writeFile(filePath, JSON.stringify(party, null, 2), "utf8")
  // await release()
  return party
}