// ThreadPage.tsx
import React from "react";
import styled from 'styled-components';




// Define and export the forums data
export const forums = [
  { id: 1, title: "General Discussion" },
  { id: 2, title: "Announcements" },
];

const ThreadPage: React.FC =() => {
  return(
    <div>
      <h1>Thread Page</h1>
    </div>
  );
};



// Define the styled container
const ThreadContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
`;

// Define the Thread component
interface ThreadProps {
  thread: {
    id: number;
    title: string;
    content: string;
  };
}

const Thread: React.FC<ThreadProps> = ({ thread }) => {
  return (
    <ThreadContainer>
      <h2>{thread.title}</h2>
      <p>{thread.content}</p>
    </ThreadContainer>
  );
};

// Define the ThreadPageProps interface
interface ThreadPageProps {
  threads: {
    id: number;
    title: string;
    content: string;
  }[];  // Make sure this matches the expected shape of the threads array
  replies: any[];  // You can define a more specific type for replies if needed
  isLoggedIn: boolean;
}

// Export the ThreadPage component as default
export default ThreadPage;

