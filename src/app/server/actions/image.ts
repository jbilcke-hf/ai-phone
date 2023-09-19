"use server"

import { HfInference } from '@huggingface/inference'

const hf = new HfInference(`${process.env.HF_API_TOKEN || ""}`)
const hfi = hf.endpoint(`${process.env.HF_INFERENCE_ENDPOINT || ""}`)

export async function generateImage({ prompt }: { prompt: string }) {
  if (!prompt) {
    throw new Error(`prompt is too short!`)
  }

  try {
    console.log("calling hf.textToImage")
    const blob = await hfi.textToImage({
      inputs: [
        `beautiful photo of`,
       prompt,
        'award winning',
        'high resolution',
        'photo realistic',
        'intricate details',
      ].join(', '),

      // SDXL is also available, see:
      // https://ui.endpoints.huggingface.co/catalog
      // model: 'stabilityai/stable-diffusion-2-1',
      parameters: {
        negative_prompt: 'blurry, artificial, cropped, low quality, ugly',
      }
    })
    const buffer = Buffer.from(await blob.arrayBuffer())
    return `data:image/png;base64,${buffer.toString("base64")}`
  } catch (err) {
    console.error(`Error when generating the image: ${err}`);
    throw new Error(`failed to generate image: ${err}`)
  }
}