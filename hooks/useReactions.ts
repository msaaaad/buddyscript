'use client'

import { useState } from 'react'
import { http } from '@/lib/http-client'

interface Reactor {
  _id: string
  userId: {
    _id: string
    firstName: string
    lastName: string
  }
}

export function useReactions() {
  const [reactors, setReactors] = useState<Reactor[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTarget, setActiveTarget] = useState<string | null>(null)

  async function fetchReactors(targetId: string, targetType: 'post' | 'comment') {
    if (activeTarget === targetId) {
      setActiveTarget(null)
      setReactors([])
      return
    }
    setIsLoading(true)
    setActiveTarget(targetId)
    try {
      const data = await http.get<{ reactors: Reactor[] }>(
        `/reactions?targetId=${targetId}&targetType=${targetType}`
      )
      setReactors(data.reactors)
    } finally {
      setIsLoading(false)
    }
  }

  function close() {
    setActiveTarget(null)
    setReactors([])
  }

  return { reactors, isLoading, activeTarget, fetchReactors, close }
}