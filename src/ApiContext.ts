import { createContext } from 'react'
import { AuthToken } from './types'
import ApiClient from './ApiClient'
export const ApiContext = createContext<ApiClient>(new ApiClient(() => null, () => {}))
export const SessionContext = createContext<AuthToken | null>(null)
export const ErrorContext = createContext<(err: string) => void>(() => {})