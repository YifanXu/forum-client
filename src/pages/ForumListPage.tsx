import { useState, useEffect, useContext } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Forum, Thread } from '../types'
import { ApiContext } from '../ApiContext'

function ForumBlock ({ forum }: { forum: Forum }) {
	const navigate = useNavigate()
	return (
		<div className="thread clearfix" onClick={() => navigate(forum.id.toString())}>
			<div className="threadAuthor">
				<div>
					<img src={forum.icon} className='postAuthorImg' alt={`${forum.name}'s icon`}/>
				</div>
			</div>
			<div className='threadContent'>
				<div>{forum.name}</div>
			</div>
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
				{forumList.map(f => <ForumBlock forum={f} key={f.id}></ForumBlock>)}
			</div>
		</div>
	)
}

export default ForumListPage
