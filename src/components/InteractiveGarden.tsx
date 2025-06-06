'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { Dancing_Script } from 'next/font/google'
import { useTheme } from '@/context/ThemeContext';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing-script',
  display: 'swap',
})

// Definir a interface para os elementos interativos (flores/estrelas)
interface InteractiveElement {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'flower' | 'star';
}

interface TimeTogether {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Song {
  title: string;
  file: string;
  cover?: string;
}

const songs: Song[] = [
  { title: "Marry You", file: "/UmPoucoDaNossaHistoria/music/marry_you.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/marry_you.png" },
  { title: "My Universe", file: "/UmPoucoDaNossaHistoria/music/my_universe.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/my_universe.png" },
  { title: "Ai, Amor", file: "/UmPoucoDaNossaHistoria/music/Ai_Amor.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/ai_amor.png" },
  { title: "Velha Infância", file: "/UmPoucoDaNossaHistoria/music/velha_infancia.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/velha_infancia.png" },
  { title: "I Was Never There", file: "/UmPoucoDaNossaHistoria/music/i_was_never_there.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/i_was_never_there.png" },
  { title: "Samurai", file: "/UmPoucoDaNossaHistoria/music/Samurai.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/samurai.png" },
  { title: "Linha do Equador", file: "/UmPoucoDaNossaHistoria/music/linha_do_equador.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/linha_do_equador.png" },
  { title: "Eu Te Devoro", file: "/UmPoucoDaNossaHistoria/music/eu_te_devoro.mp3", cover: "/UmPoucoDaNossaHistoria/music/covers/eu_te_devoro.png" }
];

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-xl mt-8 w-full max-w-md border border-white/10"
    >
      <audio ref={audioRef} src={songs[currentSongIndex].file} />
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center flex-1">
          <h3 className={`text-2xl md:text-4xl font-semibold text-white/90 mb-4 text-center ${dancingScript.className}`}>
            {songs[currentSongIndex].title}
          </h3>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={playPrevious}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FaBackward className="text-white/90" />
            </button>
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <FaPause className="text-white/90" />
              ) : (
                <FaPlay className="text-white/90" />
              )}
            </button>
            <button
              onClick={playNext}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FaForward className="text-white/90" />
            </button>
          </div>
        </div>
        {songs[currentSongIndex].cover && (
          <img
            src={songs[currentSongIndex].cover}
            alt={songs[currentSongIndex].title + ' cover'}
            className="w-28 h-28 rounded-lg object-cover shadow-md border border-white/10"
          />
        )}
      </div>
    </motion.div>
  );
};

const InteractiveGarden: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [elements, setElements] = useState<InteractiveElement[]>([]);
  const [timeTogether, setTimeTogether] = useState<TimeTogether>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const gardenRef = useRef<HTMLDivElement>(null);

  const numElements = 20; // Número de elementos interativos

  // Função para criar e posicionar elementos interativos
  const createInteractiveElements = () => {
    const newElements: InteractiveElement[] = [];
    for (let i = 0; i < numElements; i++) {
      const type = Math.random() > 0.5 ? 'flower' : 'star';
      const size = type === 'flower' ? Math.random() * 20 + 15 : Math.random() * 10 + 5;
      const xPos = Math.random() * 90 + 5;
      const yPos = Math.random() * 70 + 20;

      newElements.push({
        id: i,
        x: xPos,
        y: yPos,
        size: size,
        type: type,
      });
    }
    setElements(newElements);
  };

  // Efeito para criar elementos na montagem e quando o tema muda (para re-renderizar com classes corretas)
  useEffect(() => {
    createInteractiveElements();
  }, [isDark]); // Recria elementos quando isDark muda

  useEffect(() => {
    const startDate = new Date('2022-06-04');

    const updateTime = () => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        // Pega o último dia do mês anterior
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      // Horas, minutos, segundos
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();
      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      if (hours < 0) {
        days--;
        hours += 24;
        if (days < 0) {
          months--;
          // Pega o último dia do mês anterior
          const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
          days += prevMonth.getDate();
          if (months < 0) {
            years--;
            months += 12;
          }
        }
      }

      setTimeTogether({ years, months, days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determinando classes de texto com base no tema local do componente
  const titleColor = isDark ? 'text-sky-100' : 'text-slate-700';
  const subtitleColor = isDark ? 'text-sky-200' : 'text-slate-600';
  const buttonBgColor = isDark ? 'bg-blue-900' : 'bg-pink-200'; // Exemplo, ajustar cores do seu tema
  const buttonTextColor = isDark ? 'text-pink-200' : 'text-blue-900'; // Exemplo, ajustar cores do seu tema

  return (
    <div className={`relative min-h-screen w-full overflow-hidden garden-bg ${isDark ? 'dark dark-mode-bg' : 'light light-mode-bg'} z-0`}>
      {/* Elementos interativos (flores/estrelas) */}
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`interactive-element ${
            element.type === 'flower' ? 'flower' : 'star'
          }`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          // Adicione animações se desejar (ex: pulsação, brilho)
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: Math.random() * 1.5 }}
          whileHover={{ scale: 1.2 }}
        >
           {/* Ícone opcional dentro do elemento */}
           {/* {element.type === 'flower' && <FaHeart className="text-pink-500" size={element.size * 0.6} />} */}
        </motion.div>
      ))}

      {/* Botão de alternar tema - agora fixo no canto inferior esquerdo */}
      <div id="themeToggle" className="fixed left-3 bottom-28 z-40">
        <div className="toggle-switch" onClick={toggleTheme}>
          <div className="toggle-slider"></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-4 pt-8 pb-20 min-h-screen flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center flex flex-col items-center w-full"
        >
          <h1 className={`text-4xl md:text-6xl font-bold text-pink-900 mb-8 ${dancingScript.className}`}>
            Nossa História de Amor
          </h1>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 md:p-8 shadow-xl w-full max-w-xs md:max-w-lg mx-auto">
            <h2 className={`text-3xl md:text-5xl text-gray-800 mb-6 ${dancingScript.className}`}>
              Juntos:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <TimeBlock value={timeTogether.years} label="Anos" />
              <TimeBlock value={timeTogether.months} label="Meses" />
              <TimeBlock value={timeTogether.days} label="Dias" />
              <TimeBlock value={timeTogether.hours} label="Horas" />
              <TimeBlock value={timeTogether.minutes} label="Minutos" />
              <TimeBlock value={timeTogether.seconds} label="Segundos" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="bg-pink-100 rounded-lg p-4"
    >
      <div className="text-3xl font-bold text-pink-600">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
}

export default InteractiveGarden; 