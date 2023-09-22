"use server"

const token = `${process.env.HF_API_TOKEN || ""}`
const url = `${process.env.HF_INFERENCE_ENDPOINT || ""}`

export async function generateImage({ prompt }: { prompt: string }): Promise<string> {
  if (!prompt) {
    throw new Error(`prompt is too short!`)
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inputs: prompt
      }),
      cache: "no-store",
      // we can also use this (see https://vercel.com/blog/vercel-cache-api-nextjs-cache)
      // next: { revalidate: 1 }
    })


    // Recommendation: handle errors
    if (res.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    // the result is a JSON-encoded string
    const response = await res.json() as string
    return `data:image/png;base64,${response}`
  } catch (err) {
    throw new Error(`failed to generate the image ${err}`)
  }
}