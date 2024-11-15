
function UserProfilePage() {
  return (
    <div>
      <h1>User Profile</h1>
      {/* Display user profile details */}
      <p>Username: User123</p>
      <p>Flair: Admin</p>
      <p>Registered: 01/01/2022</p>
      <div className="user-feed">
        {/* Map over user activity */}
      </div>
    </div>
  );
}

export default UserProfilePage;
