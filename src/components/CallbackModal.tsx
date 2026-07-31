import React, { useState } from 'react';
import { PhoneCall, X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#332D29]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E6E1D6] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8C857B] hover:text-[#332D29] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#A67C52]/10 text-[#A67C52] flex items-center justify-center border border-[#A67C52]/30">
            <PhoneCall className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2D3A3A]">Emergency Callback Request</h3>
            <p className="text-xs text-[#6B655E]">Dispatch call back within 15 minutes</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-[#5A6D5D]/10 border border-[#5A6D5D]/30 p-6 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#5A6D5D] mx-auto" />
            <h4 className="font-bold text-[#2D3A3A] text-base">Request Dispatched!</h4>
            <p className="text-xs text-[#5A6D5D]">
              Our master handyman dispatcher is calling <strong>{phone}</strong> shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block text-[#332D29] font-semibold">Your Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. (555) 382-4263"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl px-4 py-2.5 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[#332D29] font-semibold">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl px-4 py-2.5 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[#332D29] font-semibold">Brief Issue (e.g., active leak, broken lock)</label>
              <input
                type="text"
                placeholder="e.g. Burst pipe under kitchen sink..."
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl px-4 py-2.5 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
              />
            </div>

            <div className="bg-[#A67C52]/10 border border-[#A67C52]/30 p-3 rounded-2xl text-[11px] text-[#A67C52] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#A67C52] shrink-0" />
              <span>For immediate life-safety emergencies, call 911.</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold py-3 rounded-full text-xs transition-colors cursor-pointer shadow-sm"
            >
              Request Immediate Callback Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
