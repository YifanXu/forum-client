import { createContext } from 'react';
import ApiClient from './ApiClient';
export const ApiContext = createContext<ApiClient>(new ApiClient())
