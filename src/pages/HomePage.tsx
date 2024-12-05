import { useContext, useState, useEffect } from 'react'
import { ApiContext } from '../ApiContext'
import { useNavigate, Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SimpleCard from '../components/SimpleCard'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { ForumStats, Thread, Post } from '../types'
import './HomePage.css'
import ProfilePic from '../components/ProfilePic'
import RichTextDisplay from '../components/RichTextDisplay'

function ThreadBlock ({ thread }: { thread: Thread }) {
	const navigate = useNavigate()
	return <ListGroup.Item action onClick={() => navigate(`forums/${thread.parentForumId}/${thread.id}`)}>
		<div className='threadBlock'>
		<ProfilePic src={thread.initialPost.author.profilePic} size="2lh"/>
		<div className='threadBlockMain'>
			<div className='threadForum'>{thread.parentForumName}</div>
			<div className='threadTitle'>{thread.title}</div>
			<div className='threadAuthor'>By {thread.initialPost.author.name}</div>
		</div>
		<Badge bg="primary">{thread.postCount}</Badge>
		</div>
	</ListGroup.Item>
}

function PostBlock({ post }: { post: Post}) {
	return (
		<ListGroup.Item>
			<div className='postBlock'>
				<ProfilePic src={post.author.profilePic} size={50}/>
				<div className='postBlockMain'>
					<div className='threadForum'>{post.parentThreadForum}</div>
					<Link to={`/forums/${post.parentThreadForumId}/${post.parentThreadId}`} className='postBlockThread'>
						{post.parentThreadTitle}
					</Link>
					<RichTextDisplay content={post.content}/>
				</div>
			</div>
		</ListGroup.Item>
	)
}

function HomePage() {
	const api = useContext(ApiContext)

	const [forumStats, setForumStats] = useState<ForumStats>({
		latestThreads: [],
		totalPosts: 0,
		totalThreads: 0,
		totalUsers: 0
	})

	const [threads, setThreads] = useState<Thread[]>([])
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		api.getForumStats().then(s => setForumStats(s))
		api.getThreadFeed(1).then(s => setThreads(s))
		api.getPostFeed(1).then(s => setPosts(s))
	}, [api])

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item active>Home</Breadcrumb.Item>
			</Breadcrumb>
			<Row className="HomePage">
				<Col className='mainPanel' sm={12} md={7} lg={8}>
					<SimpleCard title="Welcome!">
						This is a forum example that we made.
					</SimpleCard>
					<SimpleCard title="New Threads in Subscribed Forums" direct>
						{
							threads.length > 0
							? threads.map(t => <ThreadBlock thread={t} key={t.id}/>)
							: <ListGroup.Item key='placeholder'>
								When you subscribe to forums, new threads will show up here!
								
							</ListGroup.Item>
						}
					</SimpleCard>
					<SimpleCard title="New Activity in Subscribed Threads" direct>
						{
							posts.length > 0
							? posts.map(p => <PostBlock post={p} key={p.id}/>)
							: <ListGroup.Item key='placeholder'>
								When you subscribe to threads, new replies will show up here!
							</ListGroup.Item>
						}
					</SimpleCard>
				</Col>
				<Col className='extraPanel' sm={12} md={5} lg={4}>
					<SimpleCard title="Forum Statistics" direct>
						<ListGroup.Item>
							Users: {forumStats.totalUsers}
						</ListGroup.Item>
						<ListGroup.Item>
							Threads: {forumStats.totalThreads}
						</ListGroup.Item>
						<ListGroup.Item>
							Posts: {forumStats.totalPosts}
						</ListGroup.Item>
					</SimpleCard>

					<SimpleCard title="Newest Topics" direct>
						{forumStats.latestThreads.map(t => <ThreadBlock thread={t} key={t.id}/>)}
					</SimpleCard>
				</Col>
			</Row>
		</>
	)
}

export default HomePage
