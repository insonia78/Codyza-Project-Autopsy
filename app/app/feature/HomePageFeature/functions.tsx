'use client'
import { setErrors, setValue } from '@/lib/features/homepageslice';
import schema from './validator'

export function handleAnalyze(
    e: React.MouseEvent<HTMLButtonElement>,
    dispatch: any,
    value: any,
) {
    e.preventDefault()

    const repositoryName = value.repositoryName?.current?.value ?? ''
    const githubToken = value.githubToken?.current?.value ?? ''
    const aiApiKey = value.aiApiKey?.current?.value ?? ''
    const model = value.aiModel?.current?.value ?? ''
    const errors = validateHomeForm({ repositoryName, githubToken, aiApiKey, model })
    console.log(errors);
    if (errors.length > 0) {
        dispatch(setErrors({
          repositoryName: errors.find((e: string) => e.includes('Repository')),
          githubToken: errors.find((e: string) => e.includes('GitHub token')),
          aiApiKey: errors.find((e: string) => e.includes('AI API Key')),
          aiModel: errors.find((e: string) => e.includes('Model'))
        }))
         return errors
    }
    dispatch(setErrors({
          repositoryName: '',
          githubToken: '',
          aiApiKey: '',
          aiModel: ''
        }))
    return []
}

export function validateHomeForm(values: { repositoryName?: string; githubToken?: string | null; aiApiKey?: string; model?: string }) {
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