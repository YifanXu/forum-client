import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { ApiContext, ErrorContext } from '../ApiContext'
import { Forum, Thread } from '../types'
import Pager from '../components/Pager'
import './ForumPage.css'
import { handleApiError, pageFromSearchParams } from '../utils'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import { Spinner } from 'react-bootstrap'
import RichTextDisplay from '../components/RichTextDisplay'
import ProfilePic from '../components/ProfilePic'

function ThreadBlock ({ thread }: { thread: Thread }) {
	const navigate = useNavigate()
	return (
		<div className="thread" onClick={() => navigate(thread.id.toString())}>
			<div className='threadContent'>
				<h4 className='threadTitle'>{thread.title}</h4>
				<div className='threadAttribution'>By {thread.initialPost.author.name}, at {new Date(thread.initialPost.time).toLocaleString()}</div>
			<RichTextDisplay className='threadThumbnail' content={thread.initialPost.content} limitLine/>
			</div>
			<ProfilePic src={thread.lastPost.author.profilePic} size={50}/>
			<div className='threadLastPost'>
				<div className='name'>{thread.lastPost.author.name}</div>
				<div className="time">{new Date(thread.lastPost.time).toLocaleString()}</div>
			</div>
		</div>
	)
}

function ThreadBlockPlaceholder() {
	return (
		<div className='thread threadPlaceholder'>
			<Spinner variant='primary'/>
		</div>
	)
}

function ThreadPage() {
	const { forum } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const api = useContext(ApiContext)
	const setError = useContext(ErrorContext)

	const [currentForum, setCurrentForum] = useState<Forum | undefined>(undefined)
	const [threads, setThreads] = useState<Thread[] | undefined>(undefined)

	const page = pageFromSearchParams(searchParams)

	useEffect(() => {
		if (forum) {
			api.getForum(forum).then(res => setCurrentForum(res)).catch(handleApiError(setError))
		}
		else {
			setCurrentForum(undefined)
		}
	}, [api, forum])

	useEffect(() => {
		if (forum) {
			api.getThreads(forum, page).then(res => setThreads(res)).catch(handleApiError(setError))
		}
		else {
			setCurrentForum(undefined)
		}
	}, [api, forum, page])

	return (
		<div className="ForumPage">
			<Breadcrumb>
				<Breadcrumb.Item linkAs={Link} linkProps={{to : '/'}}>Home</Breadcrumb.Item>
				<Breadcrumb.Item linkAs={Link} linkProps={{to : '/forums'}}>Forums</Breadcrumb.Item>
				<Breadcrumb.Item active>{currentForum?.name ?? ''}</Breadcrumb.Item>
			</Breadcrumb>
			{
				currentForum
				? <div className='forumHeader'>
					<h2>{currentForum.name}</h2>
					<p>{currentForum.description}</p>
					<hr/>
					<p>Posts: {currentForum.threadCount}</p>
				</div>
				: <div className='forumHeader forumHeaderPlaceholder'><Spinner variant='primary'/></div>
			}
			<ListGroup>
				<ListGroup.Item active><Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/></ListGroup.Item>
				{
					threads 
						? threads.map(p => <ListGroup.Item action key={p.id} className="threadEntry"><ThreadBlock thread={p}/></ListGroup.Item>) 
						: <ListGroup.Item action key="placeholder"><ThreadBlockPlaceholder/></ListGroup.Item>
					}
				<ListGroup.Item active className={threads ? "" : "hide"}><Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/></ListGroup.Item>
			</ListGroup>
		</div>
	)
}

export default ThreadPage
