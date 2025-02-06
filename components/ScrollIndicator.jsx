"use client";
import { motion, useTransform } from 'framer-motion';

export default function ScrollIndicator({ progress }) {
  const opacity = useTransform(progress, [0, 0.2], [1, 0]);

  return (
    <motion.div 
      className="scroll-indicator"
      style={{ opacity }}
    >
      <motion.div
        className="bounce"
        style={{
          color: 'white',
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        onClick={() => window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        })}
      >
        ↓
      </motion.div>
    </motion.div>
  );
}
