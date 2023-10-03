"use server"

const token = `${process.env.HF_API_TOKEN || ""}`
const model = `${process.env.HF_INFERENCE_API_MODEL || ""}`
const url = `${
  process.env.HF_INFERENCE_ENDPOINT
  || `https://api-inference.huggingface.co/models/${model}`
}`

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
        inputs: [
          "photo",
          // "intricate details",
          prompt,
          "funny",
          "parody",
          "photographic",
          "photorealistic",
        ].join(", "),
        parameters: {
          num_inference_steps: 25,
          guidance_scale: 8,
          width: 1024,
          height: 768,
        },
        use_cache: false,
      }),
      cache: "no-store",
      // we can also use this (see https://vercel.com/blog/vercel-cache-api-nextjs-cache)
      // next: { revalidate: 1 }
    })


    // Recommendation: handle errors
    if (res.status !== 200) {
      const content = await res.text()
      console.error(content)
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const blob = await res.arrayBuffer()

    const contentType = res.headers.get('content-type')

    const assetUrl = `data:${contentType};base64,${Buffer.from(blob).toString('base64')}`

    return assetUrl

  } catch (err) {
    throw new Error(`failed to generate the image ${err}`)
  }
}