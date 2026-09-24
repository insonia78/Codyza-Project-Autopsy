'use client'

import { useAppSelector } from '../../../lib/hooks'


const AiResponseComponent = () => {
    const value = useAppSelector(state => state.aiHomePage.value);
    const loading = useAppSelector(state => (state.aiHomePage as any).loading);

    return (
        <div aria-labelledby="ai-analysis-heading" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            {loading ? (
                <div aria-busy="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <div style={{ padding: '0.5rem 1rem' }}>Loading analysis…</div>
                </div>
            ) : (
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
            )}
        </div>
    )
}

export default AiResponseComponent
