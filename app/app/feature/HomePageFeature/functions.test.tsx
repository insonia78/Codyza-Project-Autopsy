import { setErrors } from '@/lib/features/homepageslice'

import { handleAnalyze, validateHomeForm } from './functions'

function createValue(overrides?: Partial<Record<'repositoryName' | 'githubToken' | 'aiApiKey' | 'aiModel', string>>) {
  return {
    repositoryNameRef: { current: { value: overrides?.repositoryName ?? '' } },
    githubTokenRef: { current: { value: overrides?.githubToken ?? '' } },
    aiApiKeyRef: { current: { value: overrides?.aiApiKey ?? '' } },
    aiModelRef: { current: { value: overrides?.aiModel ?? '' } },
  }
}

describe('validateHomeForm', () => {
  it('accepts a valid repository and AI settings', () => {
    expect(
      validateHomeForm({
        repositoryName: 'owner/repo',
        githubToken: 'ghp_1234567890',
        aiApiKey: 'apikey-12345',
        model: 'gpt-4o-mini',
      })
    ).toEqual([])
  })

  it('returns validation messages for invalid input', () => {
    expect(
      validateHomeForm({
        repositoryName: 'invalid repo',
        githubToken: 'short',
        aiApiKey: 'tiny',
        model: 'go',
      })
    ).toEqual([
      'Repository must be in "owner/repo" format or a github.com URL',
      'Token must be at least 10 characters',
      'AI API Key must be at least 10 characters',
      'Model must be at least 3 characters',
    ])
  })
})

describe('handleAnalyze', () => {
  it('dispatches field-specific errors when validation fails', () => {
    const preventDefault = vi.fn()
    const dispatch = vi.fn()

    const result = handleAnalyze(
      { preventDefault } as unknown as React.MouseEvent<HTMLButtonElement>,
      dispatch,
      createValue({ repositoryName: '', githubToken: 'short', aiApiKey: '', aiModel: 'go' })
    )

    expect(preventDefault).toHaveBeenCalledOnce()
    expect(result).toEqual([
      'Repository is required',
      'Repository must be in "owner/repo" format or a github.com URL',
      'Token must be at least 10 characters',
      'AI API Key is required',
      'Model must be at least 3 characters',
    ])
    expect(dispatch).toHaveBeenCalledWith(
      setErrors({
        repositoryName: 'Repository is required',
        githubToken: 'Token must be at least 10 characters',
        aiApiKey: 'AI API Key is required',
        aiModel: 'Model must be at least 3 characters',
      })
    )
  })

  it('clears errors when validation succeeds', () => {
    const preventDefault = vi.fn()
    const dispatch = vi.fn()

    const result = handleAnalyze(
      { preventDefault } as unknown as React.MouseEvent<HTMLButtonElement>,
      dispatch,
      createValue({
        repositoryName: 'owner/repo',
        githubToken: 'ghp_1234567890',
        aiApiKey: 'apikey-12345',
        aiModel: 'gpt-4o-mini',
      })
    )

    expect(preventDefault).toHaveBeenCalledOnce()
    expect(result).toEqual([])
    expect(dispatch).toHaveBeenCalledWith(
      setErrors({
        repositoryName: '',
        githubToken: '',
        aiApiKey: '',
        aiModel: '',
      })
    )
  })
})