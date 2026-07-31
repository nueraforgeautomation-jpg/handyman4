import React, { useState } from 'react';
import { REVIEWS, FAQS } from '../data/reviewsData';
import { Star, ShieldCheck, ChevronDown, Search, CheckCircle2, MessageSquare } from 'lucide-react';

export const ReviewsAndFaq: React.FC = () => {
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter((f) => {
    const term = faqSearch.toLowerCase().trim();
    return !term || f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term);
  });

  return (
    <section className="py-16 bg-[#FBF9F6] text-[#332D29] border-t border-[#E6E1D6]">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        
        {/* REVIEWS SECTION */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#A67C52]" />
              <span>4.9 Star Verified Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3A] tracking-tight">
              Loved by Homeowners Across Town
            </h2>
            <p className="text-[#6B655E] text-sm max-w-xl mx-auto">
              Read real feedback from neighbors who trust One Stop Shop Handyman Services for drywall, plumbing, TV mounting, and home maintenance.
            </p>
          </div>

          {/* Rating Summary Bar */}
          <div className="bg-white rounded-3xl p-6 border border-[#E6E1D6] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-extrabold text-[#A67C52]">4.9</span>
              <div>
                <div className="flex items-center gap-1 text-[#A67C52]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#A67C52]" />
                  ))}
                </div>
                <span className="text-xs text-[#6B655E] block mt-1">Based on 480+ local customer reviews</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="bg-[#FBF9F6] px-4 py-2 rounded-xl border border-[#E6E1D6] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5A6D5D]" />
                <span className="text-[#332D29]">100% Workmanship Guarantee</span>
              </div>
              <div className="bg-[#FBF9F6] px-4 py-2 rounded-xl border border-[#E6E1D6] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A67C52]" />
                <span className="text-[#332D29]">Verified Purchases</span>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl border border-[#E6E1D6] p-6 space-y-4 shadow-sm hover:border-[#A67C52]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#2D3A3A] text-base">{review.author}</h4>
                    <span className="text-xs text-[#6B655E]">{review.location} • {review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#A67C52]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A67C52]" />
                    ))}
                  </div>
                </div>

                <div className="inline-block bg-[#FBF9F6] px-3 py-1 rounded-full text-[11px] font-semibold text-[#A67C52] border border-[#E6E1D6]">
                  {review.serviceName}
                </div>

                <p className="text-[#332D29] text-xs leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>

                <div className="pt-2 border-t border-[#E6E1D6] flex items-center gap-1.5 text-[11px] text-[#5A6D5D] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Completed Service</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQS SECTION */}
        <div className="space-y-8 pt-8 border-t border-[#E6E1D6]">
          <div className="text-center space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D3A3A]">
              Frequently Asked Questions
            </h3>
            <p className="text-[#6B655E] text-xs max-w-lg mx-auto">
              Everything you need to know about pricing, service areas, tools, and guarantees.
            </p>
          </div>

          {/* FAQ Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#8C857B] absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search questions (e.g. tools, pricing, emergency...)"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full bg-white border border-[#E6E1D6] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#332D29] placeholder-[#8C857B] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E6E1D6] overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-[#2D3A3A] text-sm flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FBF9F6] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#A67C52] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#4A443F] leading-relaxed border-t border-[#E6E1D6] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
