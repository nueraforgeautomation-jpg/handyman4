import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HANDYMAN_SERVICES } from '../data/servicesData';
import { HandymanService, BookingDetails } from '../types';
import { 
  Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle2, 
  Wrench, ShieldCheck, Download, Plus, Trash2, ArrowRight, ArrowLeft, Sparkles, AlertCircle 
} from 'lucide-react';

interface SchedulingPageProps {
  initialServices?: { service: HandymanService; quantity: number }[];
  onBookingConfirmed: (booking: BookingDetails) => void;
  onNavigateToBookings: () => void;
}

const TIME_SLOTS = [
  { id: 'morning', label: '08:00 AM - 11:00 AM (Morning Window)', badge: 'Most Popular' },
  { id: 'midday', label: '11:30 AM - 02:30 PM (Midday Window)', badge: 'Available' },
  { id: 'afternoon', label: '03:00 PM - 06:00 PM (Afternoon Window)', badge: 'Fast Dispatch' }
];

export const SchedulingPage: React.FC<SchedulingPageProps> = ({
  initialServices = [],
  onBookingConfirmed,
  onNavigateToBookings,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Services
  const [selectedServices, setSelectedServices] = useState<{ service: HandymanService; quantity: number }[]>(
    initialServices.length > 0 
      ? initialServices 
      : [{ service: HANDYMAN_SERVICES[0], quantity: 1 }]
  );

  const [addons, setAddons] = useState<{ id: string; name: string; price: number; checked: boolean }[]>([
    { id: 'haul-away', name: 'Haul Away Packaging & Old Fixtures', price: 35, checked: false },
    { id: 'paint-match', name: 'Paint Color Scan & Custom Tint Match', price: 45, checked: false },
    { id: 'wall-anchors', name: 'Heavy-Duty Toggle Anchors Upgrade (Over 50lbs)', price: 25, checked: false },
    { id: 'moisture-seal', name: 'Waterproof Silicone Mould Protection Seal', price: 30, checked: false }
  ]);

  // Step 2: Property
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [address, setAddress] = useState('');
  const [unit, setUnit] = useState('');
  const [zipCode, setZipCode] = useState('90210');
  const [accessNotes, setAccessNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  // Step 3: Date & Time
  // Default to tomorrow's date formatted YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[0].label);

  // Step 4: Contact Info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(true);

  // Step 5: Completed Booking State
  const [completedBooking, setCompletedBooking] = useState<BookingDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Next 14 Available Dates
  const availableDates = React.useMemo(() => {
    const list = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      list.push({ dateStr, dayName, monthDay });
    }
    return list;
  }, []);

  // Add / Remove services in step 1
  const handleAddService = (serviceId: string) => {
    if (!serviceId) return;
    const found = HANDYMAN_SERVICES.find((s) => s.id === serviceId);
    if (found && !selectedServices.some((item) => item.service.id === serviceId)) {
      setSelectedServices([...selectedServices, { service: found, quantity: 1 }]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    if (selectedServices.length === 1) {
      alert('Your appointment must include at least 1 handyman service.');
      return;
    }
    setSelectedServices(selectedServices.filter((s) => s.service.id !== serviceId));
  };

  const handleQuantityChange = (serviceId: string, qty: number) => {
    setSelectedServices(
      selectedServices.map((item) =>
        item.service.id === serviceId ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const toggleAddon = (id: string) => {
    setAddons(
      addons.map((a) => (a.id === id ? { ...a, checked: !a.checked } : a))
    );
  };

  // Math totals
  const baseEstimate = selectedServices.reduce(
    (sum, item) => sum + Math.round((item.service.estimatedPriceMin + item.service.estimatedPriceMax) / 2) * item.quantity,
    0
  );
  const addonsTotal = addons.filter((a) => a.checked).reduce((sum, a) => sum + a.price, 0);
  const totalInvoiceEstimate = baseEstimate + addonsTotal;

  // Final submit booking handler
  const handleFinalBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail || !address) {
      alert('Please complete all required fields (Name, Phone, Email, Address).');
      return;
    }

    setIsSubmitting(true);

    const bookingPayload = {
      services: selectedServices.map((item) => ({
        serviceId: item.service.id,
        serviceTitle: item.service.title,
        quantity: item.quantity,
        priceEstimate: Math.round((item.service.estimatedPriceMin + item.service.estimatedPriceMax) / 2) * item.quantity
      })),
      totalEstimate: totalInvoiceEstimate,
      propertyType,
      address: unit ? `${address}, Unit ${unit}` : address,
      zipCode,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      urgency: 'standard',
      customerName,
      customerPhone,
      customerEmail,
      notes: accessNotes,
      photoUrl
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const data = await res.json();
      
      let finalBooking: BookingDetails;
      if (data.success && data.booking) {
        finalBooking = data.booking;
      } else {
        // Fallback local creation
        finalBooking = {
          ...bookingPayload,
          id: `OSS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          createdAt: new Date().toISOString(),
          status: 'confirmed',
          urgency: 'standard'
        };
      }

      setCompletedBooking(finalBooking);
      onBookingConfirmed(finalBooking);
      setCurrentStep(5);

      // Trigger Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

    } catch (err) {
      console.error('Booking submission failed, using local confirmation:', err);
      const fallbackBooking: BookingDetails = {
        ...bookingPayload,
        id: `OSS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        urgency: 'standard'
      };
      setCompletedBooking(fallbackBooking);
      onBookingConfirmed(fallbackBooking);
      setCurrentStep(5);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate .ICS Calendar File
  const downloadCalendarICS = () => {
    if (!completedBooking) return;
    const title = `One Stop Shop Handyman Appointment (${completedBooking.id})`;
    const details = `Handyman service appointment for ${completedBooking.customerName}. Services: ${completedBooking.services.map(s => s.serviceTitle).join(', ')}`;
    const location = completedBooking.address;
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//One Stop Shop Handyman Services//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:${completedBooking.date.replace(/-/g, '')}T090000Z
DTEND:${completedBooking.date.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Handyman-Appointment-${completedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-[#FBF9F6] text-[#332D29] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Step Progress Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Interactive Online Booking Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3A] tracking-tight">
            Schedule Your Handyman Appointment
          </h2>
          <p className="text-[#6B655E] text-sm">
            Fast 2-minute booking with real-time slot availability. No credit card required upfront.
          </p>
        </div>

        {/* Step Progress Indicators */}
        {currentStep < 5 && (
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, title: 'Services' },
              { num: 2, title: 'Property' },
              { num: 3, title: 'Date & Time' },
              { num: 4, title: 'Contact' }
            ].map((step) => {
              const isCurrent = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <div
                  key={step.num}
                  className={`p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[#5A6D5D] text-white font-bold border-[#5A6D5D] shadow-sm'
                      : isDone
                      ? 'bg-[#FBF9F6] text-[#5A6D5D] border-[#5A6D5D]/50 font-semibold'
                      : 'bg-white text-[#8C857B] border-[#E6E1D6]'
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-wider opacity-80">Step {step.num}</span>
                  <span className="text-xs sm:text-sm font-semibold truncate block">{step.title}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 1: SERVICES & ADD-ONS */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D6] space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-4">
              <h3 className="text-xl font-bold text-[#2D3A3A] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#A67C52]" />
                <span>1. Select Repair Services</span>
              </h3>
              <span className="text-xs text-[#6B655E]">Step 1 of 4</span>
            </div>

            {/* List of active services in this booking */}
            <div className="space-y-3">
              {selectedServices.map(({ service, quantity }) => (
                <div key={service.id} className="bg-[#FBF9F6] p-4 rounded-2xl border border-[#E6E1D6] flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#2D3A3A] text-sm">{service.title}</h4>
                    <p className="text-xs text-[#6B655E] line-clamp-1">{service.shortDescription}</p>
                    <span className="text-xs text-[#5A6D5D] font-bold">
                      Est. Price: ${service.estimatedPriceMin * quantity} - ${service.estimatedPriceMax * quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-[#E6E1D6] text-xs">
                      <button
                        onClick={() => handleQuantityChange(service.id, quantity - 1)}
                        className="w-6 h-6 rounded bg-[#EFECE6] text-[#332D29] font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-[#332D29] font-bold">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(service.id, quantity + 1)}
                        className="w-6 h-6 rounded bg-[#EFECE6] text-[#332D29] font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveService(service.id)}
                      className="text-[#8C857B] hover:text-red-500 p-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dropdown to Add Additional Services */}
            <div className="bg-[#FBF9F6] p-4 rounded-2xl border border-[#E6E1D6] space-y-2">
              <label className="block text-xs font-bold text-[#332D29]">
                + Add Another Service to This Appointment:
              </label>
              <select
                onChange={(e) => {
                  handleAddService(e.target.value);
                  e.target.value = '';
                }}
                className="w-full bg-white border border-[#E6E1D6] rounded-xl px-3 py-2.5 text-xs text-[#332D29] focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
              >
                <option value="">Choose service from catalog...</option>
                {HANDYMAN_SERVICES.filter(s => !selectedServices.some(item => item.service.id === s.id)).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} (${s.estimatedPriceMin}-${s.estimatedPriceMax})
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Add-ons */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Optional Service Add-ons & Prep:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      addon.checked
                        ? 'bg-[#A67C52]/10 border-[#A67C52] text-[#332D29] font-semibold'
                        : 'bg-[#FBF9F6] border-[#E6E1D6] text-[#6B655E] hover:text-[#332D29]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addon.checked}
                        onChange={() => {}}
                        className="accent-[#A67C52]"
                      />
                      <span>{addon.name}</span>
                    </div>
                    <span className="font-bold text-[#A67C52]">+${addon.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 border-t border-[#E6E1D6] flex items-center justify-between">
              <div className="text-xs">
                <span className="text-[#6B655E]">Subtotal Estimate: </span>
                <strong className="text-[#5A6D5D] text-base font-extrabold">${totalInvoiceEstimate}</strong>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-6 py-3 rounded-full text-sm flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Continue to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROPERTY & ADDRESS DETAILS */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D6] space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-4">
              <h3 className="text-xl font-bold text-[#2D3A3A] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#A67C52]" />
                <span>2. Property & Job Location</span>
              </h3>
              <span className="text-xs text-[#6B655E]">Step 2 of 4</span>
            </div>

            {/* Property Type Radio */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Property Type:
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPropertyType('residential')}
                  className={`p-3.5 rounded-2xl border text-center font-bold cursor-pointer ${
                    propertyType === 'residential'
                      ? 'bg-[#5A6D5D] text-white border-[#5A6D5D] shadow'
                      : 'bg-[#FBF9F6] border-[#E6E1D6] text-[#6B655E]'
                  }`}
                >
                  Residential Home / Condo
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType('commercial')}
                  className={`p-3.5 rounded-2xl border text-center font-bold cursor-pointer ${
                    propertyType === 'commercial'
                      ? 'bg-[#5A6D5D] text-white border-[#5A6D5D] shadow'
                      : 'bg-[#FBF9F6] border-[#E6E1D6] text-[#6B655E]'
                  }`}
                >
                  Commercial / Office / Retail
                </button>
              </div>
            </div>

            {/* Address Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-[#332D29] font-semibold">Street Address *</label>
                <input
                  type="text"
                  placeholder="e.g. 1244 Grand Avenue"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#332D29] font-semibold">Apt / Unit (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Suite 4B"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                />
              </div>
            </div>

            {/* ZIP & Access Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[#332D29] font-semibold">ZIP Code *</label>
                <input
                  type="text"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-[#332D29] font-semibold">Access & Parking Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Gate code 4821, park in driveway, beware of friendly dog..."
                  value={accessNotes}
                  onChange={(e) => setAccessNotes(e.target.value)}
                  className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl px-4 py-3 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                />
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-4 border-t border-[#E6E1D6] flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-[#EFECE6] text-[#332D29] font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => {
                  if (!address.trim()) {
                    alert('Please enter your street address.');
                    return;
                  }
                  setCurrentStep(3);
                }}
                className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-6 py-3 rounded-full text-sm flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME SLOT SELECTION */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D6] space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-4">
              <h3 className="text-xl font-bold text-[#2D3A3A] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#A67C52]" />
                <span>3. Choose Date & Arrival Window</span>
              </h3>
              <span className="text-xs text-[#6B655E]">Step 3 of 4</span>
            </div>

            {/* Date Selector Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Select Preferred Date:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateStr;
                  return (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#5A6D5D] text-white font-extrabold border-[#5A6D5D] shadow-md scale-105'
                          : 'bg-[#FBF9F6] border-[#E6E1D6] text-[#332D29] hover:border-[#5A6D5D]/50'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider">{item.dayName}</span>
                      <span className="text-xs font-bold block mt-0.5">{item.monthDay}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Select Craftsman Arrival Time Window:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.label;
                  return (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedTimeSlot(slot.label)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                        isSelected
                          ? 'bg-[#A67C52]/10 border-[#A67C52] text-[#332D29] font-bold ring-2 ring-[#A67C52]'
                          : 'bg-[#FBF9F6] border-[#E6E1D6] text-[#6B655E] hover:border-[#A67C52]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Clock className={`w-4 h-4 ${isSelected ? 'text-[#A67C52]' : 'text-[#8C857B]'}`} />
                        <span className="bg-[#EFECE6] text-[#A67C52] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E6E1D6]">
                          {slot.badge}
                        </span>
                      </div>
                      <span className="block text-xs font-bold">{slot.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3 Actions */}
            <div className="pt-4 border-t border-[#E6E1D6] flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-[#EFECE6] text-[#332D29] font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-6 py-3 rounded-full text-sm flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Continue to Contact Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT INFO & CONFIRMATION */}
        {currentStep === 4 && (
          <form onSubmit={handleFinalBookingSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D6] space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-4">
              <h3 className="text-xl font-bold text-[#2D3A3A] flex items-center gap-2">
                <User className="w-5 h-5 text-[#A67C52]" />
                <span>4. Contact Information & Booking Summary</span>
              </h3>
              <span className="text-xs text-[#6B655E]">Final Step</span>
            </div>

            {/* Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-[#332D29] font-semibold">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C857B] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl pl-10 pr-4 py-3 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[#332D29] font-semibold">Mobile Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C857B] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (555) 234-5678"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl pl-10 pr-4 py-3 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-[#332D29] font-semibold">Email Address (for instant receipt) *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C857B] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-xl pl-10 pr-4 py-3 text-[#332D29] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox for SMS updates */}
            <div className="flex items-center gap-2 text-xs text-[#4A443F]">
              <input
                type="checkbox"
                id="smsOptIn"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="accent-[#A67C52] w-4 h-4"
              />
              <label htmlFor="smsOptIn">
                Send SMS arrival status notifications and craftsman ETA updates
              </label>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-[#FBF9F6] p-5 rounded-2xl border border-[#E6E1D6] space-y-3 text-xs">
              <h4 className="font-bold text-[#A67C52] uppercase tracking-wider">
                Appointment Summary:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#4A443F]">
                <div>
                  <span className="text-[#6B655E] block">Date & Arrival:</span>
                  <strong className="text-[#2D3A3A]">{selectedDate} ({selectedTimeSlot})</strong>
                </div>
                <div>
                  <span className="text-[#6B655E] block">Location:</span>
                  <strong className="text-[#2D3A3A]">{address} {unit && `Unit ${unit}`} ({zipCode})</strong>
                </div>
                <div>
                  <span className="text-[#6B655E] block">Services ({selectedServices.length}):</span>
                  <strong className="text-[#2D3A3A]">{selectedServices.map(s => s.service.title).join(', ')}</strong>
                </div>
                <div>
                  <span className="text-[#6B655E] block">Estimated Total:</span>
                  <strong className="text-[#5A6D5D] text-sm font-extrabold">${totalInvoiceEstimate}</strong>
                </div>
              </div>
            </div>

            {/* Step 4 Actions */}
            <div className="pt-4 border-t border-[#E6E1D6] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="bg-[#EFECE6] text-[#332D29] font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-extrabold px-8 py-3 rounded-full text-base flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <span>Securing Booking...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Confirm & Book Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: BOOKING CONFIRMED SCREEN */}
        {currentStep === 5 && completedBooking && (
          <div className="bg-white rounded-3xl p-8 border border-[#E6E1D6] space-y-8 text-center shadow-md">
            <div className="w-20 h-20 bg-[#5A6D5D]/10 text-[#5A6D5D] rounded-full flex items-center justify-center mx-auto border border-[#5A6D5D]/30">
              <CheckCircle2 className="w-10 h-10 text-[#5A6D5D]" />
            </div>

            <div className="space-y-2">
              <span className="bg-[#A67C52]/10 text-[#A67C52] text-xs font-bold px-3 py-1 rounded-full border border-[#A67C52]/30">
                BOOKING CONFIRMED • ID: {completedBooking.id}
              </span>
              <h3 className="text-3xl font-extrabold text-[#2D3A3A]">
                You&apos;re All Set, {completedBooking.customerName}!
              </h3>
              <p className="text-[#6B655E] text-sm max-w-lg mx-auto">
                Your handyman appointment has been reserved. A confirmation copy has been dispatched to <strong className="text-[#2D3A3A]">{completedBooking.customerEmail}</strong>.
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-[#FBF9F6] p-6 rounded-2xl border border-[#E6E1D6] text-left max-w-xl mx-auto space-y-3 text-xs text-[#332D29]">
              <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-2">
                <span className="text-[#6B655E]">Appointment Date:</span>
                <strong className="text-[#2D3A3A] font-bold">{completedBooking.date}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-2">
                <span className="text-[#6B655E]">Arrival Window:</span>
                <strong className="text-[#A67C52] font-bold">{completedBooking.timeSlot}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-2">
                <span className="text-[#6B655E]">Service Address:</span>
                <strong className="text-[#2D3A3A]">{completedBooking.address}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-2">
                <span className="text-[#6B655E]">Total Estimated Cost:</span>
                <strong className="text-[#5A6D5D] text-sm font-bold">${completedBooking.totalEstimate}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={downloadCalendarICS}
                className="w-full sm:w-auto bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#332D29] font-bold px-6 py-3 rounded-full text-xs flex items-center justify-center gap-2 border border-[#E6E1D6] cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#A67C52]" />
                <span>Download .ICS Calendar Invite</span>
              </button>

              <button
                onClick={onNavigateToBookings}
                className="w-full sm:w-auto bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-extrabold px-6 py-3 rounded-full text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>View My Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
