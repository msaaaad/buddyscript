import { Reaction } from '@/lib/models/Reaction'

export async function toggleReaction(data: {
  targetId: string
  targetType: 'post' | 'comment'
  userId: string
}) {
  const existing = await Reaction.findOne({
    targetId: data.targetId,
    targetType: data.targetType,
    userId: data.userId,
  })

  if (existing) {
    await Reaction.findByIdAndDelete(existing._id)
    return { liked: false }
  }

  await Reaction.create(data)
  return { liked: true }
}

export async function getReactionCount(targetId: string, targetType: 'post' | 'comment') {
  return Reaction.countDocuments({ targetId, targetType })
}

export async function getReactionCounts(targetIds: string[], targetType: 'post' | 'comment') {
  const counts = await Reaction.aggregate([
    { $match: { targetId: { $in: targetIds.map(id => new (require('mongoose').Types.ObjectId)(id)) }, targetType } },
    { $group: { _id: '$targetId', count: { $sum: 1 } } },
  ])
  return Object.fromEntries(counts.map((c: any) => [c._id.toString(), c.count]))
}

export async function getUserReactions(targetIds: string[], targetType: 'post' | 'comment', userId: string) {
  const reactions = await Reaction.find({
    targetId: { $in: targetIds },
    targetType,
    userId,
  }).lean()
  return new Set(reactions.map(r => r.targetId.toString()))
}

export async function getReactors(targetId: string, targetType: 'post' | 'comment') {
  return Reaction.find({ targetId, targetType })
    .populate('userId', 'firstName lastName')
    .lean()
}