import React, { useState } from 'react';
import { BEFORE_AFTER_PROJECTS } from '../data/reviewsData';
import { Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export const BeforeAfterGallery: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(BEFORE_AFTER_PROJECTS[0].id);
  const activeProject = BEFORE_AFTER_PROJECTS.find(p => p.id === activeTabId) || BEFORE_AFTER_PROJECTS[0];
  const [showAfter, setShowAfter] = useState<boolean>(true);

  return (
    <section className="py-16 bg-[#EFECE6] border-t border-[#E6E1D6] text-[#332D29]">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Workmanship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3A] tracking-tight">
            Before & After Handyman Projects
          </h2>
          <p className="text-[#6B655E] text-sm max-w-xl mx-auto">
            See actual transformations completed by our local handyman team — smooth drywall matching, luxury vinyl flooring, and clean tile backsplash work.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
          {BEFORE_AFTER_PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onClick={() => {
                setActiveTabId(proj.id);
                setShowAfter(true);
              }}
              className={`px-4 py-2 rounded-full font-bold cursor-pointer transition-all ${
                activeTabId === proj.id
                  ? 'bg-[#5A6D5D] text-white shadow-sm'
                  : 'bg-white text-[#6B655E] hover:text-[#332D29] border border-[#E6E1D6]'
              }`}
            >
              {proj.category}
            </button>
          ))}
        </div>

        {/* Visual Showcase Box */}
        <div className="bg-white rounded-3xl border border-[#E6E1D6] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
          
          {/* Photo Preview Container */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#E6E1D6] shadow-sm group">
              <img
                src={showAfter ? activeProject.afterImg : activeProject.beforeImg}
                alt={activeProject.title}
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  showAfter ? 'bg-[#5A6D5D] text-white shadow' : 'bg-[#A67C52] text-white shadow'
                }`}>
                  {showAfter ? '✨ AFTER (Completed)' : '⚠️ BEFORE (Damaged)'}
                </span>
              </div>

              {/* Toggle Switch inside Photo */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-[#E6E1D6] flex items-center gap-1 text-xs shadow-md">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-3.5 py-1.5 rounded-full font-bold cursor-pointer transition-colors ${
                    !showAfter ? 'bg-[#332D29] text-white' : 'text-[#6B655E] hover:text-[#332D29]'
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className={`px-3.5 py-1.5 rounded-full font-bold cursor-pointer transition-colors ${
                    showAfter ? 'bg-[#A67C52] text-white' : 'text-[#6B655E] hover:text-[#332D29]'
                  }`}
                >
                  After
                </button>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-5 space-y-4 text-xs text-[#332D29]">
            <span className="text-[#A67C52] font-bold uppercase tracking-wider text-[11px] block">
              {activeProject.category}
            </span>
            <h3 className="text-2xl font-extrabold text-[#2D3A3A]">
              {activeProject.title}
            </h3>
            <p className="text-[#6B655E] text-sm leading-relaxed">
              {activeProject.description}
            </p>

            <div className="flex items-center gap-3 bg-[#FBF9F6] p-3.5 rounded-2xl border border-[#E6E1D6]">
              <Clock className="w-4 h-4 text-[#A67C52] shrink-0" />
              <div>
                <span className="text-[#6B655E] block text-[11px]">Total Craftsman Completion Time:</span>
                <strong className="text-[#2D3A3A] text-sm font-bold">{activeProject.duration}</strong>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A6D5D] shrink-0" />
                <span>Zero visible seams or texture lines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5A6D5D] shrink-0" />
                <span>Cleaned and swept after completion</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
