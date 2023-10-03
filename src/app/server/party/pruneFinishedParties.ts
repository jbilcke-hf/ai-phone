"use server"

import { promises as fs } from "node:fs"
import path from "node:path"
import lockfile from "proper-lockfile"

import { partiesDirFilePath } from "@/app/server/config"

// this function is just for security:
// its purpose it to prune all finished parties from the file system
// it will be typically run at the beginning of the start sequence,
// that way we can clean things after a crash or reboot
export async function pruneFinishedParties() {
  for (const file of await fs.readdir(partiesDirFilePath)) {
    if (file.includes(".json")) {
      const filePath = path.join(partiesDirFilePath, file)
      try {
        const release = await lockfile.lock(filePath)
        await fs.unlink(filePath)
        await release()
      } catch (err) {
        console.error(`failed to unlink party file in ${filePath}: ${err}`)
      }
    }
  }
}