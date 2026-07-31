import React from 'react';
import { Wrench, PhoneCall, Calendar, ShieldCheck, Sparkles, ShoppingBag, Clock, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  quoteCount: number;
  openCallbackModal: () => void;
  bookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  quoteCount,
  openCallbackModal,
  bookingsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F6] text-[#332D29] shadow-sm border-b border-[#E6E1D6]">
      {/* Top Banner with Guarantee & Emergency Hotline */}
      <div className="bg-[#2D3A3A] text-[#E6E1D6] px-4 py-1.5 text-xs font-medium border-b border-[#3E4E4E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#8FB393] font-semibold">
              <ShieldCheck className="w-4 h-4" /> Licensed & Insured Handymen
            </span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-stone-300">100% Satisfaction & Workmanship Guarantee</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openCallbackModal}
              className="flex items-center gap-1.5 text-[#C4986C] hover:text-[#E2B78C] font-semibold transition-colors cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Emergency Repair Hotline: (555) 382-4263</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#5A6D5D] text-white rounded-lg flex items-center justify-center font-bold shadow-sm group-hover:bg-[#495B4C] transition-colors">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#2D3A3A] uppercase group-hover:text-[#A67C52] transition-colors">
                ONE STOP SHOP <span className="text-[#A67C52]">HANDYMAN</span>
              </h1>
              <span className="bg-[#A67C52]/10 text-[#A67C52] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-[#A67C52]/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-[#6B655E] font-medium">
              Home Repairs • Maintenance • Installations • Remodeling
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#EFECE6] p-1 rounded-full border border-[#E6E1D6]">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase font-medium tracking-wider transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#5A6D5D] text-white font-semibold shadow-sm'
                : 'text-[#6B655E] hover:text-[#332D29] hover:bg-[#E6E1D6]/60'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase font-medium tracking-wider transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#5A6D5D] text-white font-semibold shadow-sm'
                : 'text-[#6B655E] hover:text-[#332D29] hover:bg-[#E6E1D6]/60'
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setActiveTab('estimate')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase font-medium tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'estimate'
                ? 'bg-[#5A6D5D] text-white font-semibold shadow-sm'
                : 'text-[#6B655E] hover:text-[#332D29] hover:bg-[#E6E1D6]/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Estimate Quote</span>
            {quoteCount > 0 && (
              <span className="bg-[#A67C52] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {quoteCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('ai-diagnose')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase font-medium tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ai-diagnose'
                ? 'bg-[#5A6D5D] text-white font-semibold shadow-sm'
                : 'text-[#6B655E] hover:text-[#332D29] hover:bg-[#E6E1D6]/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4986C]" />
            <span>AI Diagnoser</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-1.5 rounded-full text-xs uppercase font-medium tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#5A6D5D] text-white font-semibold shadow-sm'
                : 'text-[#6B655E] hover:text-[#332D29] hover:bg-[#E6E1D6]/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>My Bookings</span>
            {bookingsCount > 0 && (
              <span className="bg-[#5A6D5D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bookingsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Schedule Now Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('schedule')}
            className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-5 py-2.5 rounded-full shadow-md shadow-[#A67C52]/20 transition-all flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Online</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer / Quick Bar */}
      <div className="lg:hidden flex items-center justify-around bg-[#EFECE6] py-2 border-t border-[#E6E1D6] text-xs text-[#6B655E]">
        <button
          onClick={() => setActiveTab('home')}
          className={`p-2 rounded flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-[#5A6D5D] font-bold' : ''}`}
        >
          <Wrench className="w-4 h-4" /> Home
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`p-2 rounded flex flex-col items-center gap-1 ${activeTab === 'services' ? 'text-[#5A6D5D] font-bold' : ''}`}
        >
          <ShoppingBag className="w-4 h-4" /> Services
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`p-2 rounded flex flex-col items-center gap-1 ${activeTab === 'schedule' ? 'text-[#A67C52] font-bold' : ''}`}
        >
          <Calendar className="w-4 h-4" /> Book Now
        </button>
        <button
          onClick={() => setActiveTab('estimate')}
          className={`p-2 rounded flex flex-col items-center gap-1 relative ${activeTab === 'estimate' ? 'text-[#5A6D5D] font-bold' : ''}`}
        >
          <FileText className="w-4 h-4" /> Quote
          {quoteCount > 0 && (
            <span className="absolute top-1 right-2 bg-[#A67C52] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {quoteCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`p-2 rounded flex flex-col items-center gap-1 ${activeTab === 'bookings' ? 'text-[#5A6D5D] font-bold' : ''}`}
        >
          <Clock className="w-4 h-4" /> Bookings
        </button>
      </div>
    </header>
  );
};
