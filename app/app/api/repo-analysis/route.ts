import { NextResponse } from 'next/server'

import { getRepo } from '@/app/feature/HomePageFeature/server/actions'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const aiAnalysis = await getRepo(payload)

    return NextResponse.json({ aiAnalysis })
  } catch {
    return NextResponse.json({ error: 'Repository analysis request failed' }, { status: 500 })
  }
}