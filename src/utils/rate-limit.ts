import LRU from 'lru-cache'

export type RateLimitOptions = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export const createRateLimit = (options: RateLimitOptions) => {
  const tokenCache = new LRU<string, number[]>({
    max: options.uniqueTokenPerInterval || 500,
    maxAge: options.interval || 60 * 1000,
  })

  return {
    check: (res: any, limit: number, token: string) =>
      new Promise((resolve, reject) => {
        const tokenCount: number[] = tokenCache.get(token) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1
        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit
        res.setHeader('X-RateLimit-Limit', limit)
        res.setHeader(
          'X-RateLimit-Remaining',
          isRateLimited ? 0 : limit - currentUsage
        )
        return isRateLimited ? reject() : resolve({})
      }),
  }
}
