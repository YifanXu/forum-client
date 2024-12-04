import { useState, useEffect, useContext } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Forum, Thread } from '../types'
import { ApiContext } from '../ApiContext'
import "./ForumListPage.css"
import ListGroup from 'react-bootstrap/ListGroup'
import { displayNum } from '../utils'

function LastThreadThumbnail({ thread }: {thread: Thread | undefined}) {
	if (!thread) {
		return <div className='forumLastThread'>No threads posted</div>
	}
	return <div className='forumLastThread'>
		<img className="authorPic" src={thread.initialPost.author.profilePic} alt=""></img>
		<div>
			<div>
				<span className='title'>{thread.title}</span>
				<span className="author">By {thread.initialPost.author.name}</span>
			</div>
			<div className="time">{new Date(thread.lastPost.time).toLocaleString()}</div>
		</div>
	</div>
}

function ForumBlock ({ forum }: { forum: Forum }) {
	const navigate = useNavigate()
	return (
		<div className="forumBlock clearfix" onClick={() => navigate(forum.id.toString())}>
			<img src={forum.icon} className='forumThumbnail' alt={`${forum.name}'s icon`}/>
			<div className='forumMain'>
				<div className="forumTitle">{forum.name}</div>
				<div className="forumDesc">{forum.description}</div>
			</div>
			<div className="forumThread">
				<div className="forumThreadCount">{displayNum(forum.threadCount)}</div>
				<div className="forumThreadLabel">Threads</div>
			</div>
			<LastThreadThumbnail thread={forum.lastUpdatedThread}/>
		</div>
	)
}

function ForumListPage() {
	const api = useContext(ApiContext)
	const [forumList, setForumList] = useState<Forum[] | undefined>(undefined)

	useEffect(() => {
		api.getForums().then(res => setForumList(res))
	}, [api])


	if (!forumList) {
		return <div className="ForumListPage">Loading</div>
	}

	return (
		<div className="ForumListPage">
			<Breadcrumb>
				<Breadcrumb.Item linkAs={Link} linkProps={{to : '/'}}>Home</Breadcrumb.Item>
				<Breadcrumb.Item active>Forums</Breadcrumb.Item>
			</Breadcrumb>
			<div>
				<ListGroup className="forumList">
					<ListGroup.Item active key="head">
						Main Forums
					</ListGroup.Item>
					{forumList.map(f => <ListGroup.Item className="forumEntry" action key={f.id}><ForumBlock forum={f}></ForumBlock></ListGroup.Item>)}
				</ListGroup>
			</div>
		</div>
	)
}

export default ForumListPage
