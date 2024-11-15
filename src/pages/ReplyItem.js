
function ReplyItem({ reply }) {
  return (
    <div className="reply-item">
      <div className="reply-header">
        <img src={reply.profilePic} alt={reply.replierName} />
        <strong>{reply.replierName}</strong>
      </div>
      <p>{reply.content}</p>
      <small>{reply.timestamp}</small>
    </div>
  );
}

export default ReplyItem;
