import React, { useState, useEffect } from 'react';
import { Stethoscope, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  onOpenChat: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenChat, isDarkMode, onToggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl py-3 border-b border-slate-100 dark:border-slate-800' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-medical-600 to-vibrant-indigo p-2.5 rounded-2xl text-white shadow-lg shadow-medical-500/20 transform hover:rotate-6 transition-transform">
            <Stethoscope size={26} strokeWidth={2.5} />
          </div>
          <span className={`font-black text-2xl tracking-tighter ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
            Transplant<span className="text-medical-600">Coord</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleDarkMode}
            className={`p-3 rounded-xl transition-all ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' : 'bg-white/10 backdrop-blur text-white md:text-slate-900 dark:md:text-white'} hover:scale-110 active:scale-95`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={onOpenChat}
            className="px-6 py-3 bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-indigo-600 dark:to-vibrant-purple text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all text-xs uppercase tracking-widest border border-white/10"
          >
            AI Mentor
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;