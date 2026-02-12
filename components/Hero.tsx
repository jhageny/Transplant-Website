import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  const scrollToRole = () => {
    const element = document.getElementById('responsibilities');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 pb-16 pt-32 md:pb-32 lg:pt-48 transition-colors duration-300">
        {/* Colorful Abstract Background Shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-medical-200 dark:bg-medical-900/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-vibrant-purple/20 dark:bg-vibrant-purple/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-24 left-1/2 w-[600px] h-[600px] bg-vibrant-teal/10 dark:bg-vibrant-teal/5 rounded-full blur-3xl opacity-30"></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-vibrant-purple/20 dark:border-vibrant-purple/40 bg-vibrant-purple/5 dark:bg-vibrant-purple/10 px-4 py-1.5 text-sm font-semibold text-vibrant-purple dark:text-vibrant-purple mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>Career Focus: Life-Saving Coordination</span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-7xl mb-8 leading-tight">
                    Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-vibrant-purple">Hope</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-teal to-medical-500">Healing</span>
                </h1>
                <p className="mt-6 text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                    The heart of the transplant world. Discover how <strong>Transplant Coordinators</strong> orchestrate the miracle of organ donation through clinical excellence and profound empathy.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <button 
                        onClick={scrollToRole}
                        className="rounded-2xl bg-gradient-to-r from-medical-600 to-vibrant-indigo px-8 py-4 text-base font-bold text-white shadow-xl shadow-medical-500/30 hover:shadow-medical-500/50 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        Explore the Role <ArrowRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={onOpenChat}
                      className="rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 px-8 py-4 text-base font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-vibrant-purple transition-all shadow-lg"
                    >
                        AI Mentor
                    </button>
                </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg relative group">
                 <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900 aspect-[4/5] transform transition-transform group-hover:rotate-2">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                      alt="Transplant Coordinator at work" 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-medical-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                        <p className="font-bold text-2xl mb-1">Impactful Careers</p>
                        <p className="text-medical-200 font-medium italic">Every second changes a life.</p>
                    </div>
                 </div>
                 {/* Decorative colorful accents */}
                 <div className="absolute -top-4 -right-4 w-24 h-24 bg-vibrant-orange rounded-full mix-blend-multiply opacity-70 blur-xl animate-bounce"></div>
                 <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-vibrant-teal rounded-full mix-blend-multiply opacity-70 blur-xl"></div>
                 
                 {/* Floating Interactive Card */}
                 <div className="absolute -bottom-10 -right-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-6 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700 max-w-[240px] hidden lg:block transform hover:scale-110 transition-transform cursor-default">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">Live Coordination</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-snug">"You are the voice on the other end of the phone that changes everything."</p>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default Hero;