"use client";
import { useState } from 'react';
import { motion, useTransform } from 'framer-motion';

export default function Accordion({ title, content, delay, progress }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const opacity = useTransform(
    progress, 
    [0, 0.15 + delay, 0.3], 
    [0, 1, 1]
  );

  return (
    <motion.div 
      style={{ 
        opacity,
        marginBottom: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
      className="accordion-container"
    >
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '1rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
        whileHover={{
          background: 'rgba(255, 255, 255, 0.15)',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{title}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '0.8rem' }}
        >
          ▼
        </motion.span>
      </motion.div>

      <motion.div
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{
          overflow: 'hidden',
          padding: isOpen ? '1rem' : '0 1rem',
          lineHeight: '1.6',
          fontSize: '1rem',
        }}
      >
        {content.split('\n').map((line, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            {line}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
