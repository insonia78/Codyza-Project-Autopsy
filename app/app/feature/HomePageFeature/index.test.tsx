import { Provider } from 'react-redux'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { AiProvider } from '@/app/Home/AiProvider'
import AiTokenFieldsComponent from '@/app/components/AiTokenFieldsComponent'
import { makeStore } from '@/lib/store'

import { HomePageFeature } from './index'

const getRepoMock = vi.fn()

vi.mock('./server/actions', () => ({
  getRepo: (...args: unknown[]) => getRepoMock(...args),
}))

function renderFeature() {
  const store = makeStore()

  render(
    <Provider store={store}>
      <AiProvider>
        <AiTokenFieldsComponent />
        <HomePageFeature />
      </AiProvider>
    </Provider>
  )

  return { store }
}

describe('HomePageFeature integration', () => {
  beforeEach(() => {
    getRepoMock.mockReset()
  })

  it('shows validation errors and avoids the server action when fields are invalid', async () => {
    renderFeature()

    fireEvent.click(screen.getByRole('button', { name: 'Analyze' }))

    expect(await screen.findByText('Repository is required')).toBeTruthy()
    expect(screen.getByText('AI API Key is required')).toBeTruthy()
    expect(getRepoMock).not.toHaveBeenCalled()
  })

  it('submits valid values and stores the AI analysis result', async () => {
    const { store } = renderFeature()
    getRepoMock.mockResolvedValueOnce({ summary: 'analysis complete' })

    fireEvent.change(screen.getByLabelText('Repository name'), { target: { value: 'owner/repo' } })
    fireEvent.change(screen.getByLabelText('GitHub token'), { target: { value: 'ghp_1234567890' } })
    fireEvent.change(screen.getByPlaceholderText('sk-...'), { target: { value: 'apikey-12345' } })
    fireEvent.change(screen.getByPlaceholderText('e.g. gpt-4o-mini'), { target: { value: 'gpt-4o-mini' } })
    fireEvent.click(screen.getByRole('button', { name: 'Analyze' }))

    await waitFor(() => {
      expect(getRepoMock).toHaveBeenCalledWith({
        repositoryName: 'owner/repo',
        githubToken: 'ghp_1234567890',
        aiApiKey: 'apikey-12345',
        aiModel: 'gpt-4o-mini',
      })
    })
    await waitFor(() => {
      expect(store.getState().aiHomePage.value).toEqual({ aiAnalysis: { summary: 'analysis complete' } })
    })
    expect(store.getState().aiHomePage.loading).toBe(false)
  })

  it('clears user input and form errors', async () => {
    const { store } = renderFeature()
    const repository = screen.getByLabelText('Repository name') as HTMLInputElement
    const token = screen.getByLabelText('GitHub token') as HTMLInputElement

    fireEvent.change(repository, { target: { value: 'bad value' } })
    fireEvent.change(token, { target: { value: 'short' } })
    fireEvent.click(screen.getByRole('button', { name: 'Analyze' }))

    expect(await screen.findByText('Repository must be in "owner/repo" format or a github.com URL')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))

    expect(repository.value).toBe('')
    expect(token.value).toBe('')
    await waitFor(() => {
      expect(store.getState().homePage.errors).toEqual({
        repositoryName: '',
        githubToken: '',
        aiApiKey: '',
        aiModel: '',
      })
    })
  })
})