import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ApiContext } from '../ApiContext'
import { Post, Thread } from '../types'
import Pager from '../components/Pager'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import './ThreadPage.css'
import { pageFromSearchParams } from '../utils'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import RichTextDisplay from '../components/RichTextDisplay'

function PostBlock ({ post }: { post: Post }) {
	return (
		<div className="post clearfix">
			<div className="postAuthor">
				<div className='name'>{post.author.name}</div>
				<div>
					<img src={post.author.profilePic} className='postAuthorImg' alt={`${post.author.name}'s profile pic`}/>
				</div>
				<div className='flair'>{post.author.flair}</div>
			</div>
			<div className='postContent'>
				<div className='postTime'>Posted at {new Date(post.time).toLocaleString()}</div>
				<RichTextDisplay content={post.content}/>
			</div>
		</div>
	)
}

function ThreadPage() {
	const { thread, forum } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const api = useContext(ApiContext)

	const [currentThread, setCurrentThread] = useState<Thread | undefined>(undefined)
	const [currentReplies, setCurrentReplies] = useState<Post[] | undefined>(undefined)

	const page = pageFromSearchParams(searchParams)

	useEffect(() => {
		if (forum && thread) {
			api.getThread(forum, thread).then(res => setCurrentThread(res))
		}
		else {
			setCurrentThread(undefined)
		}
	}, [api, forum, thread])

	useEffect(() => {
		if (forum && thread) {
			api.getPosts(forum, thread, page).then(res => setCurrentReplies(res))
		}
		else {
			setCurrentThread(undefined)
		}
	}, [api, forum, thread, page])

	if (!currentThread) {
		return <div className="ThreadPage">Loading</div>
	}

	return (
		<div className="ThreadPage">
			<Breadcrumb>
				<Breadcrumb.Item linkAs={Link} linkProps={{to : '/'}}>Home</Breadcrumb.Item>
				<Breadcrumb.Item linkAs={Link} linkProps={{to : '/forums'}}>Forums</Breadcrumb.Item>
				<Breadcrumb.Item linkAs={Link} linkProps={{to: `/forums/${currentThread?.parentForumId ?? ''}`}}>{currentThread.parentForumName ?? forum}</Breadcrumb.Item>
				<Breadcrumb.Item active>{currentThread.title}</Breadcrumb.Item>
			</Breadcrumb>
			<h1>{currentThread.title}</h1>
			<PostBlock post={currentThread.initialPost}/>
			<hr/>
			<p>Replies: {currentThread.postCount}</p>
			<ListGroup>
				<ListGroup.Item active>
					<Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/>
				</ListGroup.Item>
			</ListGroup>
			<div className='replies'>
				{currentReplies ? currentReplies.map(p => <PostBlock post={p} key={p.id}/>) : <p>Loading Replies...</p>}
			</div>
			<ListGroup>
				<ListGroup.Item active>
					<Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/>
				</ListGroup.Item>
			</ListGroup>
		</div>
	)
}

export default ThreadPage
