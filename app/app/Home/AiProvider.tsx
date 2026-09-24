"use client"

import React, { createContext, useContext, useRef } from 'react'

type AiContextValue = {
  aiApiKeyRef: React.RefObject<HTMLInputElement | null>
  aiModelRef: React.RefObject<HTMLInputElement | null>
  repositoryNameRef: React.RefObject<HTMLInputElement | null>
  githubTokenRef: React.RefObject<HTMLInputElement | null>
}

const AiContext = createContext<AiContextValue | null>(null)

export function AiProvider({ children }: { children: React.ReactNode }) {
  const values ={
        aiApiKeyRef: useRef<HTMLInputElement | null>(null),
        aiModelRef: useRef<HTMLInputElement | null>(null),
        repositoryNameRef: useRef<HTMLInputElement | null>(null),
        githubTokenRef: useRef<HTMLInputElement | null>(null), 
  }

  return (
    <AiContext.Provider value={values}>{children}</AiContext.Provider>
  )
}

export function useAi() {
  const ctx = useContext(AiContext)
  if (!ctx) throw new Error('useAi must be used within AiProvider')
  return ctx
}

export default AiProvider
