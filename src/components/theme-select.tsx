'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function ThemeSelect(props: any) {
  const [mounted, setMounted] = useState(false)

  const { theme, themes, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <select
      className='appearance-none rounded-lg px-2 py-1'
      value={theme}
      onChange={e => setTheme(e.target.value)}
      {...props}
    >
      {themes.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
