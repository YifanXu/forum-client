import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom"
import ApiClient from './ApiClient'
import { ApiContext, SessionContext } from './ApiContext'
import { AuthToken } from './types'

// Import pages here
import Root from './Root'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import ForumListPage from './pages/ForumListPage'
import ForumPage from './pages/ForumPage'
import ThreadPage from './pages/ThreadPage'
import ProfilePage from './pages/ProfilePage'
import NewThreadPage from './pages/NewThreadPage'

import './custom.scss'
import 'react-quill/dist/quill.snow.css';

let session: AuthToken | null = null 
const apiClient = new ApiClient(() => session, s => {session = s})

const router = createBrowserRouter([{
	path: "/",
	element: <ApiContext.Provider value={apiClient}>
		<SessionContext.Provider value={session}>
			<Root />
		</SessionContext.Provider>
	</ApiContext.Provider>,
	errorElement: <ErrorPage />,
	children: [
		{
			errorElement: <ErrorPage />,
			children: [
				{
					path: "",
					element: <HomePage /> // Homepage
				},
				{
					path: "forums",
					element: <ForumListPage /> // Browse forums
				},
				{
					path: "forums/:forum", // Browse posts in specific forum
					element: <ForumPage />
				},
				{
					path: "forums/:forum/:thread", // Browse comments in specific post
					element: <ThreadPage />
				},
				{
					path: "newthread",
					element: <NewThreadPage/>
				},
				{
					path: "users/:userid/:username",
					element: <ProfilePage />
				}
			]
		}
	]
}])

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)

// If you want to start measuring performance in your HomePage, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
