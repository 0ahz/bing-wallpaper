import { NextResponse } from 'next/server'
import { cleanDoubleSlashes, withQuery } from 'ufo'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query: Record<string, any> = {
    mkt: 'en-US',
    format: 'js',
    idx: 0,
    n: 1,
    uhd: 1,
    uhdwidth: 3840,
    uhdheight: 2160,
  }

  searchParams.forEach((value, key) => {
    query[key] = value
  })

  const bingUrl = 'https://www.bing.com'

  const requestUrl = withQuery(
    cleanDoubleSlashes(`${bingUrl}/HPImageArchive.aspx`),
    query,
  )

  const res = await fetch(requestUrl, {
    next: { revalidate: 60 * 10 },
  })

  const result = await res.json()

  const image = result.images[0]
  const url = cleanDoubleSlashes(`${bingUrl}${image.url}`)
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

  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
