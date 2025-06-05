'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaForward, FaBackward, FaChevronLeft, FaMusic } from 'react-icons/fa';
import { Dancing_Script } from 'next/font/google';
import { Howl } from 'howler';
import { usePathname } from 'next/navigation';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing-script',
  display: 'swap',
});

const songs = [
  { title: "Marry You", file: "/marry_you.mp3", cover: "/covers/marry_you.png" },
  { title: "My Universe", file: "/my_universe.mp3", cover: "/covers/my_universe.png" },
  { title: "Ai, Amor", file: "/ai_amor.mp3", cover: "/covers/ai_amor.png" },
  { title: "Velha Infância", file: "/velha_infancia.mp3", cover: "/covers/velha_infancia.png" },
  { title: "I Was Never There", file: "/i_was_never_there.mp3", cover: "/covers/i_was_never_there.png" },
  { title: "Samurai", file: "/samurai.mp3", cover: "/covers/samurai.png" },
  { title: "Linha do Equador", file: "/linha_do_equador.mp3", cover: "/covers/linha_do_equador.png" },
  { title: "Chuva de Arroz", file: "/chuva.mp3", cover: "/covers/chuva.png" },
  { title: "Eu Amo Você", file: "/amo.mp3", cover: "/covers/amo.png" },
];

const FloatingPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const pathname = usePathname();

  // Minimizar automaticamente ao trocar de rota
  useEffect(() => {
    setMinimized(true);
  }, [pathname]);

  useEffect(() => {
    soundRef.current?.stop();
    const sound = new Howl({
      src: [songs[currentSongIndex].file],
      html5: true,
      volume: 0.7,
      onend: () => setIsPlaying(false),
    });
    soundRef.current = sound;
    if (isPlaying) {
      sound.play();
    }
    return () => {
      sound.unload();
    };
    // eslint-disable-next-line
  }, [currentSongIndex]);

  useEffect(() => {
    if (isPlaying) {
      soundRef.current?.play();
    } else {
      soundRef.current?.pause();
    }
    // eslint-disable-next-line
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  return (
    <AnimatePresence>
      {minimized ? (
        <motion.div
          key="minimized"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-28 md:bottom-24 right-3 z-50 cursor-pointer"
        >
          <div
            className="bg-pink-500 rounded-full shadow-lg flex items-center px-3 py-2 space-x-2 hover:bg-pink-600 transition-colors"
            onClick={() => setMinimized(false)}
            title="Mostrar player"
          >
            <FaMusic className="text-white text-lg" />
            <span className={`text-white font-semibold text-sm md:text-base ${dancingScript.className}`}>{songs[currentSongIndex].title}</span>
            <FaChevronLeft className="text-white text-base" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="player"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-28 md:bottom-24 right-3 z-50"
        >
          <div className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4 md:p-6 md:space-x-6">
            {/* Capa */}
            <img
              src={songs[currentSongIndex].cover}
              alt={songs[currentSongIndex].title + ' cover'}
              className="w-20 h-20 md:w-28 md:h-28 rounded-lg object-cover shadow-md"
            />
            {/* Info e controles */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <h3 className={`truncate text-lg md:text-2xl font-semibold text-gray-800 mb-2 text-center ${dancingScript.className}`}>
                {songs[currentSongIndex].title}
              </h3>
              <div className="flex justify-center items-center space-x-2 md:space-x-4">
                <button
                  onClick={playPrevious}
                  className="p-2 rounded-full hover:bg-pink-100 transition-colors"
                  title="Anterior"
                >
                  <FaBackward className="text-pink-600 text-lg md:text-2xl" />
                </button>
                <button
                  onClick={togglePlay}
                  className="p-4 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors"
                  title={isPlaying ? 'Pausar' : 'Tocar'}
                >
                  {isPlaying ? (
                    <FaPause className="text-white text-xl md:text-2xl" />
                  ) : (
                    <FaPlay className="text-white text-xl md:text-2xl" />
                  )}
                </button>
                <button
                  onClick={playNext}
                  className="p-2 rounded-full hover:bg-pink-100 transition-colors"
                  title="Próxima"
                >
                  <FaForward className="text-pink-600 text-lg md:text-2xl" />
                </button>
              </div>
            </div>
            {/* Botão minimizar */}
            <button
              onClick={() => setMinimized(true)}
              className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Minimizar"
            >
              <FaChevronLeft className="text-gray-500 text-lg" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingPlayer; 