'use client'

import useSWR from 'swr'
import { http } from '@/lib/http-client'

interface Author {
  _id: string
  firstName: string
  lastName: string
}

interface Reply {
  _id: string
  authorId: Author
  content: string
  likes: string[]
  createdAt: string
}

interface Comment {
  _id: string
  authorId: Author
  content: string
  likes: string[]
  replies: Reply[]
  createdAt: string
}

export interface Post {
  _id: string
  authorId: Author
  content: string
  imageUrl?: string
  visibility: 'public' | 'private'
  likes: string[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

const fetcher = (path: string) => http.get<{ posts: Post[] }>(path).then(d => d)

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

  async function toggleLike(postId: string) {
    await http.post(`/posts/${postId}/like`)
    await mutate()
  }

  async function addComment(postId: string, content: string) {
    await http.post(`/posts/${postId}/comments`, { content })
    await mutate()
  }

  async function deleteComment(postId: string, commentId: string) {
    await http.delete(`/posts/${postId}/comments/${commentId}`)
    await mutate()
  }

  async function toggleCommentLike(postId: string, commentId: string) {
    await http.post(`/posts/${postId}/comments/${commentId}/like`)
    await mutate()
  }

  async function addReply(postId: string, commentId: string, content: string) {
    await http.post(`/posts/${postId}/comments/${commentId}/replies`, { content })
    await mutate()
  }

  async function deleteReply(postId: string, commentId: string, replyId: string) {
    await http.delete(`/posts/${postId}/comments/${commentId}/replies/${replyId}`)
    await mutate()
  }

  async function toggleReplyLike(postId: string, commentId: string, replyId: string) {
    await http.post(`/posts/${postId}/comments/${commentId}/replies/${replyId}/like`)
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
    toggleCommentLike,
    addReply,
    deleteReply,
    toggleReplyLike,
  }
}