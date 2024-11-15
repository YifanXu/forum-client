import React, { useState } from 'react';

const NewThreadPage = ({ isLoggedIn, forums }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetForum, setTargetForum] = useState(forums[0]?.id || '');

  if (!isLoggedIn) {
    return <p>Please <a href="/login">log in</a> to create a thread.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit thread logic
  };

  return (
    <div className="forum-container">
      <h2>Create New Thread</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Forum:
          <select value={targetForum} onChange={(e) => setTargetForum(e.target.value)}>
            {forums.map((forum) => (
              <option key={forum.id} value={forum.id}>{forum.name}</option>
            ))}
          </select>
        </label>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewThreadPage;
