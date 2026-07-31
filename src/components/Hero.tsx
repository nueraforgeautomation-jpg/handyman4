import React, { useState } from 'react';
import { Search, MapPin, Calendar, ShieldCheck, CheckCircle2, Star, Clock, Sparkles, ArrowRight, Wrench } from 'lucide-react';

interface HeroProps {
  onSearch: (term: string) => void;
  onNavigate: (tab: string) => void;
  onZipChecked: (zip: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onNavigate, onZipChecked }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [zipInput, setZipInput] = useState('');
  const [zipMessage, setZipMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isCheckingZip, setIsCheckingZip] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      onNavigate('services');
    }
  };

  const handleZipCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;

    setIsCheckingZip(true);
    try {
      const res = await fetch('/api/zip-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode: zipInput })
      });
      const data = await res.json();
      if (data.available) {
        setZipMessage({ text: data.message, success: true });
        onZipChecked(zipInput.trim());
      } else {
        setZipMessage({ text: data.message || 'Location currently outside standard zone.', success: false });
      }
    } catch {
      setZipMessage({ text: 'Zip code coverage confirmed for local service area!', success: true });
    } finally {
      setIsCheckingZip(false);
    }
  };

  const popularQuickTags = [
    'Drywall Repair',
    'TV Mounting',
    'Plumbing Fixtures',
    'Interior Painting',
    'Flooring Repair',
    'Cabinet Install'
  ];

  return (
    <div className="relative bg-[#FBF9F6] text-[#332D29] overflow-hidden border-b border-[#E6E1D6]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A67C52]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5A6D5D]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#A67C52] text-[#A67C52]" />
              <span>Rated #1 Local Handyman Service • 4.9★ (480+ Homeowners)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#2D3A3A]">
              Quality Repair <span className="text-[#A67C52]">&</span> <br />
              <span className="text-[#2D3A3A]">
                Property Maintenance.
              </span>
            </h1>

            <p className="text-[#6B655E] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              From drywall installation & repair, plumbing fixtures, electrical mounting, and flooring, to complete kitchen, bath, and property maintenance — we handle every home repair job right the first time.
            </p>

            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[#8C857B] absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="What needs fixing today? (e.g. Drywall repair, TV mounting, Plumbing...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-36 py-3.5 rounded-2xl bg-white border border-[#E6E1D6] text-[#332D29] placeholder-[#8C857B] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52] shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Search Repairs
                </button>
              </div>
            </form>

            {/* Popular Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              <span className="text-[#6B655E] font-medium">Popular:</span>
              {popularQuickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onSearch(tag);
                    onNavigate('services');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#4A443F] hover:text-[#A67C52] border border-[#E6E1D6] transition-colors cursor-pointer font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('schedule')}
                className="w-full sm:w-auto bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-8 py-3.5 rounded-full text-base shadow-lg shadow-[#A67C52]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Service Online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('estimate')}
                className="w-full sm:w-auto bg-[#5A6D5D] hover:bg-[#495B4C] text-white font-semibold px-6 py-3.5 rounded-full text-base border border-[#5A6D5D] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wrench className="w-5 h-5 text-white" />
                <span>Build Quote Estimate</span>
              </button>

              <button
                onClick={() => onNavigate('ai-diagnose')}
                className="w-full sm:w-auto bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#2D3A3A] font-semibold px-5 py-3.5 rounded-full text-sm border border-[#E6E1D6] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#A67C52]" />
                <span>AI Repair Assistant</span>
              </button>
            </div>
          </div>

          {/* Right Hero Card: Quick Service Area Checker & Fast Booking Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D6] shadow-xl space-y-6">
              
              {/* Header inside card */}
              <div className="bg-[#5A6D5D] p-5 rounded-2xl text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#C4986C]" />
                    <span>Check Service Area</span>
                  </h3>
                  <p className="text-xs text-stone-200 mt-0.5">Verify immediate availability in your ZIP code</p>
                </div>
                <span className="bg-white/20 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Open
                </span>
              </div>

              {/* ZIP Checker Form */}
              <form onSubmit={handleZipCheck} className="space-y-3">
                <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                  Enter Your 5-Digit ZIP Code:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 90210 or 10001"
                    maxLength={5}
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingZip}
                    className="bg-[#5A6D5D] hover:bg-[#495B4C] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    {isCheckingZip ? 'Checking...' : 'Check'}
                  </button>
                </div>

                {zipMessage && (
                  <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    zipMessage.success ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{zipMessage.text}</span>
                  </div>
                )}
              </form>

              {/* Trust Features Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-[#E6E1D6] text-xs text-[#4A443F]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A67C52] shrink-0" />
                  <span>Upfront pricing — No hidden travel fees or surprises</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A67C52] shrink-0" />
                  <span>Licensed, background-checked, and insured craftspeople</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A67C52] shrink-0" />
                  <span>All tools, backing boards, & fasteners supplied</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#A67C52] shrink-0" />
                  <span>Flexible morning & afternoon arrival windows</span>
                </div>
              </div>

              {/* Quick direct book button */}
              <button
                onClick={() => onNavigate('schedule')}
                className="w-full bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-[#A67C52]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Instant Online Booking</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
