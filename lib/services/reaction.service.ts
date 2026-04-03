import { toggleReaction, getReactors } from '@/lib/repositories/reaction.repository'

export async function toggleReactionService(data: {
  targetId: string
  targetType: 'post' | 'comment'
  userId: string
}) {
  return toggleReaction(data)
}

export async function getReactorsService(targetId: string, targetType: 'post' | 'comment') {
  return getReactors(targetId, targetType)
}