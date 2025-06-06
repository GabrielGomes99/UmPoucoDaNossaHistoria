'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaHeart, FaCalendarAlt, FaImage, FaVideo, FaVolumeUp, FaPalette, FaMusic, FaPlane, FaRing, FaTree } from 'react-icons/fa'
import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'

interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  details?: {
    additionalText?: string
    images?: string[]
    videos?: string[]
    audio?: string
  }
}

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing-script',
  display: 'swap',
});

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: '26/04/2022',
    title: 'Nosso Primeiro Encontro',
    description: 'O dia em que nossos olhares se cruzaram pela primeira vez...',
    icon: FaHeart,
    details: {
      additionalText: 'Lembro perfeitamente do seu sorriso naquele dia...',
      images: ['/UmPoucoDaNossaHistoria/memories/primeiro_encontro.jpg'],
    },
  },
  {
    id: 2,
    date: '04/06/2022',
    title: 'Pedido de Namoro',
    description: 'O dia do GRANDE PEDIDO DE NAMORO...',
    icon: FaRing,
    details: {
      additionalText: 'Lembro perfeitamente do seu sorriso naquele dia e da nossa noite...',
      images: ['/UmPoucoDaNossaHistoria/memories/pedido.jpg','/UmPoucoDaNossaHistoria/memories/pedido1.jpg'],
    },
  },
  {
    id: 3,
    date: '12/06/2022',
    title: 'Primeiro Dia dos Namorados',
    description: 'Celebrando Nosso Primeiro Dia dos Namorados...',
    icon: FaHeart,
    details: {
      additionalText: 'Que dia perfeito e inesquecível que tivemos e exeperiências novas.',
      images: ['/UmPoucoDaNossaHistoria/memories/primeiro_dia_dos_namorados.jpg','/UmPoucoDaNossaHistoria/memories/2.jpg'],
    },
  },
  {
    id: 4,
    date: '04/08/2022',
    title: 'Nossa Primeira Exposição Juntos',
    description: 'Visitamos nossa primeira exposição juntos, um momento cheio de arte, cultura e muito amor!',
    icon: FaPalette,
    details: {
      additionalText: 'Foi um dia especial, cheio de descobertas e sorrisos ao seu lado.',
      images: ['/UmPoucoDaNossaHistoria/memories/vangogh.jpg'],
      videos: ['/UmPoucoDaNossaHistoria/memories/vangogh.mp4'],
    },
  },
  {
    id: 5,
    date: '31/12/2022',
    title: 'Primeiro Ano Novo Juntos',
    description: 'Celebrando Um Novo Ano Com a Mulher da Minha Vida...',
    icon: FaHeart,
    details: {
      images: ['/UmPoucoDaNossaHistoria/memories/anonovo.jpg', '/UmPoucoDaNossaHistoria/memories/anonovo1.jpg'],
    },
  },
  {
    id: 6,
    date: '04/06/2023',
    title: 'Primeiro Aniversário',
    description: 'Celebrando um ano de amor e felicidade juntos...',
    icon: FaHeart,
    details: {
      additionalText: 'Que noite maravilhosa e gostosa que tivemos.',
      images: ['/UmPoucoDaNossaHistoria/memories/1ano.jpg', '/UmPoucoDaNossaHistoria/memories/1ano1.jpg'],
    },
  },
  {
    id: 7,
    date: '06/10/2023',
    title: 'Primeira Viagem Juntos',
    description: 'Uma Viagem perfeita para o Rio de Janeiro...',
    icon: FaPlane,
    details: {
      additionalText: 'Que viagem maravilhosa e gostosa que tivemos.',
      images: ['/UmPoucoDaNossaHistoria/memories/viagem_rj.jpg'],
      videos: ['/UmPoucoDaNossaHistoria/memories/viagem_rj.mp4'],
    },
  },
  {
    id: 8,
    date: '25/12/2023',
    title: 'Primeiro Natal Juntos',
    description: 'Nosso Primeiro Natal Juntos não tenho palavras...',
    icon: FaTree,
    details: {
      images: ['/UmPoucoDaNossaHistoria/memories/natal.jpg', '/UmPoucoDaNossaHistoria/memories/natal1.jpg'],
    },
  },
  {
    id: 9,
    date: '04/06/2024',
    title: 'Segundo Aniversário',
    description: 'Dois anos de momentos inesquecíveis...',
    icon: FaHeart,
    details: {
      additionalText: 'Dois anos celebrado de uma maneira maravilhosa.',
      images: ['/UmPoucoDaNossaHistoria/memories/2ano.jpg', '/UmPoucoDaNossaHistoria/memories/2ano2.jpg'],
    },
  },
  {
    id: 10,
    date: '05/07/2024',
    title: 'Show Djavan',
    description: 'Noite de show do Djavan, um show incrível e emocionante...',
    icon: FaMusic,
    details: {
      additionalText: 'Que melhor maneira de comemorar nosso aniversário de namoro',
      images: ['/UmPoucoDaNossaHistoria/memories/djavan.jpg'],
      videos: ['/UmPoucoDaNossaHistoria/memories/djavan.mp4'],
    },
  },
  {
    id: 11,
    date: '07/09/2024',
    title: 'Viagem para São Paulo',
    description: 'Nossa segunda viagem juntos e mais uma vez o show do The Weeknd...',
    icon: FaPlane,
    details: {
      images: ['/UmPoucoDaNossaHistoria/memories/viagem_sp1.jpg', '/UmPoucoDaNossaHistoria/memories/viagem_sp.jpg'],
    },
  },
  {
    id: 12,
    date: '28/10/2024',
    title: 'Show do Bruno Mars',
    description: 'Que noite gostosa!!...',
    icon: FaMusic,
    details: {
      images: ['/UmPoucoDaNossaHistoria/memories/show_bruno_mars.jpg', '/UmPoucoDaNossaHistoria/memories/show_bruno_mars1.jpg'],
    },
  },
  {
    id: 13,
    date: '25/12/2024',
    title: 'Segundo Natal Juntos',
    description: 'Nosso Segundo Natal Juntos que maravilhoso...',
    icon: FaTree,
    details: {
      images: ['/UmPoucoDaNossaHistoria/memories/natal.jpg', '/UmPoucoDaNossaHistoria/memories/natal1.jpg'],
    },
  },
  {
    id: 14,
    date: '04/06/2025',
    title: 'Terceiro Aniversário',
    description: 'Três anos com a mulher da minha vida...',
    icon: FaHeart,
    details: {
      additionalText: 'Nosso amor só cresce a cada dia!',
    },
  },
]

