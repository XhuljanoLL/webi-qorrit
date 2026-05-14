import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'Behance', href: 'https://behance.net' },
  { label: 'WhatsApp', href: 'https://wa.me/' },
];

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus('sending');
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => { setStatus('sent'); form.current?.reset(); })
      .catch(() => setStatus('error'));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-[#080808] pt-24 pb-32"
    >
      <section className="px-6 md:px-12 pt-16 pb-24">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="border-b border-white/5 pb-16 mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-6">Contact</p>
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-white leading-none">
              Let's work<br />together.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">

            {/* Form */}
            <form ref={form} onSubmit={send} className="flex flex-col gap-8">
              {[
                { name: 'user_name', placeholder: 'Your name', type: 'text' },
                { name: 'user_email', placeholder: 'Your email', type: 'email' },
              ].map(field => (
                <div key={field.name} className="relative border-b border-white/10 pb-2">
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="w-full bg-transparent text-white/70 placeholder-white/20 text-lg outline-none py-2 focus:text-white transition-colors"
                  />
                </div>
              ))}
              <div className="relative border-b border-white/10 pb-2">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project"
                  required
                  className="w-full bg-transparent text-white/70 placeholder-white/20 text-lg outline-none py-2 resize-none focus:text-white transition-colors"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 self-start flex items-center gap-4 text-white/60 hover:text-white transition-colors group"
              >
                <span className="text-sm tracking-widest uppercase">
                  {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent!' : status === 'error' ? 'Error. Retry?' : 'Send message'}
                </span>
                <span className="w-10 h-px bg-current group-hover:w-20 transition-all duration-300" />
              </motion.button>
            </form>

            {/* Socials + info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6 mb-16">
                <p className="text-white/30 text-sm tracking-widest uppercase mb-4">Email</p>
                <a href="mailto:hello@genald.mov" className="text-white/70 hover:text-white transition-colors text-xl">
                  hello@genald.mov
                </a>
              </div>

              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-white/30 mb-8">Social</p>
                <div className="space-y-4">
                  {socials.map((s, i) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between border-b border-white/5 pb-4 text-white/40 hover:text-white/80 transition-colors group"
                    >
                      <span className="text-sm tracking-wide">{s.label}</span>
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
