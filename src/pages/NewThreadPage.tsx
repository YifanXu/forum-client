import { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import './NewThreadPage.css'
import { ApiContext, ErrorContext } from '../ApiContext'
import { Forum } from '../types'
import { handleApiError } from '../utils'

function NewThreadPage() {
	const [forums, setForums] = useState<Forum[]>([])
	const [targetForum, setTargetForum] = useState('')
	const [title, setTitle] = useState('')
	const [value, setValue] = useState('')
	const navigate = useNavigate()
	const api = useContext(ApiContext)
	const setError = useContext(ErrorContext)

	useEffect(() => {
		api.getForums().then(f => {setForums(f); setTargetForum(f[0]?.name ?? '');})
	}, [])

	const handleSubmit = async (e: any) => {
		console.log('submit')
		e.preventDefault()
		const targetForumId = forums.find(f => f.name = targetForum)?.id
		if (targetForumId !== undefined) {
			try {
				const newThread = await api.createThread(targetForumId, title, value)
				navigate(`/forums/${newThread.parentForumId}/${newThread.parentForumName}`)
			}
			catch (e) {
				handleApiError(setError)(e)
			}
		}
	}

	return <div className='newThreadPage'>
		<Breadcrumb>
			<Breadcrumb.Item linkAs={Link} linkProps={{to : '/'}}>Home</Breadcrumb.Item>
			<Breadcrumb.Item active>New Thread</Breadcrumb.Item>
		</Breadcrumb>
		<h1>Create a new thread</h1>
		<br/>
		<Form className="newThreadForm" onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formForum">
				<Form.Label>Forum</Form.Label>
				<Form.Select aria-label="Forum Selector" value={targetForum} onChange={e => setTargetForum(e.target.value)}>
					[{forums.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}]
				</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formTitle">
				<Form.Label>Title</Form.Label>
				<Form.Control type="input" value={title} onChange={e => setTitle(e.target.value)}></Form.Control>
				{/* <Form.Text>Title must not exceed x characters</Form.Text> */}
			</Form.Group>
			<Form.Group>
				<Form.Label>Text</Form.Label>
				<ReactQuill theme="snow" value={value} onChange={setValue} className='editor'/>
			</Form.Group>
			<br/>
			<br/>
			<Button variant='primary' type='submit'>Submit</Button>
		</Form>
	</div>
}

export default NewThreadPage
