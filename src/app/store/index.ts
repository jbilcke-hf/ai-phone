"use client"

import { create } from "zustand"

import { CurrentPanel, Message, Party } from "@/types"
import { newParty } from "./newParty"
import { newMessage } from "./newMessage"

export const useStore = create<{
  panel: CurrentPanel
  isLoading: boolean
  party: Party
  pendingMessage: Message
  setLoading: (isLoading: boolean) => void
  setPanel: (panel: CurrentPanel) => void
  setParty: (party: Party) => void
  setPendingMessage: (pendingMessage: Message) => void
}>((set, get) => ({
  panel: "join",
  pendingMessage: newMessage({}),
  isLoading: false,
  party: newParty({}),
  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  setPanel: (panel: CurrentPanel) => {
    set({ panel })
  },
  setParty: (party: Party) => {
    set({ party })
  },
  setPendingMessage: (pendingMessage: Message) => {
    set({ pendingMessage })
  }
}))
