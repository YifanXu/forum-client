import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to your feed!</p>
    </div>
  );
}

function ForumPage() {
  return (
    <div>
      <h1>Forums</h1>
      <p>Browse different forums here.</p>
    </div>
  );
}

function ThreadPage() {
  return (
    <div>
      <h1>Thread</h1>
      <p>View and reply to the thread content here.</p>
    </div>
  );
}

function NewThreadPage() {
  return (
    <div>
      <h1>New Thread</h1>
      <p>Create a new thread here.</p>
    </div>
  );
}

function UserProfile() {
  return (
    <div>
      <h1>User Profile</h1>
      <p>See user information, stats, and bio here.</p>
    </div>
  );
}

function SearchPage() {
  return (
    <div>
      <h1>Search</h1>
      <p>Search for content indexed by tags here.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">My Forum</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/forums">Forums</Nav.Link>
                <Nav.Link as={Link} to="/new-thread">New Thread</Nav.Link>
                <Nav.Link as={Link} to="/user-profile">User Profile</Nav.Link>
                <Nav.Link as={Link} to="/search">Search</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forums" element={<ForumPage />} />
          <Route path="/thread" element={<ThreadPage />} />
          <Route path="/new-thread" element={<NewThreadPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
