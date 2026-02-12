import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import RoleBreakdown from './components/RoleBreakdown';
import SkillsChart from './components/SkillsChart';
import ChatAssistant from './components/ChatAssistant';
import { X } from 'lucide-react';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navigation onOpenChat={toggleChat} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      
      <main>
        <Hero onOpenChat={toggleChat} />
        
        <div className="bg-gradient-to-b from-white to-medical-50/30 dark:from-slate-950 dark:to-slate-900/50">
          <RoleBreakdown />
        </div>
        
        <SkillsChart />
        
        {/* Section entry point for Chat */}
        <section id="mentor" className="py-24 px-4 bg-white dark:bg-slate-950 relative overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-vibrant-orange/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-vibrant-purple/5 blur-[100px] rounded-full"></div>
          
          <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
            <span className="text-vibrant-purple dark:text-vibrant-purple font-black tracking-widest text-sm uppercase px-5 py-2 bg-vibrant-purple/5 dark:bg-vibrant-purple/10 rounded-full inline-block mb-4">Interactive Career Guide</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-2 mb-6 leading-tight">Your Questions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-purple to-vibrant-indigo">Answered</span></h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Curious about the profession? Launch our AI mentor to dive deep into the nuances of transplant coordination.
            </p>
            <button 
              onClick={toggleChat}
              className="px-10 py-5 bg-gradient-to-r from-vibrant-purple to-vibrant-indigo text-white rounded-[2rem] font-bold text-lg shadow-xl hover:scale-105 transition-all"
            >
              Launch AI Mentor Chat
            </button>
          </div>
        </section>

        <section className="bg-slate-900 dark:bg-slate-900/50 py-32 px-4 border-t border-slate-800 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-medical-900/40 via-transparent to-vibrant-purple/10"></div>
          <div className="max-w-4xl mx-auto space-y-10 relative z-10">
             <h3 className="text-3xl font-black text-white">The Human Impact</h3>
             <blockquote className="text-3xl md:text-4xl font-light italic text-slate-300 leading-tight">
               "We don't just coordinate organs; we coordinate <span className="text-white font-bold border-b-4 border-vibrant-rose/40">second chances</span>."
             </blockquote>
             <p className="text-vibrant-teal font-bold uppercase tracking-widest">— Clinical Director of Transplantation</p>
          </div>
        </section>
      </main>

      {/* Chat Modal Overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl h-full max-h-[90vh]">
            <button 
              onClick={toggleChat}
              className="absolute -top-4 -right-4 md:top-4 md:-right-12 z-[110] p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full shadow-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-6 h-6" />
            </button>
            <ChatAssistant />
          </div>
        </div>
      )}

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-slate-900 dark:text-white font-black text-xl mb-6">Transplant<span className="text-medical-600">Coord</span></h4>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Dedicated to educating the next generation of transplant leaders and healthcare heroes.</p>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><a href="https://unos.org/" target="_blank" rel="noreferrer" className="hover:text-medical-600 transition-colors">UNOS Network</a></li>
              <li><a href="https://natco1.org/" target="_blank" rel="noreferrer" className="hover:text-medical-600 transition-colors">NATCO Association</a></li>
              <li><a href="https://www.organdonor.gov/" target="_blank" rel="noreferrer" className="hover:text-medical-600 transition-colors">OrganDonor.gov</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-xs">Site Links</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><a href="#responsibilities" className="hover:text-vibrant-purple transition-colors">Responsibilities</a></li>
              <li><a href="#skills" className="hover:text-vibrant-purple transition-colors">Skill Set</a></li>
              <li><button onClick={toggleChat} className="hover:text-vibrant-purple transition-colors text-left">AI Assistant</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-xs">Important</h4>
            <p className="text-slate-400 italic leading-relaxed font-medium">This is an educational platform. For medical emergencies or donor registry questions, please contact official healthcare services.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-center font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] text-[10px]">
          &copy; {new Date().getFullYear()} Transplant Coordinator Insight • Built with Gemini & Modern Design
        </div>
      </footer>
    </div>
  );
};

export default App;