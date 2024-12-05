import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'
import "./MainNav.css"
import { Link } from 'react-router-dom'
import { useState, useContext, useCallback } from 'react'
import { ApiContext, SessionContext } from './ApiContext'
import ProfilePic from './components/ProfilePic'

export default function MainNav() {
	const [loginModalOepn, setLoginModalOpen] = useState(false)
	const [isRegistering, setIsRegistering] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loginErrorMsg, setLoginErrorMsg] = useState('')

	const apiClient = useContext(ApiContext)
	const session = useContext(SessionContext)

	const handleSend = async () => {
		try {
			if (isRegistering) {
				await apiClient.register(username, password)
			}
			await apiClient.login(username, password)
		}
		catch(e) {
			const error = e as any
			console.error(error)
			setLoginErrorMsg((error.response?.data ?? error.message) as string)
			return
		}

		setUsername('')
		setPassword('')
		setLoginModalOpen(false)
	}

	const openModal = useCallback((isRegister: boolean) => {
		setLoginModalOpen(true)
		setIsRegistering(isRegister)
		setUsername('')
		setPassword('')
		setLoginErrorMsg('')
	}, [])

	return (
		<>
			<Navbar variant="dark" className="mainNav">
				<Container>
					<Navbar.Brand as={Link} to="/">Forum Client</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link as={Link} to="/forums">Forums</Nav.Link>
							<Nav.Link as={Link} to="/newthread">New Post</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Navbar.Collapse className="justify-content-end navCollapse">
						{ session ? <ProfilePic src={session.user.profilePic} size="1.5lh"/> : null }
						<NavDropdown title={session ? session.user.name : "Not Logged In"} align='end' className='navdrop'>
							{
								session ? [
									<NavDropdown.Item as={Link} to={`/users/${session.user.id}/${session.user.name}`} key='profLink'>My Profile</NavDropdown.Item>,
									<NavDropdown.Item onClick={() => apiClient.logout()} key='signout'>Sign out</NavDropdown.Item>
								] : [
									<NavDropdown.Item onClick={() => openModal(true)} key='register'>Register</NavDropdown.Item>,
									<NavDropdown.Item onClick={() => openModal(false)} key='signin'>Sign in</NavDropdown.Item>
								] 
							}
						</NavDropdown>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Modal show={loginModalOepn} onHide={() => setLoginModalOpen(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{isRegistering ? "Register" : "Sign in"}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{loginErrorMsg ? <Alert variant="danger">{loginErrorMsg}</Alert> : null}
					<Form onSubmit={e => { handleSend(); e.preventDefault() }}>
						<InputGroup className="mb-3">
							<Form.Control
								placeholder="Username"
								aria-label="Username"
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<Form.Control
								placeholder="Password"
								aria-label="Password"
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</InputGroup>
						<Form.Control type="submit" style={{ display: 'none' }} />
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleSend} disabled={!username || !password}>{isRegistering ? "Register and Sign in" : "Sign in"}</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}