'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaMusic, FaPause, FaPlay } from 'react-icons/fa'
import { Howl } from 'howler'

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState<Howl | null>(null)

  useEffect(() => {
    // Substitua 'music.mp3' pelo nome do seu arquivo de música
    const newSound = new Howl({
      src: ['/music/music.mp3'],
      loop: true,
      volume: 0.5,
    })

    setSound(newSound)

    return () => {
      newSound.stop()
    }
  }, [])

  const togglePlay = () => {
    if (!sound) return

    if (isPlaying) {
      sound.pause()
    } else {
      sound.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-20 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg z-50"
      onClick={togglePlay}
    >
      {isPlaying ? (
        <FaPause className="text-pink-600 text-xl" />
      ) : (
        <FaPlay className="text-pink-600 text-xl" />
      )}
    </motion.button>
  )
} 