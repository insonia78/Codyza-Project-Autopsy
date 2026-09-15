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


    return (
        <div className={styles['home-page-container']}>
            <form
                className={styles['home-form']}
                onSubmit={(e) => {
                    const result = handleAnalyze(e, dispatch, repositoryNameRef, githubTokenRef)
                    if (Array.isArray(result) && result.length > 0) {
                        setErrors(result)
                    } else {
                        setErrors([])
                    }
                }}
                aria-labelledby="homeform-heading"
            >
                <h2 id="homeform-heading" className={styles['visually-hidden']}>Home analysis form</h2>

                <div className={styles['repository-name-container']}>
                    <label htmlFor="repositoryNameInput">Repository Name</label>
                    <input
                        id="repositoryNameInput"
                        type="text"
                        name="repositoryName"
                        ref={repositoryNameRef}
                        className={styles.input}
                        placeholder="Repository Name"
                        aria-invalid={errors.some(e => e.includes('Repository'))}
                        aria-describedby={errors.some(e => e.includes('Repository')) ? 'repository-error' : undefined}
                    />
                    <p id="repository-error" className={styles['error-text']} role="alert" aria-live="polite">
                        {errors.find((e) => e.includes('Repository'))}
                    </p>
                </div>

                <div className={styles['github-token-container']}>
                    <label htmlFor="githubTokenInput">GitHub Token</label>
                    <input
                        id="githubTokenInput"
                        type="text"
                        name="githubToken"
                        ref={githubTokenRef}
                        placeholder="GitHub Token"
                        className={styles.input}
                        aria-invalid={errors.some(e => e.includes('GitHub Token'))}
                        aria-describedby={errors.some(e => e.includes('GitHub Token')) ? 'token-error' : undefined}
                    />
                    <p id="token-error" className={styles['error-text']} role="alert" aria-live="polite">
                        {errors.find((e) => e.includes('GitHub Token'))}
                    </p>
                </div>

                <Button
                    name="analyzeButton"
                    variant="primary"
                    size="md"
                    type="submit"
                >
                    Analyze
                </Button>

                <Button
                    name="clearButton"
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        if(repositoryNameRef?.current) {
                            if (typeof repositoryNameRef.current.value === 'string' && repositoryNameRef.current.value !== 'never') {
                                repositoryNameRef.current.value = ''
                            }
                        }
                        if(githubTokenRef?.current) {
                            if (typeof githubTokenRef.current.value === 'string' && githubTokenRef.current.value !== 'never') {
                                githubTokenRef.current.value = ''
                            }
                        }
                        setErrors([])
                    }}
                >
                    Clear
                </Button>
            </form>
        </div>
    );
};  
