import React, { useState, useEffect } from 'react';
import { BookingDetails } from '../types';
import { Calendar, Clock, MapPin, User, CheckCircle2, Download, Trash2, Phone, AlertCircle, Wrench, RefreshCw } from 'lucide-react';

interface MyBookingsProps {
  onNavigateToSchedule: () => void;
  openCallbackModal: () => void;
}

export const MyBookings: React.FC<MyBookingsProps> = ({ onNavigateToSchedule, openCallbackModal }) => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
    } catch {
      console.error('Failed to load bookings from API');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id: string) => {
    if (!confirm(`Are you sure you want to cancel booking ${id}?`)) return;

    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    } catch {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const downloadCalendarICS = (booking: BookingDetails) => {
    const title = `One Stop Shop Handyman Appointment (${booking.id})`;
    const details = `Handyman service appointment for ${booking.customerName}. Services: ${booking.services.map(s => s.serviceTitle).join(', ')}`;
    const location = booking.address;
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//One Stop Shop Handyman Services//EN
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
DTSTART:${booking.date.replace(/-/g, '')}T090000Z
DTEND:${booking.date.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Handyman-Appointment-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 bg-[#FBF9F6] text-[#332D29] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E6E1D6] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Customer Appointment Portal</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#2D3A3A]">My Handyman Appointments</h2>
            <p className="text-[#6B655E] text-xs mt-1">Manage scheduled repairs, download calendar invites, or request rescheduling.</p>
          </div>

          <button
            onClick={onNavigateToSchedule}
            className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>+ Book New Appointment</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl capitalize font-semibold cursor-pointer transition-colors ${
                  filterStatus === st
                    ? 'bg-[#5A6D5D] text-white'
                    : 'bg-white text-[#6B655E] hover:text-[#332D29] border border-[#E6E1D6]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={fetchBookings}
            className="text-[#6B655E] hover:text-[#332D29] flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="py-12 text-center text-[#6B655E]">Loading appointments...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white border border-[#E6E1D6] rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <Wrench className="w-12 h-12 text-[#8C857B] mx-auto" />
            <h3 className="text-lg font-bold text-[#2D3A3A]">No appointments found</h3>
            <p className="text-xs text-[#6B655E]">You don&apos;t have any active appointments under this filter.</p>
            <button
              onClick={onNavigateToSchedule}
              className="bg-[#A67C52] text-white font-bold px-5 py-2.5 rounded-full text-xs cursor-pointer shadow-sm"
            >
              Book Service Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl border border-[#E6E1D6] p-6 space-y-4 shadow-sm"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E6E1D6] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-[#A67C52] text-base">{booking.id}</span>
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                      booking.status === 'confirmed'
                        ? 'bg-[#5A6D5D]/10 text-[#5A6D5D] border-[#5A6D5D]/30'
                        : booking.status === 'cancelled'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-[#EFECE6] text-[#332D29] border-[#E6E1D6]'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <span className="text-xs text-[#6B655E]">
                    Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#332D29]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#A67C52]" />
                      <span>Date: <strong className="text-[#2D3A3A]">{booking.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#A67C52]" />
                      <span>Window: <strong className="text-[#2D3A3A]">{booking.timeSlot}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#A67C52]" />
                      <span>Address: <strong className="text-[#2D3A3A]">{booking.address}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#A67C52]" />
                      <span>Customer: <strong className="text-[#2D3A3A]">{booking.customerName} ({booking.customerPhone})</strong></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Wrench className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                      <span>Services: <strong className="text-[#2D3A3A]">{booking.services.map(s => `${s.serviceTitle} (x${s.quantity})`).join(', ')}</strong></span>
                    </div>
                    <div>
                      <span className="text-[#6B655E]">Estimated Invoice: </span>
                      <strong className="text-[#5A6D5D] text-sm font-extrabold">${booking.totalEstimate}</strong>
                    </div>
                  </div>
                </div>

                {/* Notes if any */}
                {booking.notes && (
                  <div className="bg-[#FBF9F6] p-3 rounded-2xl border border-[#E6E1D6] text-xs text-[#6B655E]">
                    <strong className="text-[#2D3A3A]">Access Notes: </strong> {booking.notes}
                  </div>
                )}

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#E6E1D6] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => downloadCalendarICS(booking)}
                        className="bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#332D29] font-semibold px-3.5 py-2 rounded-xl border border-[#E6E1D6] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#A67C52]" />
                        <span>Add to Calendar</span>
                      </button>
                    )}

                    <button
                      onClick={openCallbackModal}
                      className="text-[#A67C52] hover:text-[#8B5E3C] font-semibold px-3 py-2 flex items-center gap-1 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Dispatch</span>
                    </button>
                  </div>

                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1 px-3 py-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Appointment</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
