"use client"

import { customAlphabet } from "nanoid"
import { useEffect, useState } from "react"

const nanoid = customAlphabet([
  '1234567890',
  'abcdefghijklmnopqrstuvwxyz',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
].join(''), 10)

export function useRandomPartyId() {
  const [id, setId] = useState("")
  useEffect(() => {
    const num = Math.round(Math.random() * 99)
    const newId = `${nanoid(2)}${num}${nanoid(2)}`
    setId(newId)
  }, [])
  return id
}