import { lock } from "lockfile-light"

export async function locker<T>(filePath: string, fn: () => Promise<T>): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const lockPath = `${filePath}_lock`
    try {
      await lock(lockPath, {}, async () => {
        let t: T = undefined as any
        try {
          t = await fn()
        } catch (err) {
          reject(err)
        }
        if (!t) {
          reject(new Error(`failed to resolve the value`))
          return
        }

        resolve(t)
      })
    } catch (err) {
      reject(err)
    }
  })
}
