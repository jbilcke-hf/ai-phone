import { promises as fs } from "node:fs"
import path from "node:path"

import { Party } from "@/types"
import { partiesDirFilePath } from "@/app/server/config"

import { locker } from "@/app/server/utils/locker"
import { createDirIfNeeded } from "@/app/server/utils/createDirIfNeeded"

export const saveParty = async (party: Party): Promise<Party> => {
  createDirIfNeeded(partiesDirFilePath)
  
  const fileName = `${party.partyId}.json`
  const filePath = path.join(partiesDirFilePath, fileName)
  return locker<Party>(filePath, async () => {
    await fs.writeFile(filePath, JSON.stringify(party, null, 2), "utf8")
    return party
  })
}