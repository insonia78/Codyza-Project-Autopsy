"use client"
import React from 'react'
import styles from './css/styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { handleAnalyze } from './functions'
import Button from '@/app/components/Ui/Button'
import { setErrors } from '@/lib/features/homepageslice'
import { setValue as setAiHomePageValue, setLoading as setAiLoading } from '../../../lib/features/aihomepageslice'
import { useAi } from '@/app/Home/AiProvider'


export const HomePageFeature = () => {
    const value = useAi();
    const { reset } = value;
    const { repositoryNameRef, githubTokenRef } = value;
    const errors = useAppSelector((s) => s.homePage?.errors || {})
    const dispatch = useAppDispatch();

    return (
        <div className={styles['home-page-container']}>
            <div className={styles['input-container']}>
                <div className={styles['repository-name-container']}>
                    <label htmlFor="repositoryName">Repository name (Required)</label>
                    <input
                        id="repositoryName"
                        type="text"
                        name="repositoryName"
                        ref={repositoryNameRef}
                        className={styles.input}
                        placeholder="Repository Name"

                    />
                    <p id="repository-error" className={styles['error-text']} role="alert" aria-live="assertive">
                        {errors?.repositoryName && <span style={{ color: 'red', fontSize: 12 }}>{errors.repositoryName}</span>}
                    </p>
                </div>
                <div className={styles['github-token-container']}>
                    <label htmlFor="githubToken">GitHub token (Optional)</label>
                    <input
                        id="githubToken"
                        type="text"
                        name="githubToken"
                        ref={githubTokenRef}
                        placeholder="GitHub Token"
                        className={styles.input}

                    />
                    <p id="githubToken-error" className={styles['error-text']} role="alert" aria-live="assertive">
                        {errors?.githubToken && <span style={{ color: 'red', fontSize: 12 }}>{errors.githubToken}</span>}
                    </p>
                </div>
            </div>
            <div className={styles['button-container']}>
                <Button
                    name="analyzeButton"
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                        const result = handleAnalyze(e, dispatch, value)
                        if (!(Array.isArray(result) && result.length > 0)) {
                            const data: any = {
                                repositoryName: value.repositoryNameRef.current?.value,
                                githubToken: value.githubTokenRef.current?.value,
                                aiApiKey: value.aiApiKeyRef.current?.value,
                                aiModel: value.aiModelRef.current?.value
                            }
                            try {
                                dispatch(setAiLoading(true))
                                const response = await fetch('/api/repo-analysis', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(data),
                                })
                                const payload = await response.json()
                                const aiAnalysis = payload?.aiAnalysis
                                dispatch(setAiHomePageValue({ 'aiAnalysis': aiAnalysis }))
                            } finally {
                                dispatch(setAiLoading(false))
                            }
                        }
                    }}
                >
                    Analyze
                </Button>

                <Button
                    name="clearButton"
                    type="button"
                    variant="secondary"
                    size="md"
                    suppressHydrationWarning
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {

                        reset()
                        dispatch(setErrors({
                            repositoryName: '',
                            githubToken: '',
                            aiApiKey: '',
                            aiModel: ''
                        }))
                        dispatch(setAiHomePageValue({ 'aiAnalysis': '' }))
                    }}
                >
                    Clear
                </Button>
            </div>

        </div>
    );
};  
