// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withQuery } from 'ufo'
import { request } from 'utils/request'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = 'https://cn.bing.com/HPImageArchive.aspx'
  const query: Record<string, any> = {
    format: "js",
    idx: 0,
    n: 1,
    uhd: 1,
    uhdwidth: 3840,
    uhdheight: 2160,
  }
  const result = await request(withQuery(url,query)).then(res => res.json())
  res.status(200).json(result)
}
