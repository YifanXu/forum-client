
const UserProfile = ({ user }) => (
  <div className="profile-container">
    <img src={user.profilePicture} alt="Profile" className="profile-picture" />
    <h2>{user.username}</h2>
    <p>Flair: {user.flair}</p>
    <p>Registered: {user.registrationDate}</p>
    <p>Last Active: {user.lastActivityDate}</p>
    
    <h3>Recent Activity</h3>
    <ul>
      {user.recentActivity.map((activity) => (
        <li key={activity.id}>
          <p>{activity.type} in {activity.forum} - {activity.timestamp}</p>
          <p>Thread: {activity.threadTitle} / {activity.messageExcerpt}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default UserProfile;
