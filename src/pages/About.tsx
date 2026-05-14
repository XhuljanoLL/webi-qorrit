import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const skills = [
  'Photography',
  'Videography',
  'Color Grading',
  'Motion Design',
  'Visual Storytelling',
  'Commercial',
  'Editorial',
  'Music Visuals',
];

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#080808] text-[#f0ede8]"
    >

      {/* Hero */}
      <section className="relative flex flex-col justify-center px-6 md:px-12 py-24 pt-28 border-b border-white/5" style={{ minHeight: '85vh' }}>

        <p
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-light tracking-tight text-white/[0.03] select-none pointer-events-none whitespace-nowrap leading-none"
          aria-hidden
        >
          Genald
        </p>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.55em] uppercase text-white/30 mb-8"
          >
            About
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[13vw] md:text-[8vw] font-light tracking-tight leading-[0.9] text-white"
            >
              Genald<br />Komino
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="space-y-6"
            >
              <p className="text-white/50 text-lg leading-relaxed font-light">
                Visual technician and storyteller. I capture moments that exist between frames — the tension before the cut, the light just before it disappears.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-300 group"
              >
                <span className="text-[10px] tracking-[0.5em] uppercase">Get in touch</span>
                <span className="w-8 h-px bg-current group-hover:w-16 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reel strip */}
      <section className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-full aspect-[21/7] overflow-hidden"
        >
          <video
            src="/videos/webm/2.webm"
            autoPlay loop muted playsInline
            className="w-full h-full object-cover grayscale opacity-60"
          />
        </motion.div>
      </section>

      {/* Bio + Disciplines */}
      <section className="px-6 md:px-12 py-28 border-b border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">

          <div className="md:col-span-7 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-light text-white/75 leading-relaxed"
            >
              Based wherever the light is interesting. Working across commercial, editorial, and narrative mediums.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-white/35 leading-relaxed text-base"
            >
              With a precise eye for aesthetics and a deep understanding of visual grammar, I build images that serve the story first — and look stunning doing it. Every frame is a decision, every cut an intention.
            </motion.p>
          </div>

          <div className="md:col-span-5">
            <p className="text-[10px] tracking-[0.5em] uppercase text-white/25 mb-8">Disciplines</p>
            <ul>
              {skills.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="border-b border-white/[0.06] py-4 group"
                >
                  <span className="text-[11px] tracking-[0.35em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-300">{s}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-28">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light tracking-tight text-white/80 leading-tight max-w-xl"
          >
            Let's build something worth watching.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 border border-white/10 hover:border-white/30 px-8 py-4 text-[10px] tracking-[0.5em] uppercase text-white/50 hover:text-white transition-all duration-300"
            >
              Start a project
              <span className="w-6 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </section>

    </motion.main>
  );
}
