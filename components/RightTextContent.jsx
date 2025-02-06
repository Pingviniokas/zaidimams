"use client";
import { motion, useTransform } from 'framer-motion';
import Accordion from './Accordion';

export default function RightTextContent({ progress }) {
  const opacity = useTransform(progress, [0.3, 0.45, 1], [0, 1, 1]);
  const x = useTransform(progress, [0.3, 0.45], ["100%", "0%"]);

  const accordionItems = [
    {
      title: "Papildomos Paslaugos",
      content: "• Laikinas inventoriaus sandėliavimas\n• Senų baldų utilizavimas\n• Specialus valymas po perkraustymo\n• Naujų baldų surinkimas\n• Kabelių ir tinklų perjungimas"
    },
    {
      title: "Baldų Montavimas",
      content: "• Profesionalus baldų išrinkimas\n• Saugus transportavimas\n• Surinkimas naujoje vietoje\n• Baldų išdėstymo planavimas\n• Senų baldų utilizavimas"
    },
    {
      title: "IT Infrastruktūra",
      content: "• Serverių perkėlimas\n• Tinklo įrangos atjungimas/prijungimas\n• Kabelių žymėjimas ir tvarkymas\n• Duomenų apsaugos užtikrinimas\n• Skubus IT sistemų paleidimas"
    },
    {
      title: "Garantijos ir Draudimas",
      content: "• Pilnas turto draudimas\n• Garantija darbams\n• Konfidencialumo užtikrinimas\n• Dokumentuotas perdavimas\n• Profesionali atsakomybė"
    }
  ];

  return (
    <motion.div 
      style={{ 
        opacity,
        x,
        position: 'absolute',
        right: '50%',
        width: '45%',
        padding: '2rem',
        color: 'white',
        background: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <motion.h2 
        style={{ 
          fontSize: '2.5rem',
          marginBottom: '1.5rem',
          color: '#fff',
        }}
      >
        Papildomos Paslaugos
      </motion.h2>
      
      <motion.p 
        style={{ 
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}
      >
        Šalia pagrindinio biuro perkraustymo siūlome platų papildomų paslaugų spektrą, kad užtikrintume visapusišką ir sklandų jūsų biuro perkėlimą į naujas patalpas. Mūsų profesionalų komanda pasirūpins visomis detalėmis.
      </motion.p>

      {accordionItems.map((item, index) => (
        <Accordion 
          key={index}
          title={item.title}
          content={item.content}
          delay={index * 0.1}
          progress={progress}
        />
      ))}
    </motion.div>
  );
}