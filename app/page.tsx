"use client";
import Earth from '../components/Earth';
import { motion, useScroll } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div style={{ height: '300vh' }}>
      <div style={{ 
        position: 'fixed', 
        width: '100%', 
        height: '100%',
        backgroundImage: 'url(/images/bck.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Earth />
      </div>
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '2rem',
          opacity: scrollYProgress,
        }}
      >
        Scroll to rotate and zoom!
      </motion.div>
    </div>
  );
}