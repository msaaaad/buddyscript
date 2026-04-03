import { Post, IPost } from '@/lib/models/Post'
import mongoose from 'mongoose'

export async function createPost(data: {
  authorId: string
  content: string
  imageUrl?: string
  visibility: 'public' | 'private'
}): Promise<IPost> {
  const post = new Post(data)
  return post.save()
}

export async function getPosts(viewerId: string) {
  return Post.find({
    $or: [
      { visibility: 'public' },
      { visibility: 'private', authorId: viewerId },
    ],
  })
    .sort({ createdAt: -1 })
    .populate('authorId', 'firstName lastName')
    .lean()
}

export async function findPostById(postId: string) {
  return Post.findById(postId)
}

export async function deletePost(postId: string, userId: string) {
  const post = await Post.findById(postId)
  if (!post) throw new Error('POST_NOT_FOUND')
  if (post.authorId.toString() !== userId) throw new Error('FORBIDDEN')
  return Post.findByIdAndDelete(postId)
}