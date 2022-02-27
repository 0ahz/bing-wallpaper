// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withQuery } from 'ufo'
import cors from 'cors'
import { request } from 'utils/request'
import { createMiddleware } from 'utils/middleware'
import { createRateLimit } from 'utils/rate-limit'

type ResultData = Record<string, any>

const corsMiddleware = createMiddleware(cors({ methods: ['GET'] }))

const rateLimit = createRateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResultData>
) {
  try {
    await rateLimit.check(res, 10, 'CACHE_TOKEN')
  } catch (err) {
    res.status(429).json({ error: 'Rate limit exceeded' })
    return
  }
  await corsMiddleware(req, res)
  const bingUrl = 'https://www.bing.com'
  const query: Record<string, any> = {
    mkt: 'en-US',
    format: 'js',
    idx: 0,
    n: 1,
    uhd: 1,
    uhdwidth: 3840,
    uhdheight: 2160,
    ...req.query,
  }
  const result = await request(
    withQuery(`${bingUrl}/HPImageArchive.aspx`, query)
  ).then(res => res.json())
  res.status(200).json(parseQueryResult(result, bingUrl))
}

function parseQueryResult(result: any, bingUrl: string): any {
  if (!result?.images?.length) return null
  const image = result.images[0]
  const url = `${bingUrl}${image.url}`
  const data = {
    hsh: image.hsh,
    title: image.title,
    copyright: image.copyright,
    copyrightlink: image.copyrightlink,
    enddate: image.enddate,
    startdate: image.startdate,
    fullstartdate: image.fullstartdate,
    url,
  }
  return data
}
