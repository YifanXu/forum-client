import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap';

const AppNavbar = ({ isLoggedIn, username, profilePicture }) => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand as={Link} to="/">ForumApp</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/forums">Browse Forums</Nav.Link>
      {isLoggedIn && <Nav.Link as={Link} to="/new-thread">New Thread</Nav.Link>}
    </Nav>
    <Form inline className="ml-auto">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
    <Nav>
      {isLoggedIn ? (
        <>
          <Nav.Link as={Link} to="/profile">
            <Image src={profilePicture} roundedCircle width="30" /> {username}
          </Nav.Link>
          <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </>
      )}
    </Nav>
  </Navbar>
);

export default AppNavbar;
