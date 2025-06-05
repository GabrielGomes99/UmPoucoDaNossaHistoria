'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaImages, FaEnvelope, FaGift, FaMusic, FaHistory } from 'react-icons/fa'

const navItems = [
  { href: '/', label: 'Início', icon: FaHome },
  { href: '/messages', label: 'Mensagens', icon: FaEnvelope },
  { href: '/timeline', label: 'Linha do Tempo', icon: FaHistory },
]

const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40">
      <div className="container mx-auto px-4">
        <ul className="flex flex-row justify-around py-3 w-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.li
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 text-center"
              >
                <Link href={item.href} className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${isActive ? 'text-pink-600' : 'text-gray-600 hover:text-pink-500'}`}>
                  <item.icon className="text-xl" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation 