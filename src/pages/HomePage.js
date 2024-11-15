
const HomePage = ({ threadFeed }) => (
  <div className="forum-container">
    <h1>Welcome to ForumApp</h1>
    <section>
      <h2>Latest Activity</h2>
      <ul>
        {threadFeed.map((thread) => (
          <li key={thread.id}>
            <a href={`/threads/${thread.id}`}>{thread.title}</a>
            <p>by {thread.author} - {thread.lastActivity}</p>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default HomePage;
