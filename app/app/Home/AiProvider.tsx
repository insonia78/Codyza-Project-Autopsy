"use client"

import React, { createContext, useContext, useRef, useReducer } from 'react'

type AiContextValue = {
  aiApiKeyRef: React.RefObject<HTMLInputElement | null>
  aiModelRef: React.RefObject<HTMLInputElement | null>
  repositoryNameRef: React.RefObject<HTMLInputElement | null>
  githubTokenRef: React.RefObject<HTMLInputElement | null>
  reset: () => void
  state: AiState
  dispatch: React.Dispatch<AiAction>
}

type AiState = {
  aiApiKey: string
  aiModel: string
  repositoryName: string
  githubToken: string
}

type AiAction =
  | { type: 'set'; key: keyof AiState; value: string }
  | { type: 'reset' }

const initialState: AiState = {
  aiApiKey: '',
  aiModel: '',
  repositoryName: '',
  githubToken: '',
}

function reducer(state: AiState, action: AiAction): AiState {
  switch (action.type) {
    case 'set':
      return { ...state, [action.key]: action.value }
    case 'reset':
      return { ...initialState }
    default:
      return state
  }
}

const AiContext = createContext<AiContextValue | null>(null)

export function AiProvider({ children }: { children: React.ReactNode }) {
  const aiApiKeyRef = useRef<HTMLInputElement | null>(null)
  const aiModelRef = useRef<HTMLInputElement | null>(null)
  const repositoryNameRef = useRef<HTMLInputElement | null>(null)
  const githubTokenRef = useRef<HTMLInputElement | null>(null)

  const [state, dispatch] = useReducer(reducer, initialState)

  const reset = () => {
   
    if (aiApiKeyRef.current) aiApiKeyRef.current.value = ''
    if (aiModelRef.current) aiModelRef.current.value = ''
    if (repositoryNameRef.current) repositoryNameRef.current.value = ''
    if (githubTokenRef.current) githubTokenRef.current.value = '' 
    dispatch({ type: 'reset' })
  }

  const values = {
    aiApiKeyRef,
    aiModelRef,
    repositoryNameRef,
    githubTokenRef,
    reset,
    state,
    dispatch,
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
