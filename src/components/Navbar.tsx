import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const links = [
    { to: '/', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top-left logo — always visible, links home */}
      <div className="fixed top-0 left-0 z-50 px-6 md:px-10 py-5">
        <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity duration-300">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.95rem', letterSpacing: '0.28em' }}
            className="text-[#f0ede8] uppercase">
            Genald Komino
          </span>
        </Link>
      </div>

      {/* Top-right nav links — desktop */}
      <nav className="hidden md:flex fixed top-0 right-0 z-50 items-center gap-10 px-10 py-5">
        {links.map(l => {
          const active = location.pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.8rem', letterSpacing: '0.3em' }}
              className={`relative uppercase transition-colors duration-300 group ${
                active ? 'text-[#f0ede8]' : 'text-[#f0ede8]/55 hover:text-[#f0ede8]'
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#f0ede8]/70 group-hover:w-full transition-all duration-300" />
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen(v => !v)}
        className="md:hidden fixed top-5 right-5 z-[60] flex items-center justify-center w-10 h-10"
      >
        <span
          className="block w-6 h-[1px] bg-[#f0ede8] absolute transition-all duration-300"
          style={{ transform: menuOpen ? 'rotate(45deg)' : 'translateY(-5px)' }}
        />
        <span
          className="block w-6 h-[1px] bg-[#f0ede8] absolute transition-all duration-300"
          style={{ opacity: menuOpen ? 0 : 1 }}
        />
        <span
          className="block w-6 h-[1px] bg-[#f0ede8] absolute transition-all duration-300"
          style={{ transform: menuOpen ? 'rotate(-45deg)' : 'translateY(5px)' }}
        />
      </button>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ backgroundColor: 'rgba(8,8,8,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 200, letterSpacing: '0.35em', fontSize: '0.75rem' }}
              className="uppercase text-[#f0ede8]/30 mb-6 select-none"
            >
              Genald Komino
            </motion.p>
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link
                  to={l.to}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 200, letterSpacing: '0.2em', fontSize: '14vw' }}
                  className="uppercase text-[#f0ede8]/75 hover:text-[#f0ede8] transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
