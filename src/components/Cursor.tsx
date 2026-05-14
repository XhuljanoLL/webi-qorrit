import { useEffect, useRef, useState } from 'react';

/** Custom cursor — desktop (pointer device) only */
export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  // Track whether the user has a fine pointer (mouse/trackpad)
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    setIsPointer(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsPointer(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isPointer) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.left = mx - 5 + 'px';
        dot.current.style.top  = my - 5 + 'px';
      }
    };

    const raf = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) {
        ring.current.style.left = rx - 18 + 'px';
        ring.current.style.top  = ry - 18 + 'px';
      }
      rafId = requestAnimationFrame(raf);
    };

    const hover   = () => ring.current?.classList.add('hovered');
    const unhover = () => ring.current?.classList.remove('hovered');

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', hover);
      el.addEventListener('mouseleave', unhover);
    });

    rafId = requestAnimationFrame(raf);
    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
    };
  }, [isPointer]);

  if (!isPointer) return null;

  return (
    <>
      <div ref={dot}  className="cursor" />
      <div ref={ring} className="cursor-follower" />
    </>
  );
}
