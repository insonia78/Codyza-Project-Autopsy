"use client"
import React, { useRef, useState } from 'react'
import styles from './css/styles.module.css'
import { useAppDispatch } from '../../../lib/hooks'
import { handleAnalyze } from './functions'
import Button from '@/app/components/Ui/Button'
export const HomePageFeature = () => {
    const repositoryNameRef = useRef<HTMLInputElement | null>(null)
    const githubTokenRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<string[]>([])

    const repoError = errors.find((e) => e.toLowerCase().includes('repository'))
    const tokenError = errors.find((e) => e.toLowerCase().includes('github token'))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = handleAnalyze(e as any, dispatch, repositoryNameRef, githubTokenRef)
        if (Array.isArray(result) && result.length > 0) {
            setErrors(result)
        } else {
            setErrors([])
        }
    }

    const handleClear = () => {
        if (repositoryNameRef?.current) {
            repositoryNameRef.current.value = ''
        }
        if (githubTokenRef?.current) {
            githubTokenRef.current.value = ''
        }
        setErrors([])
        repositoryNameRef?.current?.focus()
    }

    return (
        <div className={styles['home-page-container']}>
            <h2 id="home-feature-heading" className={styles['sr-only'] || ''}>Analyze repository</h2>
            <form
                onSubmit={handleSubmit}
                aria-labelledby="home-feature-heading"
                className={styles['home-form']}
                noValidate
            >
                <div className={styles['repository-name-container']}>
                    <label htmlFor="repositoryName">Repository name</label>
                    <input
                        id="repositoryName"
                        type="text"
                        name="repositoryName"
                        ref={repositoryNameRef}
                        className={styles.input}
                        placeholder="Repository Name"
                        aria-invalid={!!repoError}
                        aria-describedby={repoError ? 'repositoryName-error' : undefined}
                        autoComplete="off"
                        required
                    />
                    <p
                        id="repositoryName-error"
                        className={styles['error-text']}
                        role="alert"
                        aria-live="assertive"
                    >
                        {repoError}
                    </p>
                </div>

                <div className={styles['github-token-container']}>
                    <label htmlFor="githubToken">GitHub token</label>
                    <input
                        id="githubToken"
                        type="text"
                        name="githubToken"
                        ref={githubTokenRef}
                        placeholder="GitHub Token"
                        className={styles.input}
                        aria-invalid={!!tokenError}
                        aria-describedby={tokenError ? 'githubToken-error' : undefined}
                        autoComplete="off"
                    />
                    <p
                        id="githubToken-error"
                        className={styles['error-text']}
                        role="alert"
                        aria-live="assertive"
                    >
                        {tokenError}
                    </p>
                </div>

                <div className={styles['actions']}>
                    <Button
                        name="analyzeButton"
                        type="submit"
                        variant="primary"
                        size="md"
                    >
                        Analyze
                    </Button>

                    <Button
                        name="clearButton"
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </div>
    );
};
