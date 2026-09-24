'use client'

import { useAppSelector } from '../../../lib/hooks'


const AiResponseComponent = () => {
    const value = useAppSelector(state => state.aiHomePage.value);

    return (
        <div aria-labelledby="ai-analysis-heading" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <textarea
                id="ai-analysis"
                readOnly
                value={typeof value?.aiAnalysis === 'string' ? value.aiAnalysis : JSON.stringify(value?.aiAnalysis ?? '', null, 2)}
                style={{
                    flex: 1,
                    minHeight: 0,
                    width: '100%',
                    resize: 'none',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    background: 'transparent'
                }}
            />
        </div>
    )
}

export default AiResponseComponent
