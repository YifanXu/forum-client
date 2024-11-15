import { useContext } from 'react';
import { ApiContext } from '../ApiContext';

function HomePage() {
	const api = useContext(ApiContext)

	return (
		<div className="HomePage">
			<div>
				<p>Home Page!!! Test={api.test}</p>
			</div>
		</div>
	);
}

export default HomePage;
