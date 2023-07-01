import './globals.css'
import { Nunito } from 'next/font/google'
import { ThemeProvider } from '~/components/theme-provider'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Bing Daily Wallpaper',
    template: '%s - Bing Daily Wallpaper',
  },
  description: 'Bing Daily Wallpaper - Explore the world one photo at a time',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000212' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    minimumScale: 1.0,
    userScalable: false,
    viewportFit: 'cover',
  },
  icons: {
    icon: [
      {
        // url: '/favicon.ico',
        // url: '/favicon.svg',
        type: 'image/svg+xml',
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={nunito.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
