import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEOS = [
  { src: '/videos/webm/1.webm',  title: 'Midnight Frame',  category: 'Commercial'   },
  { src: '/videos/webm/2.webm',  title: 'Neon Pulse',      category: 'Music Visual' },
  { src: '/videos/webm/3.webm',  title: 'Urban Quiet',     category: 'Editorial'    },
  { src: '/videos/webm/4.webm',  title: 'Amber Hour',      category: 'Documentary'  },
  { src: '/videos/webm/5.webm',  title: 'Still Motion',    category: 'Commercial'   },
  { src: '/videos/webm/6.webm',  title: 'Depth of Field',  category: 'Editorial'    },
  { src: '/videos/webm/7.webm',  title: 'Raw Light',       category: 'Narrative'    },
  { src: '/videos/webm/8.webm',  title: 'Negative Space',  category: 'Music Visual' },
  { src: '/videos/webm/9.webm',  title: 'Silver Grain',    category: 'Commercial'   },
  { src: '/videos/webm/10.webm', title: 'Open Shutter',    category: 'Documentary'  },
];

const EASE = 'cubic-bezier(0.25,0.1,0.25,1)';

function BgVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const play = () => el.play().catch(() => {});
    if (el.readyState >= 2) play();
    else el.addEventListener('canplay', play, { once: true });
  }, [src]);
  return (
    <video
      ref={ref} src={src} muted loop playsInline
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%', objectFit: 'cover',
        filter: 'blur(10px)', transform: 'scale(1.08)',
        pointerEvents: 'none',
      }}
    />
  );
}

function VideoSlide({ video, active, preload }: { video: typeof VIDEOS[0]; active: boolean; preload: boolean }) {
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = vidRef.current;
    if (!el) return;
    if (active) {
      const play = () => { el.currentTime = 0; el.play().catch(() => {}); };
      if (el.readyState >= 2) play();
      else el.addEventListener('canplay', play, { once: true });
    } else {
      el.pause();
    }
  }, [active]);

  if (!active && !preload) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ paddingBottom: '44px' }}
    >
      <div
        style={{
          position: 'relative',
          /* Responsive: on mobile fill 92vw width capped by 16/9 ratio; on desktop use height */
          width: 'min(92vw, calc(72vh * 16 / 9))',
          height: 'min(72vh, calc(92vw * 9 / 16))',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.8)',
        }}
      >
        <video
          ref={vidRef}
          src={video.src}
          muted loop playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)',
        }} />
        <div style={{ position:'absolute', top:0,    left:0,  width:18, height:18, borderTop:'1px solid rgba(255,255,255,0.2)', borderLeft:'1px solid rgba(255,255,255,0.2)', zIndex:3 }} />
        <div style={{ position:'absolute', top:0,    right:0, width:18, height:18, borderTop:'1px solid rgba(255,255,255,0.2)', borderRight:'1px solid rgba(255,255,255,0.2)', zIndex:3 }} />
        <div style={{ position:'absolute', bottom:0, left:0,  width:18, height:18, borderBottom:'1px solid rgba(255,255,255,0.2)', borderLeft:'1px solid rgba(255,255,255,0.2)', zIndex:3 }} />
        <div style={{ position:'absolute', bottom:0, right:0, width:18, height:18, borderBottom:'1px solid rgba(255,255,255,0.2)', borderRight:'1px solid rgba(255,255,255,0.2)', zIndex:3 }} />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const transitioning = useRef(false);

  const goTo = useCallback((idx: number) => {
    if (transitioning.current) return;
    transitioning.current = true;
    setCurrent(((idx % VIDEOS.length) + VIDEOS.length) % VIDEOS.length);
    setTimeout(() => { transitioning.current = false; }, 850);
  }, []);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => { e.preventDefault(); if (e.deltaY > 0) goNext(); else goPrev(); };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goNext, goPrev]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const touchStartY = useRef(0);
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 40) { if (delta > 0) goNext(); else goPrev(); }
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend',   onEnd,   { passive: true });
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchend', onEnd); };
  }, [goNext, goPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-screen overflow-hidden bg-[#080808] flex items-center justify-center"
    >
      {/* Blurred background crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={`bg-${current}`}
            initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <BgVideo src={VIDEOS[current].src} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark scrim */}
      <div className="absolute inset-0 bg-[#080808]/50 z-[1] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to top,#080808 0%,transparent 22%,transparent 75%,#080808 100%)' }} />

      {/* Video slides */}
      <div className="absolute inset-0 z-[2]">
        {VIDEOS.map((v, i) => {
          const isActive  = i === current;
          const isPreload = i === (current + 1) % VIDEOS.length || i === (current - 1 + VIDEOS.length) % VIDEOS.length;
          return <VideoSlide key={v.src} video={v} active={isActive} preload={isPreload} />;
        })}
      </div>

      {/* Bottom bar: counter left | title+dots center | arrows right */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] flex items-end justify-between px-6 md:px-12 pb-7 pointer-events-none"
        style={{ height: '88px' }}>

        {/* Counter — always visible, only the number animates upward */}
        <div className="pointer-events-auto select-none overflow-hidden" style={{ minWidth: '60px', height: '1.4em', position: 'relative' }}>
          <span className="font-mono text-white/20 text-[11px]" style={{ position: 'absolute', bottom: 0, left: 0, whiteSpace: 'nowrap', lineHeight: '1.4em' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;/ {String(VIDEOS.length).padStart(2, '0')}
          </span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`ctr-${current}`}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-mono text-[15px] tracking-[0.2em] text-white/60"
              style={{ display: 'inline-block', position: 'absolute', bottom: 0, left: 0, lineHeight: '1.4em' }}
            >
              {String(current + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Title + dots — center */}
        <div className="flex flex-col items-center gap-3 select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${current}`}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <p className="text-[8px] tracking-[0.5em] uppercase text-white/35 font-light mb-1">
                {VIDEOS[current].category}
              </p>
              <h2 className="text-sm md:text-base font-light tracking-[0.4em] uppercase text-white/75 whitespace-nowrap">
                {VIDEOS[current].title}
              </h2>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-row items-center gap-2 pointer-events-auto">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Video ${i + 1}`}
                className="flex items-center justify-center w-5 h-4"
              >
                <span style={{
                  display: 'block',
                  width: i === current ? '18px' : '4px',
                  height: '2px', borderRadius: '2px',
                  backgroundColor: i === current ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                  transition: `all 0.45s ${EASE}`,
                }} />
              </button>
            ))}
          </div>
        </div>

        {/* Arrows — right */}
        <div className="flex gap-4 pointer-events-auto" style={{ minWidth: '60px', justifyContent: 'flex-end' }}>
          <button onClick={goPrev} className="text-white/20 hover:text-white/60 transition-colors text-sm select-none">↑</button>
          <button onClick={goNext} className="text-white/20 hover:text-white/60 transition-colors text-sm select-none">↓</button>
        </div>

      </div>
    </motion.div>
  );
}
