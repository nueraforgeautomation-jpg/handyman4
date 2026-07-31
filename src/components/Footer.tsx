import React from 'react';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Clock, Calendar } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/servicesData';

interface FooterProps {
  onNavigate: (tab: string, category?: string) => void;
  openCallbackModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, openCallbackModal }) => {
  return (
    <footer className="bg-[#2D3A3A] text-[#D8D2C9] text-xs border-t border-[#3E4E4E]">
      
      {/* Top CTA Band */}
      <div className="bg-[#A67C52] text-white font-bold py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-xl font-extrabold text-white">
              Need a Handyman Today or Tomorrow?
            </h3>
            <p className="text-xs text-[#FBF9F6] font-medium">
              Schedule online in under 2 minutes with upfront guaranteed pricing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('schedule')}
            className="bg-[#332D29] hover:bg-[#231E1B] text-white font-extrabold px-6 py-3 rounded-full text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Service Online Now</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand & Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-[#A67C52] rounded-xl flex items-center justify-center text-white font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-tight">ONE STOP SHOP</span>
          </div>

          <p className="text-[#BDB6AC] leading-relaxed text-xs">
            Your trusted local handyman service for home repairs, drywall installation & repair, plumbing fixtures, electrical mounting, flooring, painting, furniture assembly, and full property maintenance.
          </p>

          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-[#829985] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Licensed, Bonded & Insured (#HIC-482910)</span>
            </div>
          </div>
        </div>

        {/* Quick Service Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Service Categories</h4>
          <ul className="space-y-2">
            {SERVICE_CATEGORIES.slice(1).map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onNavigate('services', cat)}
                  className="hover:text-[#A67C52] transition-colors text-left cursor-pointer"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Handyman Jobs */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Popular Repairs</h4>
          <ul className="space-y-2">
            <li><button onClick={() => onNavigate('services')} className="hover:text-[#A67C52] cursor-pointer">Drywall Installation & Repair</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-[#A67C52] cursor-pointer">TV Mounting & Wall Anchoring</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-[#A67C52] cursor-pointer">Plumbing Fixture Installation</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-[#A67C52] cursor-pointer">Flooring Installation & Repair</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-[#A67C52] cursor-pointer">Interior & Exterior Painting</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-[#A67C52] cursor-pointer">Kitchen & Bath Remodeling</button></li>
          </ul>
        </div>

        {/* Hours & Contact */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Dispatch & Hours</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Service Hours:</strong>
                <span>Mon - Sat: 7:00 AM - 7:00 PM</span><br />
                <span>Sunday: Emergency Dispatch Only</span>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <Phone className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
              <div>
                <button onClick={openCallbackModal} className="text-[#A67C52] font-bold hover:underline cursor-pointer">
                  (555) 382-4263
                </button>
                <span className="block text-[11px] text-[#BDB6AC]">Dispatch & Support</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Mail className="w-4 h-4 text-[#A67C52] shrink-0" />
              <span>service@onestophandyman.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#232E2E] bg-[#232E2E] py-4 px-4 text-center text-[#9E988F] text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} One Stop Shop Handyman Services. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Service Guarantee</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
