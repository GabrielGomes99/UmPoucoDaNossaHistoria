'use client';

import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa6';
import { useState, useEffect } from 'react';

const Garden = () => {
  const [elements, setElements] = useState<{
    flowers: Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      color: string;
    }>;
    leaves: Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      rotation: number;
    }>;
  }>({
    flowers: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      size: 15,
      delay: 0,
      color: '#FFB6C1',
    })),
    leaves: Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      size: 10,
      delay: 0,
      rotation: 0,
    })),
  });

  useEffect(() => {
    setElements({
      flowers: Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 2,
        color: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFE4E1'][Math.floor(Math.random() * 4)],
      })),
      leaves: Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 5,
        delay: Math.random() * 2,
        rotation: Math.random() * 360,
      })),
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.flowers.map((flower) => (
        <motion.div
          key={`flower-${flower.id}`}
          className="absolute"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            delay: flower.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaRegStar
            size={flower.size}
            className="text-pink-300"
            style={{ color: flower.color }}
          />
        </motion.div>
      ))}

      {elements.leaves.map((leaf) => (
        <motion.div
          key={`leaf-${leaf.id}`}
          className="absolute"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
          }}
          initial={{ scale: 0, opacity: 0, rotate: leaf.rotation }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
            rotate: [leaf.rotation, leaf.rotation + 10, leaf.rotation],
          }}
          transition={{
            duration: 4,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaLeaf
            size={leaf.size}
            className="text-green-400"
          />
        </motion.div>
      ))}

      {/* Gradiente de fundo suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-white/20 to-green-50/30" />
    </div>
  );
};

export default Garden; 