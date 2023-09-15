"use client"

import { create } from "zustand"

import { GamePage, Team } from "@/types"

export const useStore = create<{
  page: GamePage
  isLoading: boolean
  teams: Team[]
  setLoading: (isLoading: boolean) => void
  setPage: (page: GamePage) => void
}>((set, get) => ({
  page: "starter",
  isLoading: false,
  teams: [
    {
      id: 1,
      name: "Chupacabras",
      color: "emerald",
      players: [
        "Julian",
        "Poli"
      ],
      score: 0,
    },
    {
      id: 2,
      name: "Samurais",
      color: "sky",
      players: [
        "Joshua",
        "Victor"
      ],
      score: 2
    }
  ],
  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  setPage: (page: GamePage) => {
    set({ page })
  },
}))
