import { fireEvent, render, screen } from '@testing-library/react'

import { AiProvider, useAi } from './AiProvider'

function OrphanConsumer() {
  useAi()
  return null
}

function ProviderHarness() {
  const { aiApiKeyRef, aiModelRef, repositoryNameRef, githubTokenRef, state, dispatch, reset } = useAi()

  return (
    <div>
      <input aria-label="AI API Key" ref={aiApiKeyRef} />
      <input aria-label="AI Model" ref={aiModelRef} />
      <input aria-label="Repository Name" ref={repositoryNameRef} />
      <input aria-label="GitHub Token" ref={githubTokenRef} />
      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'set', key: 'aiApiKey', value: aiApiKeyRef.current?.value ?? '' })
          dispatch({ type: 'set', key: 'aiModel', value: aiModelRef.current?.value ?? '' })
          dispatch({ type: 'set', key: 'repositoryName', value: repositoryNameRef.current?.value ?? '' })
          dispatch({ type: 'set', key: 'githubToken', value: githubTokenRef.current?.value ?? '' })
        }}
      >
        Sync state
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <output data-testid="state">{JSON.stringify(state)}</output>
    </div>
  )
}

describe('AiProvider', () => {
  it('throws when useAi is used outside the provider', () => {
    expect(() => render(<OrphanConsumer />)).toThrow('useAi must be used within AiProvider')
  })

  it('resets refs and reducer state together', () => {
    render(
      <AiProvider>
        <ProviderHarness />
      </AiProvider>
    )

    const apiKey = screen.getByLabelText('AI API Key') as HTMLInputElement
    const model = screen.getByLabelText('AI Model') as HTMLInputElement
    const repository = screen.getByLabelText('Repository Name') as HTMLInputElement
    const token = screen.getByLabelText('GitHub Token') as HTMLInputElement

    fireEvent.change(apiKey, { target: { value: 'apikey-12345' } })
    fireEvent.change(model, { target: { value: 'gpt-4o-mini' } })
    fireEvent.change(repository, { target: { value: 'owner/repo' } })
    fireEvent.change(token, { target: { value: 'ghp_1234567890' } })
    fireEvent.click(screen.getByRole('button', { name: 'Sync state' }))

    expect(screen.getByTestId('state').textContent).toContain('owner/repo')
    expect(apiKey.value).toBe('apikey-12345')

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))

    expect(apiKey.value).toBe('')
    expect(model.value).toBe('')
    expect(repository.value).toBe('')
    expect(token.value).toBe('')
    expect(screen.getByTestId('state').textContent).toContain(
      JSON.stringify({ aiApiKey: '', aiModel: '', repositoryName: '', githubToken: '' })
    )
  })
})