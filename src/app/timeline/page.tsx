'use client'

import Timeline from '@/components/Timeline'
import { useTheme } from '@/context/ThemeContext'

export default function TimelinePage() {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark dark-mode-bg' : 'light light-mode-bg'}`}>
      <Timeline />
    </div>
  )
} 