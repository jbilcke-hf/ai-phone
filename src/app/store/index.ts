"use client"

import { create } from "zustand"

import { CurrentPanel, Message, Party, Player } from "@/types"
import { newParty } from "./newParty"
import { newMessage } from "./newMessage"
import { newPlayer } from "./newPlayer"

export const useStore = create<{
  panel: CurrentPanel
  isLoading: boolean
  party: Party
  player: Player
  pendingMessage: Message
  setLoading: (isLoading: boolean) => void
  setPanel: (panel: CurrentPanel) => void
  setParty: (party: Party) => void
  setPlayer: (player: Player) => void
  setPendingMessage: (pendingMessage: Message) => void
  syncWithServer: () => void
}>((set, get) => ({
  panel: "join",
  pendingMessage: newMessage({}),
  isLoading: false,
  party: newParty({}),
  player: newPlayer({}),
  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  setPanel: (panel: CurrentPanel) => {
    set({ panel })
  },
  setParty: (party: Party) => {
    set({ party })
  },
  setPlayer: (player: Player) => {
    set({ player })
  },
  setPendingMessage: (pendingMessage: Message) => {
    set({ pendingMessage })
  },
  syncWithServer: () => {
  }
}))

