import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from './logo.svg';
import HomePage from './pages/HomePage';
import ForumPage from './pages/ForumPage';
import ThreadsPage from './pages/ThreadsPage';
import ThreadPage, { forums } from './pages/ThreadPage';
import NewThreadPage from './pages/NewThreadPage';
import UserProfile from './pages/UserProfile';
// Change the import or the declaration of the component
import ThreadPageComponent from './pages/ThreadPage'; // or rename your local component
import './App.css';

// Mock data for user state
const mockUser = {
  isLoggedIn: true,
  username: 'User123',
  profilePicture: 'https://example.com/profile.jpg',
};

const ThreadContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
`;

// Define the Thread component to render a single thread
interface ThreadProps {
  thread: {
    id: number;
    title: string;
    content: string;
  };
}

const Thread: React.FC<ThreadProps> = ({ thread }) => (
  <ThreadContainer>
    <h2>{thread.title}</h2>
    <p>{thread.content}</p>
  </ThreadContainer>
);


// Define interfaces for type safety
interface Thread {
  id: number;
  title: string;
  content: string;
}

interface Reply {
  id: number;
  content: string;
  threadId: number;
}

interface Forum {
  id: number;
  name: string;
  description: string;
}

const threadFeed = [
  { id: 1, title: 'Thread 1', content: 'Content of Thread 1' },
  { id: 2, title: 'Thread 2', content: 'Content of Thread 2' },
];

const threads: Thread[] = [];     // Replace with actual thread data

{forums&& forums.map((forum: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
  <div key={forum.id}>
    <h2>{forum.title}</h2>
  </div>
))}

{forums && forums.map((forum: { id: any; title: any; }) => (
  <div key={forum?.id||"unknown"}>
    <h2>{forum?.title||"Untitled Forum"}</h2>
  </div>
))}

function App() {
  const isLoggedIn = mockUser.isLoggedIn;  // Replace with actual login status logic
  const user = { profilePicture: '', username: '', flair: '', registrationDate: '', lastActivityDate: '', recentActivity: [] };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img src={logo} alt="Logo" style={{ width: 30, height: 30, marginRight: 10 }} />
              My Forum
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/forums">Forums</Nav.Link>
                <Nav.Link as={Link} to="/new-thread">New Thread</Nav.Link>
                <Nav.Link as={Link} to="/user-profile">User Profile</Nav.Link>
              </Nav>
              <Nav>
                {isLoggedIn ? (
                  <Nav.Link as={Link} to="/user-profile">
                    <img
                      src={mockUser.profilePicture}
                      alt="Profile"
                      style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 5 }}
                    />
                    {mockUser.username}
                  </Nav.Link>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} threadfeed={threadFeed} />} />
          <Route path="/forums" element={<ForumPage forums={forums} />} />
          <Route path="/forums/:forumId" element={<ThreadsPage threads={threads} />} />
          <Route path="/threads/:threadId" element={<ThreadPage threads={threads} replies={[]} isLoggedIn={isLoggedIn} />} />
          <Route path="/new-thread" element={isLoggedIn ? <NewThreadPage isLoggedIn={isLoggedIn} forums={forums} /> : <Navigate to="/login" />} />
          <Route path="/user-profile" element={<UserProfile user={user} />} />
          <Route path="/login" element={<p>Login Page (to be implemented)</p>} />
          <Route path="/register" element={<p>Register Page (to be implemented)</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
