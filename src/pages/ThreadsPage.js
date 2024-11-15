import React from 'react';

const ThreadsPage = ({ threads }) => (
  <div className="forum-container">
    <h2>Threads</h2>
    <ul>
      {threads.map((thread) => (
        <li key={thread.id}>
          <h3><a href={`/threads/${thread.id}`}>{thread.title}</a></h3>
          <p>Started by {thread.author} - {thread.createTime}</p>
          <p>{thread.replyCount} replies | Last reply: {thread.lastReplyTime}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default ThreadsPage;
