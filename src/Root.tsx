import { Outlet } from "react-router-dom"
import MainNav from "./MainNav"
import './Root.css'

export default function Root() {
	return (
		<div className="App">
			<MainNav />
			<div className='page'>
				<Outlet />
			</div>
		</div>
	)
}