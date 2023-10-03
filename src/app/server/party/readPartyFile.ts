"use server"

import { promises as fs } from "node:fs"
import lockfile from "proper-lockfile"

import { Party } from "@/types"

export const readPartyFile = async (partyFilePath: string): Promise<Party> => {
  const release = await lockfile.lock(partyFilePath)
  const fileData = await fs.readFile(partyFilePath, 'utf8')
  await release()
  return JSON.parse(fileData) as Party
}
