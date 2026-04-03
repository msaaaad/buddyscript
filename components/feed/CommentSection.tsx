'use client'

import { useState } from 'react'
import CommentItem from './CommentItem'
import { Comment } from '@/hooks/usePosts'

interface Reactor {
  _id: string
  userId: { _id: string; firstName: string; lastName: string }
}

interface CommentSectionProps {
  comments: Comment[]
  postId: string
  currentUserId: string
  onAddComment: (postId: string, content: string, parentId?: string | null) => Promise<void>
  onDeleteComment: (postId: string, commentId: string) => Promise<void>
  onToggleLike: (targetId: string, targetType: 'post' | 'comment') => Promise<void>
  fetchReactors: (targetId: string, targetType: 'post' | 'comment') => Promise<void>
  activeTarget: string | null
  reactors: Reactor[]
  reactorsLoading: boolean
  onCloseReactors: () => void
}

export default function CommentSection({
  comments, postId, currentUserId,
  onAddComment, onDeleteComment, onToggleLike,
  fetchReactors, activeTarget, reactors, reactorsLoading, onCloseReactors,
}: CommentSectionProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setIsSubmitting(true)
    try {
      await onAddComment(postId, content, null)
      setContent('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="_feed_inner_comment_box">
        <form className="_feed_inner_comment_box_form" onSubmit={handleSubmit}>
          <div className="_feed_inner_comment_box_content">
            <div className="_feed_inner_comment_box_content_image">
              <img src="/assets/images/comment_img.png" alt="" className="_comment_img" />
            </div>
            <div className="_feed_inner_comment_box_content_txt">
              <textarea
                className="form-control _comment_textarea"
                placeholder="Write a comment"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="_feed_inner_comment_box_icon">
            <button
              type="submit"
              className="_feed_inner_comment_box_icon_btn"
              disabled={isSubmitting || !content.trim()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path fill="#000" fill-opacity=".46" fill-rule="evenodd" d="M14.854 1.146a.5.5 0 00-.514-.12l-13 5a.5.5 0 00.02.94l5.1 1.7 1.7 5.1a.5.5 0 00.94.02l5-13a.5.5 0 00-.246-.64zM7.1 8.9l5.98-5.98-4.36 9.24-.86-3.4a.5.5 0 00-.32-.32l-3.4-.86 9.24-4.36L7.1 8.9z" clip-rule="evenodd" />
                </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="_timline_comment_main">
        {comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={postId}
            currentUserId={currentUserId}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
            onToggleLike={onToggleLike}
            fetchReactors={fetchReactors}
            activeTarget={activeTarget}
            reactors={reactors}
            reactorsLoading={reactorsLoading}
            onCloseReactors={onCloseReactors}
          />
        ))}
      </div>
    </div>
  )
}