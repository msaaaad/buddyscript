'use client'

import { useState } from 'react'

interface LikeButtonProps {
  likes: string[]
  currentUserId: string
  onToggle: () => Promise<void>
  showWho?: boolean
}

export default function LikeButton({ likes, currentUserId, onToggle, showWho = false }: LikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isLiked = likes.includes(currentUserId)

  async function handleClick() {
    setIsLoading(true)
    try {
      await onToggle()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="_feed_likes_wrap">
      <button
        type="button"
        className={`_feed_like_btn ${isLiked ? '_liked' : ''}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path
            stroke={isLiked ? '#ff4d4f' : '#666'}
            fill={isLiked ? '#ff4d4f' : 'none'}
            strokeWidth="1.5"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <span>{likes.length}</span>
      </button>
      {showWho && likes.length > 0 && (
        <span className="_liked_by">
          {likes.length === 1 ? '1 like' : `${likes.length} likes`}
        </span>
      )}
    </div>
  )
}