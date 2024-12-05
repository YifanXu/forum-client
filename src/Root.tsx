import { Outlet } from "react-router-dom"
import { AuthToken } from "./types"
import ApiClient from "./ApiClient"
import MainNav from "./MainNav"
import Alert from 'react-bootstrap/Alert'
import { useRef, useState } from "react"
import './Root.css'
import { ApiContext, ErrorContext, SessionContext } from "./ApiContext"


export default function Root() {
	let [session, setSession] = useState<AuthToken | null>(null)
	let [error, setError] = useState('')
	const apiClient = useRef(new ApiClient(() => session, setSession))
	return (
		<div className="App">
			<ApiContext.Provider value={apiClient.current}>
				<SessionContext.Provider value={session}>
					<ErrorContext.Provider value={setError}>
						<MainNav />
						<div className='page'>
							<Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>
							<Outlet />
						</div>
					</ErrorContext.Provider>
				</SessionContext.Provider>
			</ApiContext.Provider>

		</div>
	)
}