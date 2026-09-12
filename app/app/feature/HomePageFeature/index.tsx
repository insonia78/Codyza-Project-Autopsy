'use client'
import { useRef } from 'react'
import { useAppSelector, useAppDispatch, useAppStore } from '../../../lib/hooks'
import { setRepositoryName, setGitHubToken } from '@/lib/features/homepageslice';
export const HomePageFeature = () => {
const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    // store.dispatch(initializeProduct(product))
    initialized.current = true
  }
  const name = useAppSelector(state => state.homePage.repositoryName)
  const dispatch = useAppDispatch()


    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => dispatch(setRepositoryName(e.target.value))}
            /> 
            <input
                type="text"
                value={useAppSelector(state => state.homePage.githubToken)}
                onChange={(e) => dispatch(setGitHubToken(e.target.value))}
            /> f
        </div>
    );
};  
