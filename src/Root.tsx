import { Outlet } from "react-router-dom"
import MainNav from "./MainNav"

export default function Root() {
	return (
		<div className="App">
			<MainNav />
			<Outlet />
		</div>
	)
}