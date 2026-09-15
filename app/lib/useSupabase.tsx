"use client"
import { useMemo } from 'react'
import getBrowserSupabase from './supabaseClient'

export function useSupabase() {
  return useMemo(() => getBrowserSupabase(), [])
}

export default useSupabase
