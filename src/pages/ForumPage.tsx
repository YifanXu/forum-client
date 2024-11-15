import { useParams } from "react-router-dom";

function ForumPage() {
	const { forum } = useParams()

	return (
		<div className="ForumPage">
			<div>
				<p>Forum Page!!!! forum={forum}</p>
			</div>
		</div>
	);
}

export default ForumPage;
