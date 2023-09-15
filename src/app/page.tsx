"use server"

import Head from "next/head"

import { Main } from "./main"
import { cn } from "@/lib/utils"


// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts 

export default async function Page() {

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86" />
      </Head>
      <main className={cn(
        `light text-cyan-900`,
        `bg-gradient-to-r from-cyan-500 to-blue-400`,
        )}>
        <Main />
      </main>
    </>
  )
}