export default function Timeline() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const selectedEvent = timelineEvents.find((event) => event.id === selectedEventId)

  return (
    <div className="py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className={`text-4xl md:text-5xl font-bold text-center text-pink-600 mb-12 ${dancingScript.className}`}>
          Um Pouco da Nossa História
        </h2>

        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200" />

          {/* Eventos */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center ${
                    isLeft ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`w-full sm:w-1/2 ${
                      isLeft ? 'sm:pr-12 text-left sm:text-right' : 'sm:pl-12'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-lg p-6 shadow-lg cursor-pointer"
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="text-pink-500 text-xl" />
                        <h3 className={`text-2xl font-semibold text-gray-800 ${dancingScript.className}`}>
                          {event.title}
                        </h3>
                      </div>
                      <p className="text-pink-600 font-medium mb-2">
                        {event.date}
                      </p>
                      <p className="text-gray-600">{event.description}</p>
                    </motion.div>
                  </div>

                  {/* Ponto na linha do tempo */}
                  {/* Removed the pink dot element */}

                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Modal de detalhes do evento */}
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto"
            onClick={() => setSelectedEventId(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg max-w-2xl w-full my-8 p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl z-10"
                onClick={() => setSelectedEventId(null)}
              >
                &times;
              </button>
              <div className="flex justify-between items-center mb-4 pr-8">
                <h3 className="text-2xl font-semibold text-pink-600">
                  {selectedEvent.title}
                </h3>
                <selectedEvent.icon className="text-2xl text-pink-500" />
              </div>
              <p className="text-gray-600 font-medium mb-4">
                {selectedEvent.date}
              </p>
              <p className="text-gray-700 mb-4">
                {selectedEvent.description}
              </p>

              {/* Detalhes Adicionais */}
              {selectedEvent.details && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  {selectedEvent.details.additionalText && (
                    <p className="text-gray-800 mb-4">{selectedEvent.details.additionalText}</p>
                  )}
                  {selectedEvent.details.images && selectedEvent.details.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {selectedEvent.details.images.map((image, idx) => (
                        <div key={idx} className="relative aspect-square">
                          <Image 
                            src={image} 
                            alt={`Imagem ${idx + 1}`} 
                            fill
                            className="rounded-md object-cover" 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedEvent.details.videos && selectedEvent.details.videos.length > 0 && (
                    <div className="space-y-4 mb-4">
                      {selectedEvent.details.videos.map((video, idx) => (
                        <video 
                          key={idx} 
                          src={video} 
                          controls 
                          className="w-full rounded-md"
                        />
                      ))}
                    </div>
                  )}
                  {selectedEvent.details.audio && (
                    <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md">
                      <audio src={selectedEvent.details.audio} controls className="w-full" />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 