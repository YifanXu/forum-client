import React from 'react';

const ThreadPage = ({ thread, replies, isLoggedIn }) => (
  <div className="forum-container">
    <h2>{thread.title}</h2>
    <p>Posted by {thread.author} - {thread.createTime}</p>
    <div>{thread.content}</div>
    
    <h3>Replies</h3>
    <ul>
      {replies.map((reply) => (
        <li key={reply.id}>
          <div>{reply.content}</div>
          <p>{reply.replierName} - {reply.replyTimestamp}</p>
        </li>
      ))}
    </ul>
    
    {isLoggedIn ? (
      <form>
        <textarea placeholder="Write your reply here..."></textarea>
        <button type="submit">Post Reply</button>
      </form>
    ) : (
      <p><a href="/login">Log in</a> or <a href="/register">register</a> to reply</p>
    )}
  </div>
);

export default ThreadPage;
