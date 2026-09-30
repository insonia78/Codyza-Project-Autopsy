'use client'

import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../../lib/hooks'
import Button from '../Ui/Button'
import styles from './css/styles.module.css'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const AiResponseComponent = () => {
    const value = useAppSelector(state => state.aiHomePage.value);
    const loading = useAppSelector(state => (state.aiHomePage as any).loading);

    const getContent = () => typeof value?.aiAnalysis === 'string' ? value.aiAnalysis : JSON.stringify(value?.aiAnalysis ?? '', null, 2)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const handleDownloadPdf = async () => {
        const content = getContent()
        try {
            const mod = await import('jspdf')
            const { jsPDF } = mod as any
            const doc = new jsPDF({ unit: 'pt', format: 'a4' })
            const margin = 40
            const pageWidth = doc.internal.pageSize.getWidth()
            const maxWidth = pageWidth - margin * 2
            const lines = doc.splitTextToSize(content, maxWidth)
            let cursorY = 40
            doc.setFontSize(12)
            doc.text('Repository Analysis', margin, cursorY)
            cursorY += 20
            doc.setFontSize(10)
            for (let i = 0; i < lines.length; i++) {
                if (cursorY > doc.internal.pageSize.getHeight() - 40) {
                    doc.addPage()
                    cursorY = 40
                }
                doc.text(String(lines[i]), margin, cursorY)
                cursorY += 14
            }
            doc.save('analysis.pdf')
            return
        } catch (err) {
            // fallback to print dialog if jsPDF not available
            const win = window.open('', '_blank', 'noopener,noreferrer')
            if (!win) return
            const html = `<!doctype html><html><head><meta charset="utf-8"><title>Analysis</title><style>body{font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:20px; color:#111} pre{white-space:pre-wrap; font-family:inherit; font-size:14px;}</style></head><body><h1>Repository Analysis</h1><pre>${escapeHtml(content)}</pre></body></html>`
            win.document.open()
            win.document.write(html)
            win.document.close()
            win.focus()
            setTimeout(() => { try { win.print() } catch (e) { /* ignore */ } }, 250)
        }
    }

    // Auto-resize textarea to fit content up to a reasonable max height
    useEffect(() => {
        const ta = textareaRef.current
        if (!ta) return
        // reset height to measure scrollHeight correctly
        ta.style.height = 'auto'
        const max = Math.min(window.innerHeight * 0.65, 1000) // cap max height
        const newHeight = Math.min(ta.scrollHeight, max)
        ta.style.height = `${newHeight}px`
    }, [value?.aiAnalysis])

    return (
        <div aria-labelledby="ai-analysis-heading" 
        className={styles['ai-out-put-container']} 
        >
        
            {loading ? (
                <div aria-busy="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <div style={{ padding: '0.5rem 1rem' }}>Loading analysis…</div>
                </div>
            ) : (
                <>
                    <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
                        <Button aria-label="Download analysis as PDF"  onClick={handleDownloadPdf} disabled={!value?.aiAnalysis}  style={{cursor: value?.aiAnalysis ? 'pointer' : 'not-allowed'}}>
                            Download PDF
                        </Button>
                    </div>
                    <textarea
                        id="ai-analysis"
                        ref={textareaRef}
                        readOnly
                        value={getContent()}                        
                    />
                </>
            )}
        </div>
    )
}

export default AiResponseComponent
