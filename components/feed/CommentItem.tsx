'use client'

import { useState } from 'react'
import ReplyItem from './ReplyItem'

interface Reply {
  _id: string
  authorId: { _id: string; firstName: string; lastName: string }
  content: string
  likes: string[]
  createdAt: string
}

interface Comment {
  _id: string
  authorId: { _id: string; firstName: string; lastName: string }
  content: string
  likes: string[]
  replies: Reply[]
  createdAt: string
}

interface CommentItemProps {
  comment: Comment
  postId: string
  currentUserId: string
  onToggleCommentLike: (postId: string, commentId: string) => Promise<void>
  onDeleteComment: (postId: string, commentId: string) => Promise<void>
  onAddReply: (postId: string, commentId: string, content: string) => Promise<void>
  onToggleReplyLike: (postId: string, commentId: string, replyId: string) => Promise<void>
  onDeleteReply: (postId: string, commentId: string, replyId: string) => Promise<void>
}

export default function CommentItem({
  comment, postId, currentUserId,
  onToggleCommentLike, onDeleteComment,
  onAddReply, onToggleReplyLike, onDeleteReply,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isOwner = comment.authorId._id === currentUserId
  const isLiked = comment.likes.includes(currentUserId)

  async function handleReplySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!replyContent.trim()) return
    setIsSubmitting(true)
    try {
      await onAddReply(postId, comment._id, replyContent)
      setReplyContent('')
      setShowReplyForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="_comment_main">
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
                  {comment.authorId.firstName} {comment.authorId.lastName}
                </h4>
              </a>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.content}</span>
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
            <span className="_total">{comment.likes.length}</span>
          </div>
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <span
                    style={{ cursor: 'pointer', fontWeight: isLiked ? 'bold' : 'normal' }}
                    onClick={() => onToggleCommentLike(postId, comment._id)}
                  >
                    {isLiked ? 'Liked.' : 'Like.'}
                  </span>
                </li>
                <li>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowReplyForm(prev => !prev)}
                  >
                    Reply.
                  </span>
                </li>
                {isOwner && (
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: '#ff4d4f' }}
                      onClick={() => onDeleteComment(postId, comment._id)}
                    >
                      Delete.
                    </span>
                  </li>
                )}
                <li>
                  <span className="_time_link">
                    .{new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {showReplyForm && (
          <div className="_feed_inner_comment_box">
            <form className="_feed_inner_comment_box_form" onSubmit={handleReplySubmit}>
              <div className="_feed_inner_comment_box_content">
                <div className="_feed_inner_comment_box_content_image">
                  <img src="/assets/images/comment_img.png" alt="" className="_comment_img" />
                </div>
                <div className="_feed_inner_comment_box_content_txt">
                  <textarea
                    className="form-control _comment_textarea"
                    placeholder="Write a reply"
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                  />
                </div>
              </div>
              <div className="_feed_inner_comment_box_icon">
                <button
                  type="submit"
                  className="_feed_inner_comment_box_icon_btn"
                  disabled={isSubmitting || !replyContent.trim()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M14.854 1.146a.5.5 0 00-.514-.12l-13 5a.5.5 0 00.02.94l5.1 1.7 1.7 5.1a.5.5 0 00.94.02l5-13a.5.5 0 00-.246-.64zM7.1 8.9l5.98-5.98-4.36 9.24-.86-3.4a.5.5 0 00-.32-.32l-3.4-.86 9.24-4.36L7.1 8.9z" clip-rule="evenodd" />
                    </svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {comment.replies.length > 0 && (
          <div className="_feed_inner_comment_box" style={{ marginTop: '8px' }}>
            {comment.replies.map(reply => (
              <ReplyItem
                key={reply._id}
                reply={reply}
                postId={postId}
                commentId={comment._id}
                currentUserId={currentUserId}
                onToggleReplyLike={onToggleReplyLike}
                onDeleteReply={onDeleteReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}