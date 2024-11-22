import { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ApiContext } from '../ApiContext'
import { Post, Thread } from '../types'
import Pager from '../components/Pager'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import './ThreadPage.css'
import { pageFromSearchParams } from '../util/pageFromSearchParams'
import { Link } from 'react-router-dom'

function PostBlock ({ post }: { post: Post }) {
	return (
		<div className="post clearfix">
			<div className="postAuthor">
				<div>
					<img src={post.author.pic} className='postAuthorImg' alt={`${post.author.name}'s profile pic`}/>
				</div>
				<div>{post.author.name}</div>
				<div>{post.author.flair}</div>
				<div>Posted at {post.time}</div>
			</div>
			<div className='postContent'>{post.content.split('\n').map((section, i) => <p key={i}>{section}</p>)}</div>
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
			api.getReplies(forum, thread, page).then(res => setCurrentReplies(res))
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
				<Breadcrumb.Item linkAs={Link} linkProps={{to: `/forums/${currentThread?.parentForum?.id ?? ''}`}}>{currentThread.parentForum?.name ?? forum}</Breadcrumb.Item>
				<Breadcrumb.Item active>{currentThread.title}</Breadcrumb.Item>
			</Breadcrumb>
			<h1>{currentThread.title}</h1>
			<PostBlock post={currentThread.initialPost}/>
			<hr/>
			<p>Replies: {currentThread.replyCount}</p>
			<div className='replies'>
				{currentReplies ? currentReplies.map(p => <PostBlock post={p} key={p.id}/>) : <p>Loading Replies...</p>}
			</div>
			<Pager current={page} max={11} setPage={page => setSearchParams(params => ({...params, page}))}/>
		</div>
	)
}

export default ThreadPage
