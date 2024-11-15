import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function MainNav() {
	return (
		<Navbar className="bg-body-tertiary dark">
			<Container>
				<Navbar.Brand>Forum Client</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link>Page A</Nav.Link>
						<Nav.Link>Page B</Nav.Link>
						<Nav.Link>Page C</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<NavDropdown title="Not Logged In">
						<NavDropdown.Item>Register</NavDropdown.Item>
						<NavDropdown.Item>Sign in</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}