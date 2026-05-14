import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full p-8 z-40 mix-blend-difference">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <Link to="/" className="text-4xl font-bold tracking-widest uppercase hover:text-white transition-colors duration-300">
          Genald
        </Link>
        <div className="flex gap-8 text-2xl uppercase">
          <Link to="/about" className="hover:text-white transition-colors duration-300">About</Link>
          <Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
