import { merge } from 'lodash'
import { cleanDoubleSlashes } from 'ufo'

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export type RequestOption = {
  method?: string
  headers?: Record<string, any>
  body?: any
  [k: string]: any
}

export async function request(url: string, opiton?: RequestOption) {
  const mergedOption = merge(
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    opiton
  )
  if (mergedOption.body && typeof mergedOption.body !== 'string') {
    mergedOption.body = JSON.stringify(mergedOption.body)
  }
  const absUrl = /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
    ? url
    : `${NEXT_PUBLIC_URL}/${url}`
  return await fetch(cleanDoubleSlashes(absUrl), mergedOption)
}

export async function requestPage(
  url: string,
  opiton?: RequestOption
): Promise<string> {
  const mergedOption = merge(
    {
      headers: {
        'Content-Type': 'text/html',
      },
    },
    opiton
  )
  const response = await request(url, mergedOption)
  return await response.text()
}

export async function requestWechatPage(
  url: string,
  opiton?: RequestOption
): Promise<string> {
  const mergedOption = merge(
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.14(0x18000e22) NetType/4G Language/zh_CN Device',
      },
    },
    opiton
  )
  return await requestPage(url, mergedOption)
}
