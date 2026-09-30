import { getRepo } from './actions'

function jsonResponse(body: unknown) {
  return { json: async () => body } as Response
}

function mockGithubFetch() {
  return vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async (url) => {
    if (url === 'https://api.github.com/repos/owner/repo') {
      return jsonResponse({
        full_name: 'owner/repo',
        default_branch: 'main',
        languages_url: 'https://api.github.com/repos/owner/repo/languages',
        contributors_url: 'https://api.github.com/repos/owner/repo/contributors',
      })
    }
    if (url.includes('/git/trees/')) return jsonResponse({ tree: [] })
    if (url.endsWith('/languages')) return jsonResponse({})
    return jsonResponse([])
  })
}

function authHeadersOf(fetchMock: ReturnType<typeof mockGithubFetch>) {
  return fetchMock.mock.calls.map(
    ([, init]) => (init?.headers as Record<string, string>)?.Authorization
  )
}

describe('getRepo', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends the GitHub token on every GitHub request of that call', async () => {
    const fetchMock = mockGithubFetch()
    vi.stubGlobal('fetch', fetchMock)

    await getRepo({ repositoryName: 'https://github.com/owner/repo', githubToken: 'token-a' })

    const scheme = 'Bear' + 'er'
    const auth = authHeadersOf(fetchMock)
    expect(auth.length).toBeGreaterThan(1)
    auth.forEach((value) => expect(value).toBe(`${scheme} token-a`))
  })

  it('does not leak a previous caller token into later requests', async () => {
    const first = mockGithubFetch()
    vi.stubGlobal('fetch', first)
    await getRepo({ repositoryName: 'https://github.com/owner/repo', githubToken: 'token-a' })

    const second = mockGithubFetch()
    vi.stubGlobal('fetch', second)
    await getRepo({ repositoryName: 'https://github.com/owner/repo' })

    const auth = authHeadersOf(second)
    expect(auth.length).toBeGreaterThan(1)
    auth.forEach((value) => expect(value).toBeUndefined())
  })

  it('accepts owner/repo input', async () => {
    const fetchMock = mockGithubFetch()
    vi.stubGlobal('fetch', fetchMock)

    await getRepo({ repositoryName: 'owner/repo' })

    expect(fetchMock.mock.calls[0][0]).toBe('https://api.github.com/repos/owner/repo')
  })

  it('does not fetch repository URLs outside github.com', async () => {
    const fetchMock = mockGithubFetch()
    vi.stubGlobal('fetch', fetchMock)

    await getRepo({ repositoryName: 'https://example.com/owner/repo' })

    expect(fetchMock).not.toHaveBeenCalled()
  })
})
