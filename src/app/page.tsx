import Link from 'next/link'

import { env } from '~~/env.mjs'

export default async function Home() {
  const result = await fetch(`${env.NEXT_PUBLIC_URL}/api/today`, {
    next: { revalidate: 0 },
    cache: 'no-store',
  }).then(res => res.json())

  return (
    <main className='space-y-4 p-4'>
      <div className='space-y-1'>
        <h3 className='text-2xl'>Bing Daily Wallpaper</h3>
        <p>Explore the world one photo at a time</p>
      </div>
      <div className='space-x-4 font-medium'>
        <Link
          className='link space-x-1 pb-1'
          href='/api/today'
          prefetch={false}
        >
          <span className='arrow'>→</span>
          <span>/api/today</span>
        </Link>
        <Link
          className='link space-x-1 pb-1'
          href='https://www.bing.com'
          prefetch={false}
        >
          <span className='arrow'>→</span>
          <span>Bing.com</span>
        </Link>
        <Link
          className='link space-x-1 pb-1'
          href='https://github.com/0ahz/bing-wallpaper'
          prefetch={false}
        >
          <span className='arrow'>→</span>
          <span>GitHub</span>
        </Link>
      </div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={result.url} alt={result.title} />
      </div>
    </main>
  )
}
