'use client'

import useSWR from 'swr'
import { http } from '@/lib/http-client'

interface Author {
  _id: string
  firstName: string
  lastName: string
}

export interface Reply {
  _id: string
  postId: string
  parentId: string
  authorId: Author
  content: string
  likeCount: number
  isLiked: boolean
  createdAt: string
}

export interface Comment {
  _id: string
  postId: string
  parentId: null
  authorId: Author
  content: string
  likeCount: number
  isLiked: boolean
  replies: Reply[]
  createdAt: string
}

export interface Post {
  _id: string
  authorId: Author
  content: string
  imageUrl?: string
  visibility: 'public' | 'private'
  likeCount: number
  isLiked: boolean
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

const fetcher = (path: string) => http.get<{ posts: Post[] }>(path)

export function usePosts() {
  const { data, error, isLoading, mutate } = useSWR('/posts', fetcher)

  async function createPost(payload: {
    content: string
    imageUrl?: string
    visibility: 'public' | 'private'
  }) {
    await http.post('/posts', payload)
    await mutate()
  }

  async function deletePost(postId: string) {
    await http.delete(`/posts/${postId}`)
    await mutate()
  }

  async function toggleLike(targetId: string, targetType: 'post' | 'comment') {
    await http.post('/reactions', { targetId, targetType })
    await mutate()
  }

  async function addComment(postId: string, content: string, parentId: string | null = null) {
    await http.post(`/posts/${postId}/comments`, { content, parentId })
    await mutate()
  }

  async function deleteComment(postId: string, commentId: string) {
    await http.delete(`/posts/${postId}/comments/${commentId}`)
    await mutate()
  }

  return {
    posts: data?.posts ?? [],
    isLoading,
    error,
    createPost,
    deletePost,
    toggleLike,
    addComment,
    deleteComment,
  }
}