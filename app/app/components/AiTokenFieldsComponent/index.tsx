"use client"

// import { setValue } from '@/lib/features/homepageslice';
import { useAppSelector } from '../../../lib/hooks'
import { setValue} from '../../../lib/features/homepageslice'
import {useRef,useEffect} from 'react';

export default function AiTokenFieldsComponent() {
  
  const aiApiKeyRef = useRef<HTMLInputElement | null>(null);
  const modelRef = useRef<HTMLInputElement | null>(null);
  // const dispatch = useAppDispatch();
  const errors = useAppSelector(state => state.homePage.errors);
  // const value = useAppSelector(state => state.homePage.value);

  

  useEffect(() => {
    // This runs only on the client after hydration
    
     
          setValue({ key: 'aiApiKey', value: aiApiKeyRef });
          setValue({ key: 'aiModel', value: modelRef });
     
  }, []);
 
  
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
        
          ref={modelRef}
          placeholder="e.g. gpt-4o-mini"
          style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db' }}
        />
        {errors?.aiModel && <span style={{ color: 'red', fontSize: 12 }}>{errors.aiModel}</span>}
      </div>
    </aside>
  )
}
