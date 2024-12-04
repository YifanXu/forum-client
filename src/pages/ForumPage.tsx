import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { ApiContext } from '../ApiContext'
import { Forum, Thread } from '../types'
import Pager from '../components/Pager'
import './ForumPage.css'
import { pageFromSearchParams } from '../utils'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

function ThreadBlock ({ thread }: { thread: Thread }) {
	const initialPost = thread.initialPost
	const navigate = useNavigate()
	return (
		<div className="thread clearfix" onClick={() => navigate(thread.id.toString())}>
			<div className='threadContent'>
				<h4>{thread.title}</h4>
				<div>By {thread.initialPost.author.name}, at {new Date(thread.initialPost.time).toLocaleString()}</div>
			</div>
			<img className="authorPic" src={thread.lastPost.author.pic} alt=""></img>
			<div className='replyCount'>
			</div>
			<div className='threadLastPost'>
				<div className='name'>{thread.lastPost.author.name}</div>
				<div className="time">{new Date(thread.lastPost.time).toLocaleString()}</div>
			</div>
		</div>
	)
}

function ThreadPage() {
	const { forum } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const api = useContext(ApiContext)

	const [currentForum, setCurrentThread] = useState<Forum | undefined>(undefined)
	const [currentThread, setCurrentReplies] = useState<Thread[] | undefined>(undefined)

	const page = pageFromSearchParams(searchParams)

	useEffect(() => {
		if (forum) {
			api.getForum(forum).then(res => setCurrentThread(res))
		}
		else {
			setCurrentThread(undefined)
		}
	}, [api, forum])

	useEffect(() => {
		if (forum) {
			api.getThreads(forum, page).then(res => setCurrentReplies(res))
		}
		else {
			setCurrentThread(undefined)
		}
	}, [api, forum, page])

	if (!currentForum) {
		return <div className="ThreadPage">Loading</div>
	}

	return (
		<div className="ForumPage">
			<Breadcrumb>
				<Breadcrumb.Item linkAs={Link} linkProps={{to : '/'}}>Home</Breadcrumb.Item>
				<Breadcrumb.Item linkAs={Link} linkProps={{to : '/forums'}}>Forums</Breadcrumb.Item>
				<Breadcrumb.Item active>{currentForum.name}</Breadcrumb.Item>
			</Breadcrumb>
			<div className='forumHeader'>
				<h2>{currentForum.name}</h2>
				<p>{currentForum.description}</p>
				<hr/>
				<p>Posts: {currentForum.threadCount}</p>
			</div>
			<ListGroup>
				<ListGroup.Item active><Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/></ListGroup.Item>
				{currentThread ? currentThread.map(p => <ListGroup.Item action key={p.id}><ThreadBlock thread={p}/></ListGroup.Item>) : <p>Loading Replies...</p>}
			</ListGroup>
			<Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/>
		</div>
	)
}

export default ThreadPage
