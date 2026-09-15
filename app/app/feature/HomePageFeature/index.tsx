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
                <input
                    type="text"
                    name="repositoryName"
                    ref={repositoryNameRef}
                    className={styles.input}
                    placeholder="Repository Name"
                />
                <p className={styles['error-text']}>
                    {errors.find((e) => e.includes('Repository'))}
                </p>
            </div>
            <div className={styles['github-token-container']}>
                <input
                    type="text"
                    name="githubToken"
                    ref={githubTokenRef}
                    placeholder="GitHub Token"
                    className={styles.input}
                />
                <p className={styles['error-text']}>
                    {errors.find((e) => e.includes('GitHub Token'))}
                </p>
            </div>
            <Button
                name="analyzeButton"
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
                }}
            >
                Clear
            </Button>
            
            
        </div>
    );
};  
