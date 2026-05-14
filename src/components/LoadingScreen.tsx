import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'black' | 'name' | 'line' | 'done'>('black');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('name'), 600);
    const t2 = setTimeout(() => setPhase('line'), 1400);
    const t3 = setTimeout(() => setPhase('done'), 2600);
    const t4 = setTimeout(() => onComplete(), 3100);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: "url(data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'name' || phase === 'line' ? 1 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="text-[11px] tracking-[0.55em] uppercase text-white/70 font-light select-none"
          >
            Genald Komino
          </motion.p>
          <div className="relative mt-5 h-px w-32 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/25"
              initial={{ width: '0%' }}
              animate={{ width: phase === 'line' ? '100%' : '0%' }}
              transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
