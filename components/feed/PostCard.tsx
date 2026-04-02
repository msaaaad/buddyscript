'use client'

import { useState } from 'react'
import CommentSection from './CommentSection'
import { Post } from '@/hooks/usePosts'

interface PostCardProps {
  post: Post
  currentUserId: string
  onToggleLike: (postId: string) => Promise<void>
  onDeletePost: (postId: string) => Promise<void>
  onAddComment: (postId: string, content: string) => Promise<void>
  onToggleCommentLike: (postId: string, commentId: string) => Promise<void>
  onDeleteComment: (postId: string, commentId: string) => Promise<void>
  onAddReply: (postId: string, commentId: string, content: string) => Promise<void>
  onToggleReplyLike: (postId: string, commentId: string, replyId: string) => Promise<void>
  onDeleteReply: (postId: string, commentId: string, replyId: string) => Promise<void>
}

export default function PostCard({
  post,
  currentUserId,
  onToggleLike,
  onDeletePost,
  onAddComment,
  onToggleCommentLike,
  onDeleteComment,
  onAddReply,
  onToggleReplyLike,
  onDeleteReply,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const isOwner = post.authorId._id === currentUserId
  const isLiked = post.likes.includes(currentUserId)

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">

        {/* Post Header */}
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img src="/assets/images/post_img.png" alt="" className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.authorId.firstName} {post.authorId.lastName}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {new Date(post.createdAt).toLocaleDateString()} &nbsp;·&nbsp;
                <a href="#">{post.visibility}</a>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button
                type="button"
                className="_feed_timeline_post_dropdown_link"
                onClick={() => setDropdownOpen(prev => !prev)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>
            <div className={`_feed_timeline_dropdown _timeline_dropdown ${dropdownOpen ? 'show' : ''}`}>
              <ul className="_feed_timeline_dropdown_list">
                <li className="_feed_timeline_dropdown_item">
                  <a href="#" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z" />
                      </svg>
                    </span>
                    Save Post
                  </a>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <a href="#" className="_feed_timeline_dropdown_link">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5" />
                      </svg>
                    </span>
                    Hide
                  </a>
                </li>
                {isOwner && (
                  <li className="_feed_timeline_dropdown_item">
                    <button
                      type="button"
                      className="_feed_timeline_dropdown_link"
                      style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                      onClick={() => { onDeletePost(post._id); setDropdownOpen(false) }}
                    >
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5z" />
                        </svg>
                      </span>
                      Delete Post
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="_feed_inner_timeline_post_txt _padd_t16">
          <p className="_feed_inner_timeline_post_para">{post.content}</p>
        </div>
        {post.imageUrl && (
          <div className="_feed_inner_timeline_image _padd_t16">
            <img src={post.imageUrl} alt="Post" className="_time_img" style={{ width: '100%', borderRadius: '6px' }} />
          </div>
        )}
      </div>

      {/* Reaction counts row */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          { post.likes.length > 0 && <img src="/assets/images/react_img1.png" alt="Image" className="_react_img" />}
          { post.likes.length > 1 && <img src="/assets/images/react_img2.png" alt="Image" className="_react_img" />}
          { post.likes.length > 2 && <p className="_feed_inner_timeline_total_reacts_para">{post.likes.length}</p>}
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <a href="#"><span>{post.comments.length}</span> Comment</a>
          </p>
        </div>
      </div>

      {/* Reaction buttons bar */}
      <div className="_feed_inner_timeline_reaction">
        <button
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? '_feed_reaction_active' : ''}`}
          onClick={() => onToggleLike(post._id)}
          type="button"
        >
          <span className="{`_feed_inner_timeline_reaction_link ${isLiked ? 'fw-bold' : ''}`}">
            <span>
              {isLiked ? 'Liked' : 'Like'}
            </span>
          </span>
        </button>
        <button
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
          onClick={() => setShowComments(prev => !prev)}
          type="button"
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
              </svg>
              Comment
            </span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_share _feed_reaction" type="button">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
              </svg>
              Share
            </span>
          </span>
        </button>
      </div>

      {/* Comment area */}
      {showComments && (
        <div className="_feed_inner_timeline_cooment_area _padd_r24 _padd_l24">
          <CommentSection
            comments={post.comments}
            postId={post._id}
            currentUserId={currentUserId}
            onAddComment={onAddComment}
            onToggleCommentLike={onToggleCommentLike}
            onDeleteComment={onDeleteComment}
            onAddReply={onAddReply}
            onToggleReplyLike={onToggleReplyLike}
            onDeleteReply={onDeleteReply}
          />
        </div>
      )}
    </div>
  )
}