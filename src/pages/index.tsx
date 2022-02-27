import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>
          Bing Daily Wallpaper - Explore the world one photo at a time
        </title>
      </Head>
      <h3 className="title">Bing Daily Wallpaper</h3>
      <p className="desc">Explore the world one photo at a time</p>
      <a className="link" href="https://www.bing.com">
        <span className="arrow">→</span>
        <span>Bing.com</span>
      </a>
      <a className="link" href="https://github.com/0ahz/bing-wallpaper">
        <span className="arrow">→</span>
        <span>GitHub</span>
      </a>
    </div>
  )
}

export default Home
