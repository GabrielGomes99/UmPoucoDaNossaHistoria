'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ParallaxImage from '@/components/ParallaxImage'
import { useTheme } from '@/context/ThemeContext'

const memories = [
  {
    id: 1,
    title: 'Nosso Primeiro Encontro',
    description: 'O dia em que tudo começou...',
    type: 'image',
    file: '/memories/primeiro_encontro.jpg', // Para imagens, use a propriedade file
  },
  {
    id: 2,
    title: 'Primeira Viagem Juntos para o Rio de Janeiro',
    description: 'Nossa primeira viagem juntos e Show do The Weeknd...',
    type: 'image',
    file: '/memories/viagem_rj.jpg',
  },
  {
    id: 3,
    title: 'Primeiro Show',
    description: 'Show do The Weeknd, Momento Inesquecível...',
    type: 'video',
    file: '/memories/viagem_rj.mp4',
  },
  {
    id: 4,
    title: 'Primeiro Dia dos Namorados',
    description: 'Nosso primeiro dia de namorados...',
    type: 'image',
    file: '/memories/primeiro_dia_dos_namorados.jpg',
  },
  {
    id: 5,
    title: 'Show do Bruno Mars',
    description: 'Show Inesquecível do Bruno Mars...',
    type: 'image',
    file: '/memories/show_bruno_mars.jpg',
  },
  // Exemplo de como adicionar um vídeo:
   {
    id: 6,
    title: 'Vídeo Especial de um Momento Inesquecível',
    description: 'Um momento inesquecível em vídeo da Nossa Exposição do Vangogh...',
    type: 'video',
    file: '/memories/vangogh.mp4',
  },
  // Exemplo de como adicionar um áudio:
  {
    id: 7,
    title: 'Viagem São Paulo',
    description: 'Nossa Viagem Incrível para São Paulo...',
    type: 'image',
    file: '/memories/viagem_sp.jpg',
  },
  // Adicione mais memórias (imagens, vídeos, áudios) conforme necessário
]

export default function Memories() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const { isDark } = useTheme();
  const memory = memories.find((m) => m.id === selectedMemory);

  return (
    <div className={`min-h-screen py-12 px-4 transition-colors duration-500 ${isDark ? 'dark dark-mode-bg' : 'light light-mode-bg'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-12">
          Nossas Memórias
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memoryItem) => (
            <motion.div
              key={memoryItem.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedMemory(memoryItem.id)}
            >
              <div className="relative h-64 w-full">
                {memoryItem.type === 'image' && (
                  <ParallaxImage
                    src={memoryItem.file}
                    alt={memoryItem.title}
                    className="h-full w-full object-cover"
                  />
                )}
                {memoryItem.type === 'video' && (
                   <video src={memoryItem.file} controls className="h-full w-full object-cover"></video>
                )}
                 {memoryItem.type === 'audio' && (
                   <div className="h-full w-full flex items-center justify-center bg-gray-100">
                     <audio src={memoryItem.file} controls></audio>
                   </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {memoryItem.title}
                </h3>
                <p className="text-gray-600">{memoryItem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedMemory && memory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl z-10"
                 onClick={() => setSelectedMemory(null)}
              >
                &times;
              </button>
              <div className="relative h-96 w-full">
                {memory.type === 'image' && (
                   <img src={memory.file} alt={memory.title} className="h-full w-full object-contain" />
                )}
                {memory.type === 'video' && (
                   <video src={memory.file} controls className="h-full w-full object-contain"></video>
                )}
                {memory.type === 'audio' && (
                   <div className="h-full w-full flex items-center justify-center bg-gray-100">
                     <audio src={memory.file} controls></audio>
                   </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {memory.title}
                </h3>
                <p className="text-gray-600">
                  {memory.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 