interface Reply {
  _id: string
  authorId: { _id: string; firstName: string; lastName: string }
  content: string
  likes: string[]
  createdAt: string
}

interface ReplyItemProps {
  reply: Reply
  postId: string
  commentId: string
  currentUserId: string
  onToggleReplyLike: (postId: string, commentId: string, replyId: string) => Promise<void>
  onDeleteReply: (postId: string, commentId: string, replyId: string) => Promise<void>
}

export default function ReplyItem({
  reply, postId, commentId, currentUserId,
  onToggleReplyLike, onDeleteReply,
}: ReplyItemProps) {
  const isOwner = reply.authorId._id === currentUserId
  const isLiked = reply.likes.includes(currentUserId)

  return (
    <div className="_comment_main" style={{ marginLeft: '32px', marginTop: '8px' }}>
      <div className="_comment_image">
        <a href="#" className="_comment_image_link">
          <img src="/assets/images/txt_img.png" alt="" className="_comment_img1" />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <a href="#">
                <h4 className="_comment_name_title">
                  {reply.authorId.firstName} {reply.authorId.lastName}
                </h4>
              </a>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{reply.content}</span>
            </p>
          </div>
          <div className="_total_reactions">
            <div className="_total_react">
              <span className="_reaction_like">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </span>
            </div>
            <span className="_total">{reply.likes.length}</span>
          </div>
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <span
                    style={{ cursor: 'pointer', fontWeight: isLiked ? 'bold' : 'normal' }}
                    onClick={() => onToggleReplyLike(postId, commentId, reply._id)}
                  >
                    {isLiked ? 'Liked.' : 'Like.'}
                  </span>
                </li>
                {isOwner && (
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: '#ff4d4f' }}
                      onClick={() => onDeleteReply(postId, commentId, reply._id)}
                    >
                      Delete.
                    </span>
                  </li>
                )}
                <li>
                  <span className="_time_link">
                    .{new Date(reply.createdAt).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}