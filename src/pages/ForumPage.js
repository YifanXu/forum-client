
const ForumPage = ({ forums }) => (
  <div className="forum-container">
    <h2>Browse Forums</h2>
    <ul>
      {forums.map((forum) => (
        <li key={forum.id}>
          <h3>{forum.name}</h3>
          <p>{forum.description}</p>
          <p>Latest post: <a href={`/threads/${forum.latestPost.id}`}>{forum.latestPost.title}</a> by {forum.latestPost.author} - {forum.latestPost.lastActivity}</p>
          <p>{forum.postCount} posts | {forum.subscribers} subscribers</p>
        </li>
      ))}
    </ul>
  </div>
);

export default ForumPage;
