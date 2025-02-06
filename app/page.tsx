"use client";
import { useRef, Suspense } from 'react';
import Earth from '../components/Earth';
import RightEarth from '../components/RightEarth';
import TextContent from '../components/TextContent';
import RightTextContent from '../components/RightTextContent';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.3, 1], 
    ['0vh', '0vh', '-100vh']
  );

  return (
    <div ref={containerRef} style={{ height: '300vh' }}>
      <motion.div 
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          y: translateY
        }}
      >
        <section style={{ 
          height: '100vh',
          width: '100%',
          position: 'relative',
          backgroundImage: 'url(/images/bck.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Suspense fallback={null}>
            <Earth progress={scrollYProgress} />
            <TextContent progress={scrollYProgress} />
          </Suspense>
        </section>

        <section style={{ 
          height: '100vh',
          width: '100%',
          position: 'relative',
          backgroundImage: 'url(/images/bck.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Suspense fallback={null}>
            <RightEarth progress={scrollYProgress} />
            <RightTextContent progress={scrollYProgress} />
          </Suspense>
        </section>
      </motion.div>
    </div>
  );
}
