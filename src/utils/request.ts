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
