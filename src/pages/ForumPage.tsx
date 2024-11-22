import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { ApiContext } from '../ApiContext'
import { Forum, Thread } from '../types'
import Pager from '../components/Pager'
import './ForumPage.css'
import { pageFromSearchParams } from '../util/pageFromSearchParams'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'

function ThreadBlock ({ thread }: { thread: Thread }) {
	const initialPost = thread.initialPost
	const author = initialPost.author
	const navigate = useNavigate()
	return (
		<div className="thread clearfix" onClick={() => navigate(thread.id.toString())}>
			<div className="threadAuthor">
				<div>
					<img src={author.pic} className='postAuthorImg' alt={`${author.name}'s profile pic`}/>
				</div>
				<div>{author.name}</div>
				
			</div>
			<div className='threadContent'>
				<div>Posted at {thread.initialPost.time}</div>
				<h4>{thread.title}</h4>
			</div>
		</div>
	)
}

function ThreadPage() {
	const {  forum } = useParams()
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
			<h1>{currentForum.name}</h1>
			<hr/>
			<p>Posts: {currentForum.postCount}</p>
			<div className='threads'>
				{currentThread ? currentThread.map(p => <ThreadBlock thread={p} key={p.id}/>) : <p>Loading Replies...</p>}
			</div>
			<Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/>
		</div>
	)
}

export default ThreadPage
