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
            <div className={styles['repository-name-container']}>
                <label htmlFor="repositoryName">Repository name</label>
                <input
                    id="repositoryName"
                    type="text"
                    name="repositoryName"
                    ref={repositoryNameRef}
                    className={styles.input}
                    placeholder="Repository Name"
                    aria-invalid={!!errors.find((e) => e.toLowerCase().includes('repository'))}
                    aria-describedby={errors.find((e) => e.toLowerCase().includes('repository')) ? 'repository-error' : undefined}
                />
                <p id="repository-error" className={styles['error-text']} role="alert" aria-live="assertive">
                    {errors.find((e) => e.toLowerCase().includes('repository'))}
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
                    aria-invalid={!!errors.find((e) => e.toLowerCase().includes('github token'))}
                    aria-describedby={errors.find((e) => e.toLowerCase().includes('github token')) ? 'githubToken-error' : undefined}
                />
                <p id="githubToken-error" className={styles['error-text']} role="alert" aria-live="assertive">
                    {errors.find((e) => e.toLowerCase().includes('github token'))}
                </p>
            </div>
            <Button
                name="analyzeButton"
                type="button"
                variant="primary"
                size="md"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const result = handleAnalyze(e, dispatch, repositoryNameRef, githubTokenRef)
                    if (Array.isArray(result) && result.length > 0) {
                        console.log(result)
                        setErrors(result)
                    } else {
                        setErrors([])
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
                    repositoryNameRef?.current?.focus()
                }}
            >
                Clear
            </Button>
            
            
        </div>
    );
};  
