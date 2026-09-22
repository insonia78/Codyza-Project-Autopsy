"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from './css/styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../lib/hooks'
import { handleAnalyze } from './functions'
import Button from '@/app/components/Ui/Button'
import { getRepo } from './server/actions'
import { setErrors, setValue } from '@/lib/features/homepageslice'



export const HomePageFeature = () => {
    const repositoryNameRef = useRef<HTMLInputElement | null>(null)
    const githubTokenRef = useRef<HTMLInputElement | null>(null)
    const value = useAppSelector((s) => s.homePage?.value || {})
    const errors = useAppSelector((s) => s.homePage?.errors || {})
    const dispatch = useAppDispatch();
    

     useEffect(() => {
         // This runs only on the client after hydration
         
          
               setValue({ key: 'repositoryName', value: repositoryNameRef });
               setValue({ key: 'githubToken', value: githubTokenRef });
          
       }, []);



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
                    
                />
                <p id="repository-error" className={styles['error-text']} role="alert" aria-live="assertive">
                    {errors?.repositoryName && <span style={{ color: 'red', fontSize: 12 }}>{errors.repositoryName}</span>}
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
                    
                />
                <p id="githubToken-error" className={styles['error-text']} role="alert" aria-live="assertive">
                    {errors?.githubToken && <span style={{ color: 'red', fontSize: 12 }}>{errors.githubToken}</span>}
                </p>
            </div>
            <div className={styles['button-container']}>
                <Button
                    name="analyzeButton"
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                        const result = handleAnalyze(e, dispatch, value)
                        if ( !(Array.isArray(result) && result.length > 0) ) {
                           await getRepo(repositoryNameRef?.current?.value, githubTokenRef?.current?.value)
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
                        
                            dispatch(setValue({
                                repositoryName: '',
                                githubToken: '',
                                aiApiKey: '',
                                aiModel: ''
                            }))
                            dispatch(setErrors({
                                repositoryName: '',
                                githubToken: '',
                                aiApiKey: '',
                                aiModel: ''
                            }))
                    }}
                >
                    Clear
                </Button>
               </div>

            </div>
            );
};  
