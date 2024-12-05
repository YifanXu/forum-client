import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import { ApiContext } from "../ApiContext"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import "./ProfilePage.css"
import SimpleCard from "../components/SimpleCard"
import { Post, User } from '../types'

function PostBlock({ post }: {post: Post}) {
	return (
		<ListGroup.Item action>
			<div>{post.parentThreadTitle}</div>
			<div>{post.content}</div>
			<div>{new Date(post.time).toLocaleDateString()}</div>
		</ListGroup.Item>
	)
}

function ProfilePage() {
	const { userid } = useParams()
	const [user, setUser] = useState<User>({
		id: 0,
		flair: '',
		name: '',
		profilePic: '',
		postCount: 0,
		registered: 0,
		threadCount: 0
	});
	const [posts, setPosts] = useState<Post[]>([])
	const api = useContext(ApiContext)

	useEffect(() => {
		if (userid) {
			api.getUser(userid).then(user => setUser(user))
			api.getUserPosts(userid).then(res => setPosts(res))
		}
	}, [api, userid])

	return (
		<div className="ProfilePage">
			<div className="profileHeader">
				<div className="headerBand">
					{/* <div className="headerBandStats">
						
					</div> */}
					<div>
						<div className="statHeader">Threads Created</div>
						<div className="statNumber">{user.threadCount}</div>
					</div>
					<div>
						<div className="statHeader">Posts Created</div>
						<div className="statNumber">{user.postCount}</div>
					</div>
					<div>
						<div className="statHeader">Joined</div>
						<div className="statNumber">{user.registered ? (new Date(user.registered)).toLocaleDateString() : ''}</div>
					</div>
					<div>
						<div className="statHeader">Last Active</div>
						<div className="statNumber">Feb. 17</div>
					</div>
				</div>
				<div className='profilePicBig'></div>
				<h1 className='profileName'>Username</h1>
			</div>
			<Row className="profieMain">
				<Col sm={12} md={5} lg={3} className="profileSideColumn col">
					<SimpleCard title="Flair"><div>I'm cool</div></SimpleCard>
					<SimpleCard title="Bio"><div>I turned 7 yesterday, now I'm sad because I'm old.</div></SimpleCard>
				</Col>
				<Col sm={12} md={7} lg={9} className="profileMainColumn col">
					<SimpleCard title="Recent Activity" direct>
						{posts.map(p => <PostBlock post={p} key={p.id}/>)}
					</SimpleCard>
				</Col>
			</Row>
		</div>
	)
}

export default ProfilePage
