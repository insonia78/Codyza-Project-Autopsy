"use client"

import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { setAiApiKey, setAiModel } from '../../../lib/features/homepageslice'

export default function AiTokenFieldsComponent() {
  const dispatch = useAppDispatch()
  const aiApiKey = useAppSelector((s) => s.homePage?.aiApiKey || '')
  const aiModel = useAppSelector((s) => s.homePage?.aiModel || '')


  return (
    <aside style={{ width: 320, padding: 16, borderLeft: '1px solid #e5e7eb', borderRadius: 6, background: '#fafafa' }}>
      <h3 style={{ marginTop: 0, marginBottom: 8 }}>AI Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ fontSize: 13 }}>OpenAI API Key</label>
        <input
          value={aiApiKey}
          onChange={(e) => dispatch(setAiApiKey(e.target.value))}
          placeholder="sk-..."
          style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
        />

        <label style={{ fontSize: 13 }}>Model</label>
        <input
          value={aiModel}
          onChange={(e) => dispatch(setAiModel(e.target.value))}
          placeholder="e.g. gpt-4o-mini"
          style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
        />        
      </div>
    </aside>
  )
}
