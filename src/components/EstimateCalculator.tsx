import React, { useState } from 'react';
import { HANDYMAN_SERVICES } from '../data/servicesData';
import { HandymanService } from '../types';
import { FileText, Plus, Trash2, Calendar, CheckCircle2, Sparkles, Upload, ArrowRight, Wrench, ShieldCheck, DollarSign } from 'lucide-react';

interface EstimateCalculatorProps {
  quoteServices: { service: HandymanService; quantity: number }[];
  onAddService: (service: HandymanService) => void;
  onRemoveService: (serviceId: string) => void;
  onUpdateQuantity: (serviceId: string, quantity: number) => void;
  onProceedToSchedule: (servicesWithQty: { service: HandymanService; quantity: number }[], urgency: string, photoUrl?: string) => void;
}

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({
  quoteServices,
  onAddService,
  onRemoveService,
  onUpdateQuantity,
  onProceedToSchedule,
}) => {
  const [urgency, setUrgency] = useState<'standard' | 'same_day'>('standard');
  const [selectedAddServiceId, setSelectedAddServiceId] = useState<string>('');
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  // Available services not yet in quote
  const availableServices = HANDYMAN_SERVICES.filter(
    (s) => !quoteServices.some((qs) => qs.service.id === s.id)
  );

  const handleAddSelected = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddServiceId) return;
    const found = HANDYMAN_SERVICES.find((s) => s.id === selectedAddServiceId);
    if (found) {
      onAddService(found);
      setSelectedAddServiceId('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Math calculation
  const subtotalMin = quoteServices.reduce((acc, item) => acc + item.service.estimatedPriceMin * item.quantity, 0);
  const subtotalMax = quoteServices.reduce((acc, item) => acc + item.service.estimatedPriceMax * item.quantity, 0);

  // Multi-service discount (10% off when 2+ services selected)
  const isMultiDiscount = quoteServices.length >= 2;
  const discountMultiplier = isMultiDiscount ? 0.9 : 1.0;

  const urgencyMultiplier = urgency === 'same_day' ? 1.2 : 1.0;

  const finalMin = Math.round(subtotalMin * discountMultiplier * urgencyMultiplier);
  const finalMax = Math.round(subtotalMax * discountMultiplier * urgencyMultiplier);

  return (
    <section className="py-12 bg-[#FBF9F6] text-[#332D29] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Multi-Service Estimate Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3A] tracking-tight">
            Instant Repair Quote Calculator
          </h2>
          <p className="text-[#6B655E] text-sm max-w-xl mx-auto">
            Combine multiple repair jobs into one visit. Save up to <strong className="text-[#A67C52]">10% off labor</strong> when booking 2 or more services!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Services List & Picker */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Add Dropdown */}
            <form onSubmit={handleAddSelected} className="bg-[#EFECE6] p-5 rounded-3xl border border-[#E6E1D6] space-y-3">
              <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Add a Service to Quote:
              </label>
              <div className="flex gap-2">
                <select
                  value={selectedAddServiceId}
                  onChange={(e) => setSelectedAddServiceId(e.target.value)}
                  className="flex-1 bg-white border border-[#E6E1D6] rounded-xl px-3 py-2.5 text-xs text-[#332D29] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                >
                  <option value="">Select a service to add...</option>
                  {availableServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} (${s.estimatedPriceMin}-${s.estimatedPriceMax})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={!selectedAddServiceId}
                  className="bg-[#A67C52] hover:bg-[#8B5E3C] disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </form>

            {/* Selected Items List */}
            <div className="bg-white rounded-3xl border border-[#E6E1D6] p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-3">
                <h3 className="font-bold text-[#2D3A3A] text-base flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#A67C52]" />
                  <span>Selected Repair Jobs ({quoteServices.length})</span>
                </h3>
                {isMultiDiscount && (
                  <span className="bg-[#5A6D5D]/10 text-[#5A6D5D] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#5A6D5D]/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 10% Bundle Discount Applied!
                  </span>
                )}
              </div>

              {quoteServices.length === 0 ? (
                <div className="py-8 text-center text-[#8C857B] space-y-3">
                  <Wrench className="w-10 h-10 mx-auto text-[#8C857B]" />
                  <p className="text-xs">No services added to quote yet.</p>
                  <p className="text-[11px] text-[#6B655E]">Select services from the catalog or dropdown above to calculate your job total.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {quoteServices.map(({ service, quantity }) => (
                    <div
                      key={service.id}
                      className="bg-[#FBF9F6] p-4 rounded-2xl border border-[#E6E1D6] flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#2D3A3A] text-sm">{service.title}</h4>
                          <span className="text-[10px] text-[#6B655E] bg-[#EFECE6] px-2 py-0.5 rounded-full border border-[#E6E1D6]">
                            {service.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B655E] line-clamp-1">{service.shortDescription}</p>
                        <span className="text-xs text-[#5A6D5D] font-bold">
                          ${service.estimatedPriceMin * quantity} - ${service.estimatedPriceMax * quantity} est.
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-[#E6E1D6] text-xs">
                          <button
                            onClick={() => onUpdateQuantity(service.id, Math.max(1, quantity - 1))}
                            className="w-6 h-6 rounded bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#332D29] font-bold flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-[#332D29] font-semibold">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(service.id, quantity + 1)}
                            className="w-6 h-6 rounded bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#332D29] font-bold flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveService(service.id)}
                          className="text-[#8C857B] hover:text-red-500 p-1.5 rounded-lg hover:bg-[#EFECE6] transition-colors cursor-pointer"
                          title="Remove from quote"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Service Urgency Option */}
            <div className="bg-white p-6 rounded-3xl border border-[#E6E1D6] space-y-3 shadow-sm">
              <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Select Scheduling Priority:
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setUrgency('standard')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    urgency === 'standard'
                      ? 'bg-[#A67C52]/10 border-[#A67C52] text-[#332D29] font-bold'
                      : 'bg-[#FBF9F6] border-[#E6E1D6] text-[#6B655E] hover:text-[#332D29]'
                  }`}
                >
                  <span className="block font-bold">Standard Appointment</span>
                  <span className="text-[11px] text-[#6B655E]">Scheduled within 2-5 days (Standard rates)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('same_day')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    urgency === 'same_day'
                      ? 'bg-[#A67C52]/10 border-[#A67C52] text-[#332D29] font-bold'
                      : 'bg-[#FBF9F6] border-[#E6E1D6] text-[#6B655E] hover:text-[#332D29]'
                  }`}
                >
                  <span className="block font-bold text-[#A67C52]">Same-Day / Priority</span>
                  <span className="text-[11px] text-[#6B655E]">Dispatch within 24 hrs (+20% priority surge)</span>
                </button>
              </div>
            </div>

            {/* Photo Upload Option */}
            <div className="bg-white p-6 rounded-3xl border border-[#E6E1D6] space-y-3 shadow-sm">
              <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Attach Photo of Repair Area (Optional):
              </label>
              <p className="text-xs text-[#6B655E]">
                Uploading a photo helps our craftsman bring exact materials, matching paint, or specialized brackets.
              </p>
              
              <div className="flex items-center gap-4">
                <label className="bg-[#EFECE6] hover:bg-[#E6E1D6] border border-[#E6E1D6] px-4 py-2.5 rounded-xl text-xs font-semibold text-[#332D29] flex items-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#A67C52]" />
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {uploadedPhotoUrl && (
                  <div className="flex items-center gap-2 bg-[#5A6D5D]/10 border border-[#5A6D5D]/30 p-1.5 px-3 rounded-xl text-xs text-[#5A6D5D] font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#5A6D5D]" />
                    <span>Photo Attached</span>
                  </div>
                )}
              </div>

              {uploadedPhotoUrl && (
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[#E6E1D6] mt-2">
                  <img src={uploadedPhotoUrl} alt="Repair area preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Estimate Summary Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-[#EFECE6] rounded-3xl p-6 border border-[#E6E1D6] space-y-6 shadow-md">
              
              <div className="border-b border-[#E6E1D6] pb-4">
                <h3 className="text-xl font-extrabold text-[#2D3A3A] flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-[#A67C52]" />
                  <span>Quote Estimate Summary</span>
                </h3>
                <p className="text-xs text-[#6B655E]">No deposit required to book</p>
              </div>

              {/* Price Display */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6E1D6] space-y-2 text-center">
                <span className="text-xs text-[#6B655E] uppercase tracking-wider font-semibold block">
                  Estimated Total Range
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#5A6D5D]">
                  ${finalMin} - ${finalMax}
                </div>
                <p className="text-[11px] text-[#8C857B]">
                  Includes labor, basic hardware fasteners, and tool setup.
                </p>
              </div>

              {/* Breakdown detail */}
              <div className="space-y-2.5 text-xs text-[#4A443F]">
                <div className="flex justify-between">
                  <span className="text-[#6B655E]">Services Selected:</span>
                  <span className="font-semibold text-[#2D3A3A]">{quoteServices.length} Jobs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B655E]">Base Subtotal:</span>
                  <span>${subtotalMin} - ${subtotalMax}</span>
                </div>
                {isMultiDiscount && (
                  <div className="flex justify-between text-[#5A6D5D] font-bold">
                    <span>Bundle Discount (10%):</span>
                    <span>-${Math.round(subtotalMin * 0.1)} - -${Math.round(subtotalMax * 0.1)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#6B655E]">Priority Level:</span>
                  <span className="capitalize font-semibold text-[#A67C52]">{urgency.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 text-[11px] text-[#6B655E] bg-white p-4 rounded-2xl border border-[#E6E1D6]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5A6D5D] shrink-0" />
                  <span>Final quote confirmed on-site before work begins.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A67C52] shrink-0" />
                  <span>Zero payment until job is 100% completed & inspected.</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (quoteServices.length === 0) {
                    alert('Please add at least one service to your quote estimate.');
                    return;
                  }
                  onProceedToSchedule(quoteServices, urgency, uploadedPhotoUrl || undefined);
                }}
                disabled={quoteServices.length === 0}
                className="w-full bg-[#A67C52] hover:bg-[#8B5E3C] disabled:opacity-50 text-white font-extrabold py-3.5 rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Transfer Quote to Booking Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
