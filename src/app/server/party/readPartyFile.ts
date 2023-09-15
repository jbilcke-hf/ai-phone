import { promises as fs } from "node:fs"

import { Party } from "@/types"
import { locker } from "@/app/server/utils/locker"

export const readPartyFile = async (partyFilePath: string): Promise<Party> => {
  return locker<Party>(partyFilePath, async () => {
    const fileData = await fs.readFile(partyFilePath, 'utf8')
    return JSON.parse(fileData) as Party
  })
}
