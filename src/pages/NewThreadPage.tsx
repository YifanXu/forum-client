import { useState } from 'react'
import ReactQuill from 'react-quill'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom'
import './NewThreadPage.css'

function NewThreadPage() {
	const [value, setValue] = useState('');

	return <div className='newThreadPage'>
		<Breadcrumb>
			<Breadcrumb.Item linkAs={Link} linkProps={{to : '/'}}>Home</Breadcrumb.Item>
			<Breadcrumb.Item active>New Thread</Breadcrumb.Item>
		</Breadcrumb>
		<h1>Create a new thread</h1>
		<br/>
		<Form className="newThreadForm">
			<Form.Group className="mb-3" controlId="formForum">
				<Form.Label>Forum</Form.Label>
				<Form.Select aria-label="Forum Selector">
					<option>Open this select menu</option>
					<option value="1">One</option>
					<option value="2">Two</option>
					<option value="3">Three</option>
				</Form.Select>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formTitle">
				<Form.Label>Title</Form.Label>
				<Form.Control type="input"></Form.Control>
				<Form.Text>Title must not exceed x characters</Form.Text>
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
