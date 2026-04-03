import ReactorsPopup from './ReactorsPopup'
import { Reply } from '@/hooks/usePosts'

interface Reactor {
  _id: string
  userId: { _id: string; firstName: string; lastName: string }
}

interface ReplyItemProps {
  reply: Reply
  postId: string
  commentId: string
  currentUserId: string
  onDeleteComment: (postId: string, commentId: string) => Promise<void>
  onToggleLike: (targetId: string, targetType: 'post' | 'comment') => Promise<void>
  fetchReactors: (targetId: string, targetType: 'post' | 'comment') => Promise<void>
  activeTarget: string | null
  reactors: Reactor[]
  reactorsLoading: boolean
  onCloseReactors: () => void
}

export default function ReplyItem({
  reply, postId, currentUserId,
  onDeleteComment, onToggleLike,
  fetchReactors, activeTarget, reactors, reactorsLoading, onCloseReactors,
}: ReplyItemProps) {
  const isOwner = reply.authorId._id === currentUserId

  return (
    <div className="_comment_main" style={{ marginTop: '8px' }}>
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
            <p className="_comment_status_text"><span>{reply.content}</span></p>
          </div>
          <div className="_total_reactions" style={{ position: 'relative' }}>
            <div className="_total_react">
              <span className="_reaction_like">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </span>
            </div>
            <span
              className="_total"
              style={{ cursor: 'pointer' }}
              onClick={() => fetchReactors(reply._id, 'comment')}
            >
              {reply.likeCount}
            </span>
            {activeTarget === reply._id && (
              <ReactorsPopup
                reactors={reactors}
                isLoading={reactorsLoading}
                onClose={onCloseReactors}
              />
            )}
          </div>
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <span
                    style={{ cursor: 'pointer', fontWeight: reply.isLiked ? 'bold' : 'normal' }}
                    onClick={() => onToggleLike(reply._id, 'comment')}
                  >
                    {reply.isLiked ? 'Liked.' : 'Like.'}
                  </span>
                </li>
                {isOwner && (
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: '#ff4d4f' }}
                      onClick={() => onDeleteComment(postId, reply._id)}
                    >
                      Delete.
                    </span>
                  </li>
                )}
                <li>
                  <span className="_time_link">.{new Date(reply.createdAt).toLocaleDateString()}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}