"use client";
import { motion, useTransform } from 'framer-motion';
import Accordion from './Accordion';

export default function TextContent({ progress }) {
  const opacity = useTransform(progress, [0, 0.15, 0.3], [0, 1, 1]);
  const x = useTransform(progress, [0, 0.15], ["-100%", "0%"]);

  const accordionItems = [
    {
      title: "Profesionalus Biuro Perkraustymas",
      content: "Mūsų specialistai užtikrina sklandų biuro perkraustymą bet kokiu atstumu. Darbai atliekami greitai ir efektyviai, kad jūsų verslas patirtų minimalius trikdžius. Perkraustome visų dydžių biurus - nuo mažų ofisų iki didelių korporacijų."
    },
    {
      title: "Planavimas ir Pasiruošimas",
      content: "• Nemokama konsultacija ir biuro apžiūra\n• Detalus perkraustymo plano sudarymas\n• Profesionalus inventoriaus įvertinimas\n• Tikslus laiko ir resursų planavimas\n• Specialių pakavimo medžiagų parinkimas"
    },
    {
      title: "Įrangos ir Dokumentų Apsauga",
      content: "• Saugi IT įrangos transportavimo sistema\n• Konfidencialių dokumentų apsauga\n• Specialios dėžės jautriems įrenginiams\n• Draudimas transportavimo metu\n• Profesionalus pakavimo servisas"
    },
    {
      title: "Darbo Organizavimas",
      content: "• Patyrusi perkraustymo komanda\n• Modernūs krovimo įrenginiai\n• Specialus transportas biuro įrangai\n• Efektyvus darbų koordinavimas\n• 24/7 klientų aptarnavimas"
    }
  ];

  return (
    <motion.div 
      style={{ 
        opacity,
        x,
        position: 'absolute',
        left: '50%',
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
        Ofisų Perkraustymas
      </motion.h2>
      
      <motion.p 
        style={{ 
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
        }}
      >
        Teikiame profesionalias biurų perkraustymo paslaugas, užtikrindami sklandų procesą nuo planavimo iki įgyvendinimo. Mūsų patirtis leidžia užtikrinti, kad jūsų verslas patirs minimalius trikdžius perkraustymo metu.
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