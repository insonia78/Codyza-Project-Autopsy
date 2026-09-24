"use client"

// import { setValue } from '@/lib/features/homepageslice';
import { useAppSelector, useAppStore } from '../../../lib/hooks'
import { setValue} from '../../../lib/features/homepageslice'
import {useRef,useEffect} from 'react';
import { useAi } from '../../Home/AiProvider'


export default function AiTokenFieldsComponent() {
 
  const { aiApiKeyRef, aiModelRef } = useAi()
  const errors = useAppSelector(state => state.homePage.errors);
  

  

  
 
  
  return (
    <aside style={{ width: 320, padding: 16, borderLeft: '1px solid #e5e7eb', borderRadius: 6, background: '#fafafa' }}>
      <h3 style={{ marginTop: 0, marginBottom: 8 }}>AI Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ fontSize: 13 }}>OpenAI API Key</label>
        <input
          
          ref={aiApiKeyRef}
          placeholder="sk-..."
          style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
        />
        {errors?.aiApiKey && <span style={{ color: 'red', fontSize: 12 }}>{errors.aiApiKey}</span>}
        <label style={{ fontSize: 13 }}>Model</label>
        <input
        
          ref={aiModelRef}
          placeholder="e.g. gpt-4o-mini"
          style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
        />
        {errors?.aiModel && <span style={{ color: 'red', fontSize: 12 }}>{errors.aiModel}</span>}
      </div>
    </aside>
  )
}
