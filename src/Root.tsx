import { Outlet } from "react-router-dom"
import { AuthToken } from "./types"
import ApiClient from "./ApiClient"
import MainNav from "./MainNav"
import { useRef, useState } from "react"
import './Root.css'
import { ApiContext, SessionContext } from "./ApiContext"


export default function Root() {
	let [session, setSession] = useState<AuthToken | null>(null)
	const apiClient = useRef(new ApiClient(() => session, setSession))
	return (
		<div className="App">
			<ApiContext.Provider value={apiClient.current}>
				<SessionContext.Provider value={session}>
					<MainNav />
					<div className='page'>
						<Outlet />
					</div>
				</SessionContext.Provider>
			</ApiContext.Provider>

		</div>
	)
}