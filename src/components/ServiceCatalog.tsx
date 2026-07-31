import React, { useState, useMemo } from 'react';
import { HANDYMAN_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData';
import { HandymanService, ServiceCategory } from '../types';
import { Search, Wrench, Clock, DollarSign, CheckCircle2, ArrowRight, Plus, Sparkles, X, Info } from 'lucide-react';

interface ServiceCatalogProps {
  initialSearchTerm?: string;
  onSelectServiceForBooking: (service: HandymanService) => void;
  onAddToQuote: (service: HandymanService) => void;
  quoteServiceIds: string[];
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  initialSearchTerm = '',
  onSelectServiceForBooking,
  onAddToQuote,
  quoteServiceIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [activeModalService, setActiveModalService] = useState<HandymanService | null>(null);

  // Sync initial search term if provided
  React.useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const filteredServices = useMemo(() => {
    return HANDYMAN_SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      if (!term) return matchesCategory;

      const matchesTitle = service.title.toLowerCase().includes(term);
      const matchesDesc = service.shortDescription.toLowerCase().includes(term);
      const matchesKeywords = service.keywords.some((kw) => kw.toLowerCase().includes(term));

      return matchesCategory && (matchesTitle || matchesDesc || matchesKeywords);
    });
  }, [selectedCategory, searchTerm]);

  return (
    <section className="py-12 bg-[#FBF9F6] text-[#332D29] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Complete Repair & Installation Index</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3A] tracking-tight">
            Our Professional Handyman Services
          </h2>
          <p className="text-[#6B655E] text-sm sm:text-base">
            Transparent pricing, skilled local craftsmen, and guaranteed quality for every repair, installation, and property maintenance job.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#EFECE6] p-4 sm:p-6 rounded-3xl border border-[#E6E1D6] space-y-4 shadow-sm">
          <div className="relative">
            <Search className="w-5 h-5 text-[#8C857B] absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by keyword (e.g., drywall, plumbing, TV mount, cabinet, flooring, painting...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-2xl bg-white border border-[#E6E1D6] text-[#332D29] placeholder-[#8C857B] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3.5 text-[#8C857B] hover:text-[#332D29]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full uppercase tracking-wider font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#5A6D5D] text-white font-bold shadow-sm'
                      : 'bg-white hover:bg-[#E6E1D6]/60 text-[#6B655E] hover:text-[#332D29] border border-[#E6E1D6]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Result Count Banner */}
          <div className="flex items-center justify-between text-xs text-[#6B655E] pt-2 border-t border-[#E6E1D6]">
            <span>
              Showing <strong className="text-[#A67C52]">{filteredServices.length}</strong> available services
              {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            </span>
            {searchTerm && (
              <span>Matching search: &quot;{searchTerm}&quot;</span>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white border border-[#E6E1D6] rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <Wrench className="w-12 h-12 text-[#8C857B] mx-auto" />
            <h3 className="text-lg font-bold text-[#2D3A3A]">No exact service found</h3>
            <p className="text-[#6B655E] text-sm">
              We cover all handyman repairs! Try searching another term, or use our general maintenance hourly booking.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-[#A67C52] text-white font-bold px-5 py-2.5 rounded-full text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isAddedToQuote = quoteServiceIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-[#E6E1D6] overflow-hidden hover:border-[#5A6D5D]/50 transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  {/* Image & Badge */}
                  <div className="relative h-48 overflow-hidden bg-[#EFECE6]">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-[100%] h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    <span className="absolute top-3 left-3 bg-[#2D3A3A]/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                      {service.category}
                    </span>

                    {service.popular && (
                      <span className="absolute top-3 right-3 bg-[#A67C52] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                        Most Requested
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#2D3A3A] group-hover:text-[#A67C52] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[#6B655E] text-xs leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Price & Duration details */}
                    <div className="flex items-center justify-between text-xs py-2 border-y border-[#E6E1D6]">
                      <div className="flex items-center gap-1 text-[#5A6D5D] font-extrabold text-sm">
                        <DollarSign className="w-4 h-4" />
                        <span>${service.estimatedPriceMin} - ${service.estimatedPriceMax}</span>
                        <span className="text-[10px] text-[#8C857B] font-normal">({service.pricingType})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#6B655E]">
                        <Clock className="w-3.5 h-3.5 text-[#A67C52]" />
                        <span>{service.estimatedHours}</span>
                      </div>
                    </div>

                    {/* Quick Task Bullets */}
                    <div className="space-y-1 text-[11px] text-[#4A443F]">
                      {service.includedTasks.slice(0, 2).map((task, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A6D5D] shrink-0" />
                          <span className="truncate">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#332D29] font-medium py-2 px-3 rounded-xl border border-[#E6E1D6] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onSelectServiceForBooking(service)}
                      className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-sm"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onAddToQuote(service)}
                      className={`col-span-2 py-2 px-3 rounded-xl text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAddedToQuote
                          ? 'bg-[#5A6D5D]/10 text-[#5A6D5D] border border-[#5A6D5D]/30 font-bold'
                          : 'bg-[#FBF9F6] hover:bg-[#EFECE6] text-[#4A443F] border border-[#E6E1D6]'
                      }`}
                    >
                      {isAddedToQuote ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A6D5D]" />
                          <span>Added to Quote Builder</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#A67C52]" />
                          <span>Add to Multi-Service Estimate Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Detailed Service Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-[#2D3A3A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6E1D6] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-6 max-h-[90vh] flex flex-col">
            
            {/* Modal Image & Close */}
            <div className="relative h-56 bg-[#EFECE6] shrink-0">
              <img
                src={activeModalService.imageUrl}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3A3A]/80 via-transparent to-transparent"></div>
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-4 right-4 bg-white/90 text-[#332D29] hover:bg-white w-8 h-8 rounded-full flex items-center justify-center border border-[#E6E1D6] cursor-pointer shadow"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-[#A67C52] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {activeModalService.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm text-[#332D29]">
              <div>
                <h4 className="text-xs font-bold text-[#A67C52] uppercase tracking-wider mb-1">Service Description</h4>
                <p className="text-[#4A443F] leading-relaxed">
                  {activeModalService.fullDescription}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 bg-[#FBF9F6] p-4 rounded-2xl border border-[#E6E1D6]">
                <div>
                  <span className="text-xs text-[#6B655E] block">Estimated Cost:</span>
                  <span className="text-lg font-bold text-[#5A6D5D]">
                    ${activeModalService.estimatedPriceMin} - ${activeModalService.estimatedPriceMax}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#6B655E] block">Typical Duration:</span>
                  <span className="text-base font-bold text-[#2D3A3A] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#A67C52]" />
                    {activeModalService.estimatedHours}
                  </span>
                </div>
              </div>

              {/* Tasks Included */}
              <div>
                <h4 className="text-xs font-bold text-[#A67C52] uppercase tracking-wider mb-2">What&apos;s Included in Service</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalService.includedTasks.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-[#EFECE6] p-2.5 rounded-xl border border-[#E6E1D6] text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#5A6D5D] shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Tools & Fasteners Note */}
              <div className="bg-[#A67C52]/10 border border-[#A67C52]/30 p-3.5 rounded-2xl text-xs text-[#6B4725] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#332D29]">One Stop Shop Guarantee:</strong>
                  Our craftsmen bring all professional power tools, ladders, drywall compounds, fasteners, wall anchors, and drop cloths.
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#FBF9F6] border-t border-[#E6E1D6] flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  onAddToQuote(activeModalService);
                }}
                className="bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#332D29] text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#E6E1D6] cursor-pointer"
              >
                {quoteServiceIds.includes(activeModalService.id) ? 'Added to Quote' : '+ Add to Quote'}
              </button>

              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  onSelectServiceForBooking(s);
                }}
                className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-6 py-2.5 rounded-full text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <span>Book Service Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
