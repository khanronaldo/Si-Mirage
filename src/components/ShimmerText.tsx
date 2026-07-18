import React from 'react';
import { motion } from 'motion/react';

interface ShimmerTextProps {
  text: string;
  baseColor?: string;
  shimmerColor?: string;
  className?: string;
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({
  text,
  baseColor = '#000000',
  shimmerColor = '#FF2800',
  className = '',
}) => {
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 40%, ${shimmerColor} 50%, ${baseColor} 60%)`,
        backgroundSize: '200% auto',
        color: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
      animate={{ backgroundPosition: ['200% center', '-200% center'] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
    >
      {text}
    </motion.span>
  );
};
