import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const zodiacSymbols = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

export default function OpeningAnimation({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Starfield */}
          <div className="absolute inset-0 starfield" />

          {/* Rotating ring */}
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-[220px] h-[220px] md:w-[350px] md:h-[350px] rounded-full border border-secondary/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Zodiac symbols in circle */}
          {zodiacSymbols.map((symbol, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const r = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 185;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <motion.span
                key={symbol}
                className="absolute text-xl md:text-2xl zodiac-symbol"
                style={{ left: `calc(50% + ${x}px - 12px)`, top: `calc(50% + ${y}px - 12px)` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
              >
                {symbol}
              </motion.span>
            );
          })}

          {/* Center text */}
          <motion.div
            className="relative text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-4xl font-display title-cosmic tracking-[0.2em]">
              西洋星盤復盤
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 tracking-widest">
              宇宙能量的軌跡
            </p>
          </motion.div>

          {/* Orbiting planet dots */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-secondary' : 'bg-accent'}`}
              style={{ left: '50%', top: '50%' }}
              animate={{
                x: [0, Math.cos(i * 2.1) * (100 + i * 40), Math.cos(i * 2.1 + Math.PI) * (100 + i * 40), 0],
                y: [0, Math.sin(i * 2.1) * (100 + i * 40), Math.sin(i * 2.1 + Math.PI) * (100 + i * 40), 0],
              }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
