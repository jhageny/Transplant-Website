import React, { useState, useRef } from 'react';
import { 
  Search, Stethoscope, Users, Plane, HeartPulse, 
  ChevronRight, Info, Calendar, PhoneCall, ShieldCheck,
  GraduationCap, BrainCircuit
} from 'lucide-react';

const RoleBreakdown: React.FC = () => {
  const [perspective, setPerspective] = useState<'career' | 'patient'>('career');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);

  const coordinatorJourney = [
    {
      title: "The Vetting",
      desc: "Analyzing complex medical records and social histories to find the perfect candidate.",
      icon: <Search className="w-6 h-6" />,
      tag: "Clinical Intelligence"
    },
    {
      title: "The Pager",
      desc: "The 2 a.m. call. You have minutes to accept an organ and hours to mobilize teams.",
      icon: <PhoneCall className="w-6 h-6" />,
      tag: "Crisis Management"
    },
    {
      title: "The Logistics",
      desc: "Coordinating private jets, surgical schedules, and multi-state medical transport.",
      icon: <Plane className="w-6 h-6" />,
      tag: "Logistics Mastery"
    },
    {
      title: "The New Life",
      desc: "Educating families on post-op care and managing the 'miracle' of the recovery ward.",
      icon: <HeartPulse className="w-6 h-6" />,
      tag: "Patient Education"
    }
  ];

  const patientJourney = [
    {
      title: "The Evaluation",
      desc: "Meeting your coordinator. They become your medical lighthouse through the tests.",
      icon: <Stethoscope className="w-6 h-6" />,
      tag: "First Connection"
    },
    {
      title: "The Wait",
      desc: "Regular labs and updates. Your coordinator is the bridge to the UNOS waitlist.",
      icon: <Calendar className="w-6 h-6" />,
      tag: "Steady Support"
    },
    {
      title: "The Big Day",
      desc: "Receiving 'The Call'. Your coordinator guides you through every hospital door.",
      icon: <ChevronRight className="w-6 h-6" />,
      tag: "Rapid Mobilization"
    },
    {
      title: "The Recovery",
      desc: "Learning your new meds. Your coordinator manages your clinic visits for a lifetime.",
      icon: <Users className="w-6 h-6" />,
      tag: "Long-term Care"
    }
  ];

  const activeJourney = perspective === 'career' ? coordinatorJourney : patientJourney;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    // Capture pointer to ensure we get events even if cursor leaves the element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const delta = e.clientX - startXRef.current;
    const sliderWidth = sliderRef.current.offsetWidth;
    
    // Calculate potential offset
    // If starting at 'career' (0), we can go right up to sliderWidth
    // If starting at 'patient' (sliderWidth), we can go left down to -sliderWidth
    
    if (perspective === 'career') {
        const clamped = Math.min(Math.max(delta, 0), sliderWidth);
        setDragOffset(clamped);
    } else {
        const clamped = Math.min(Math.max(delta, -sliderWidth), 0);
        setDragOffset(clamped);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    if (!sliderRef.current) return;
    const sliderWidth = sliderRef.current.offsetWidth;
    const threshold = sliderWidth * 0.25; // 25% drag to swap

    if (perspective === 'career') {
        if (dragOffset > threshold) {
            setPerspective('patient');
        }
    } else {
        if (dragOffset < -threshold) {
            setPerspective('career');
        }
    }
    setDragOffset(0);
  };

  // Calculate dynamic transform for the slider
  // If not dragging, we rely on the CSS class toggle (translate-x-0 or translate-x-full)
  // If dragging, we use inline style to override
  const getSliderStyle = () => {
    if (!isDragging) {
        return { 
            transform: perspective === 'patient' ? 'translateX(100%)' : 'translateX(0%)' 
        };
    }
    
    // When dragging, we are calculating pixel offsets relative to start position
    // BUT 'translate-x-full' is 100%. Mixing pixels and percentages in transform is tricky if we don't know the base pixel value.
    // Ideally we use pixels for everything when dragging.
    // If perspective is patient, start at 100% (which is sliderWidth approx) + dragOffset
    // But getting exact sliderWidth in render for initial position might be jittery if we didn't measure it yet.
    // Fortunately we measure it in handlePointerMove.
    
    // Fallback: If we don't have measurements yet (shouldn't happen during drag), default to 0.
    // Actually, simple trick: use calc().
    // Career: calc(0% + {dragOffset}px)
    // Patient: calc(100% + {dragOffset}px)
    return {
        transform: `translateX(calc(${perspective === 'patient' ? '100%' : '0%'} + ${dragOffset}px))`,
        transition: 'none'
    };
  };

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-32" id="responsibilities">
      <div className="text-center mb-16 relative z-10">
        <span className="text-vibrant-purple dark:text-vibrant-purple font-bold tracking-widest text-sm uppercase px-4 py-2 bg-vibrant-purple/5 dark:bg-vibrant-purple/10 rounded-full">Interactive Learning Hub</span>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-6 mb-4 leading-tight">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-vibrant-purple">Experience</span>
        </h2>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Step into the shoes of a coordinator or see the journey through the eyes of a patient.
        </p>
      </div>

      {/* Slidable Perspective Toggle */}
      <div className="flex justify-center mb-20 px-4">
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          // Prevent default touch actions (scrolling) only on the slider area
          className="relative bg-slate-100 dark:bg-slate-900 p-1.5 rounded-[2.5rem] flex items-center shadow-inner w-full max-w-2xl overflow-hidden group cursor-pointer touch-none select-none"
        >
          {/* The Slider Background */}
          <div 
            ref={sliderRef}
            style={getSliderStyle()}
            className={`absolute top-1.5 left-1.5 h-[calc(100%-0.75rem)] w-[calc(50%-0.375rem)] bg-white dark:bg-slate-800 rounded-[2.2rem] shadow-xl ${!isDragging ? 'transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]' : ''}`}
          />
          
          <button 
            onClick={() => !isDragging && setPerspective('career')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[2.2rem] text-sm md:text-lg font-bold transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-medical-500 ${
              perspective === 'career' ? 'text-medical-700 dark:text-medical-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <GraduationCap className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ${perspective === 'career' ? 'scale-110' : 'scale-90 opacity-70'}`} />
            <span className="pointer-events-none">Career Aspirant</span>
          </button>
          
          <button 
            onClick={() => !isDragging && setPerspective('patient')}
            className={`relative z-10 flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[2.2rem] text-sm md:text-lg font-bold transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-medical-500 ${
              perspective === 'patient' ? 'text-vibrant-teal dark:text-vibrant-teal' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ${perspective === 'patient' ? 'scale-110' : 'scale-90 opacity-70'}`} />
            <span className="pointer-events-none">Patient & Family</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Journey Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeJourney.map((step, idx) => (
              <div 
                key={idx} 
                className={`p-8 bg-white dark:bg-slate-900 border-2 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl group ${perspective === 'career' ? 'border-medical-50 dark:border-slate-800 hover:border-medical-200 dark:hover:border-medical-900/50' : 'border-emerald-50 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900/50'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:rotate-6 ${perspective === 'career' ? 'bg-medical-600 text-white' : 'bg-vibrant-teal text-white'}`}>
                  {step.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 block ${perspective === 'career' ? 'text-medical-400' : 'text-emerald-400'}`}>
                  {step.tag}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Sidebar */}
        <div className="lg:col-span-4">
          <div className={`h-full rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden text-white transition-colors duration-500 ${perspective === 'career' ? 'bg-slate-900 dark:bg-slate-900/80' : 'bg-emerald-900 dark:bg-emerald-900/80'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            <div className="relative z-10">
              <h4 className="text-3xl font-black mb-8 leading-tight">
                {perspective === 'career' ? 'The Coordinator Advantage' : 'A Family Lifeline'}
              </h4>
              <ul className="space-y-8">
                {(perspective === 'career' ? [
                  { title: "Direct Autonomy", desc: "You decide if an organ is high-quality enough for your patient." },
                  { title: "Salary Potential", desc: "Coordinators often earn $100k+ with 24/7 on-call pay." },
                  { title: "Clinical Depth", desc: "Master immunology, pharmacology, and surgical logistics." }
                ] : [
                  { title: "Continuous Access", desc: "You are never alone; your coordinator is your 24/7 link." },
                  { title: "Medication Help", desc: "Complex post-op drugs are simplified by coordinator teaching." },
                  { title: "Peace of Mind", desc: "They handle the insurance and the OPOs while you heal." }
                ]).map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <ShieldCheck className="w-6 h-6 flex-shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-bold text-lg mb-1">{item.title}</p>
                      <p className="text-sm opacity-70 font-medium">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-12 pt-10 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                <Info className="w-10 h-10 text-vibrant-orange" />
                <p className="text-xs font-medium italic opacity-80 text-white">
                  {perspective === 'career' ? "Tip: ICU nursing experience is the #1 prerequisite for this role." : "Tip: Your coordinator is often your legal and emotional health proxy during surgery."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Roadmap Callout */}
      <div className="bg-gradient-to-r from-medical-600 to-vibrant-indigo rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-10 transform group-hover:scale-150 transition-transform duration-1000">
          <BrainCircuit className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-3xl font-black mb-4 text-white">Explore the "Golden Hour"</h3>
            <p className="text-medical-100 font-medium text-lg leading-relaxed max-w-xl">
              When an organ is procured, the clock starts. Experience the high-stakes logistics of the 4 to 24-hour window that determines transplant success.
            </p>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('mentor');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-medical-900 px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-xl hover:shadow-medical-400/30 whitespace-nowrap"
          >
            Ask the AI Mentor More
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoleBreakdown;