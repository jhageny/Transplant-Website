import React from 'react';

const SkillsChart: React.FC = () => {
  const skills = [
    { name: "Clinical Excellence", level: 95, color: "from-emerald-400 to-emerald-600", shadow: "shadow-emerald-500/20" },
    { name: "Crisis Resolution", level: 92, color: "from-blue-400 to-blue-600", shadow: "shadow-blue-500/20" },
    { name: "Strategic Communication", level: 98, color: "from-indigo-400 to-vibrant-purple", shadow: "shadow-purple-500/20" },
    { name: "Complex Data Management", level: 88, color: "from-amber-400 to-vibrant-orange", shadow: "shadow-orange-500/20" },
    { name: "High-Stakes Empathy", level: 100, color: "from-rose-400 to-vibrant-rose", shadow: "shadow-rose-500/20" },
  ];

  return (
    <div className="bg-slate-900 dark:bg-slate-950 text-white py-24 px-4 md:px-8 relative overflow-hidden transition-colors duration-300" id="skills">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-vibrant-indigo/10 blur-[150px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-20 items-center">
        
        <div className="flex-1 space-y-10">
          <div>
            <span className="text-vibrant-teal font-bold uppercase tracking-widest text-sm mb-4 block">The DNA of a Coordinator</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">What It Actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-400 to-vibrant-teal">Takes</span></h2>
            <p className="text-slate-400 text-xl leading-relaxed font-medium">
              Transplant coordination is a high-performance specialty. It demands technical mastery combined with the emotional fortitude to guide families through their darkest—and brightest—hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-white/5 backdrop-blur rounded-[2rem] border border-white/10 hover:border-white/20 transition-all">
              <h3 className="font-bold text-2xl mb-4 text-emerald-400">Education</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Most coordinators hold a <span className="text-white font-bold">BSN</span> or <span className="text-white font-bold">MSN</span>. Clinical background in ICU, ER, or Nephrology is highly valued.
              </p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur rounded-[2rem] border border-white/10 hover:border-white/20 transition-all">
              <h3 className="font-bold text-2xl mb-4 text-vibrant-purple">Credentials</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Becoming a <span className="text-white font-bold">CCTC</span> (Certified Clinical Transplant Coordinator) is the gold standard for professional excellence.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full space-y-10">
          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-sm shadow-2xl">
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between text-base font-bold">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className="text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out ${skill.shadow} shadow-lg`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-slate-500 text-sm italic">
              * Assessment based on industry standard competency frameworks.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsChart;