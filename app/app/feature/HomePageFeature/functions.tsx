'use client'
import { setRepositoryName, setGitHubToken } from '@/lib/features/homepageslice';
import schema from './validator'

export function handleAnalyze(
  e: React.FormEvent | React.MouseEvent<HTMLButtonElement>,
  dispatch: any,
  repositoryNameRef: any,
  githubTokenRef: any
) {
  e.preventDefault()

    const repositoryName = repositoryNameRef?.current?.value ?? ''
    const githubToken = githubTokenRef?.current?.value ?? ''

    const errors = validateHomeForm({ repositoryName, githubToken })
    if (errors.length > 0) {
         return errors
    }

    dispatch(setRepositoryName(repositoryName))
    dispatch(setGitHubToken(githubToken))
    return []
}

function validateHomeForm(values: { repositoryName?: string; githubToken?: string | null }) {
  try {
    schema.validateSync(values, { abortEarly: false })
    return [] as string[]
  } catch (err: any) {
    if (err && Array.isArray(err.inner) && err.inner.length > 0) {
      const msgs = err.inner.map((e: any) => e.message).filter(Boolean)
      return Array.from(new Set(msgs))
    }
    return [err?.message || 'Validation failed']
  }
}