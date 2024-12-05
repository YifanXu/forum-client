import { useState, useEffect, useContext, useCallback } from 'react'
import { useParams } from "react-router-dom"
import { ApiContext, SessionContext } from "../ApiContext"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import "./ProfilePage.css"
import SimpleCard from "../components/SimpleCard"
import { Post, User } from '../types'
import Button from 'react-bootstrap/Button'
import ProfilePic from '../components/ProfilePic'
import UploadWidget from '../components/UploadWidget'
import EditButton from '../components/EditButton'

function PostBlock({ post }: { post: Post }) {
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
		flair: 'Flair',
		name: 'Username',
		profilePic: '',
		postCount: 0,
		registered: 0,
		threadCount: 0
	});
	const [posts, setPosts] = useState<Post[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [editText, setEditText] = useState('')
	const api = useContext(ApiContext)
	const session = useContext(SessionContext)

	const editable = session?.user.id === user.id

	useEffect(() => {
		if (userid) {
			api.getUser(userid).then(user => setUser(user))
			api.getUserPosts(userid).then(res => setPosts(res))
		}
	}, [api, userid])

	const handleFormSubmit = useCallback(async () => {
		const newUser: User = {
			...user,
			flair: editText
		}
		await api.updateUser(newUser)
		setEditText('')
		setModalOpen(false)
		setUser(newUser)
	}, [api, user, editText])

	const handleProfileUpload = useCallback(async (publicId: string) => {
		const newUser: User = {
			...user,
			profilePic: publicId
		}
		setUser(newUser)
		await api.updateUser(newUser)
	}, [api, user])

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
				{
					editable 
					? <UploadWidget onUpload={handleProfileUpload}>
						{(open) => {
							return <ProfilePic src={user.profilePic} size={150} onClick={open} />
						}}
					</UploadWidget>
					: <ProfilePic src={user.profilePic} size={150}/>
				}
				<h1 className='profileName'>{user.name}</h1>
			</div>
			<Row className="profieMain">
				<Col sm={12} md={5} lg={3} className="profileSideColumn col">
					<SimpleCard title="Flair">
						<div className='flairDiv'>
							<div>I'm cool</div>
							{editable ? <EditButton onClick={() => {setModalOpen(true); setEditText(user.flair)}} /> : null}
						</div>
					</SimpleCard>
					{/* <SimpleCard title="Bio"><div>I turned 7 yesterday, now I'm sad because I'm old.</div></SimpleCard> */}
				</Col>
				<Col sm={12} md={7} lg={9} className="profileMainColumn col">
					<SimpleCard title="Recent Activity" direct>
						{posts.map(p => <PostBlock post={p} key={p.id} />)}
					</SimpleCard>
				</Col>
			</Row>
			<Modal show={modalOpen} onHide={() => setModalOpen(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Flair</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control value={editText} onChange={e => setEditText(e.target.value)}/>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" onClick={handleFormSubmit}>Save</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ProfilePage
