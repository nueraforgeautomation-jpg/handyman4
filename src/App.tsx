import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceCatalog } from './components/ServiceCatalog';
import { EstimateCalculator } from './components/EstimateCalculator';
import { SchedulingPage } from './components/SchedulingPage';
import { AiDiagnostic } from './components/AiDiagnostic';
import { MyBookings } from './components/MyBookings';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { CallbackModal } from './components/CallbackModal';
import { Footer } from './components/Footer';
import { HandymanService, BookingDetails } from './types';
import { HANDYMAN_SERVICES } from './data/servicesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [quoteServices, setQuoteServices] = useState<{ service: HandymanService; quantity: number }[]>([]);
  const [scheduleInitialServices, setScheduleInitialServices] = useState<{ service: HandymanService; quantity: number }[]>([]);
  const [catalogSearchTerm, setCatalogSearchTerm] = useState<string>('');
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState<boolean>(false);
  const [bookingsCount, setBookingsCount] = useState<number>(1); // Mock starts with 1

  // Handle adding service to quote estimate
  const handleAddToQuote = (service: HandymanService) => {
    if (!quoteServices.some((qs) => qs.service.id === service.id)) {
      setQuoteServices([...quoteServices, { service, quantity: 1 }]);
    }
  };

  const handleRemoveFromQuote = (serviceId: string) => {
    setQuoteServices(quoteServices.filter((qs) => qs.service.id !== serviceId));
  };

  const handleUpdateQuoteQuantity = (serviceId: string, quantity: number) => {
    setQuoteServices(
      quoteServices.map((qs) =>
        qs.service.id === serviceId ? { ...qs, quantity } : qs
      )
    );
  };

  // Direct "Book Now" from Service Catalog
  const handleSelectServiceForBooking = (service: HandymanService) => {
    setScheduleInitialServices([{ service, quantity: 1 }]);
    setActiveTab('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transfer multi-service quote to Scheduling
  const handleTransferQuoteToSchedule = (
    servicesWithQty: { service: HandymanService; quantity: number }[]
  ) => {
    setScheduleInitialServices(servicesWithQty);
    setActiveTab('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // From AI Diagnostic recommendation
  const handleSelectRecommendedService = (serviceName: string) => {
    const found = HANDYMAN_SERVICES.find(
      (s) => s.title.toLowerCase().includes(serviceName.toLowerCase()) || s.keywords.some(k => k.toLowerCase().includes(serviceName.toLowerCase()))
    ) || HANDYMAN_SERVICES[0];

    setScheduleInitialServices([{ service: found, quantity: 1 }]);
    setActiveTab('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a booking is confirmed
  const handleBookingConfirmed = (_newBooking: BookingDetails) => {
    setBookingsCount((prev) => prev + 1);
  };

  const handleSearchFromHero = (term: string) => {
    setCatalogSearchTerm(term);
    setActiveTab('services');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] font-sans text-[#332D29] flex flex-col selection:bg-[#A67C52] selection:text-white">
      
      {/* Persistent Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        quoteCount={quoteServices.length}
        openCallbackModal={() => setIsCallbackModalOpen(true)}
        bookingsCount={bookingsCount}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div>
            <Hero
              onSearch={handleSearchFromHero}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onZipChecked={() => {}}
            />

            <ServiceCatalog
              initialSearchTerm={catalogSearchTerm}
              onSelectServiceForBooking={handleSelectServiceForBooking}
              onAddToQuote={handleAddToQuote}
              quoteServiceIds={quoteServices.map((qs) => qs.service.id)}
            />

            <BeforeAfterGallery />

            <ReviewsAndFaq />
          </div>
        )}

        {/* ALL SERVICES CATALOG VIEW */}
        {activeTab === 'services' && (
          <ServiceCatalog
            initialSearchTerm={catalogSearchTerm}
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onAddToQuote={handleAddToQuote}
            quoteServiceIds={quoteServices.map((qs) => qs.service.id)}
          />
        )}

        {/* ESTIMATE CALCULATOR QUOTE BUILDER VIEW */}
        {activeTab === 'estimate' && (
          <EstimateCalculator
            quoteServices={quoteServices}
            onAddService={handleAddToQuote}
            onRemoveService={handleRemoveFromQuote}
            onUpdateQuantity={handleUpdateQuoteQuantity}
            onProceedToSchedule={handleTransferQuoteToSchedule}
          />
        )}

        {/* INTERACTIVE SCHEDULING PAGE VIEW */}
        {activeTab === 'schedule' && (
          <SchedulingPage
            initialServices={scheduleInitialServices}
            onBookingConfirmed={handleBookingConfirmed}
            onNavigateToBookings={() => {
              setActiveTab('bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* AI REPAIR DIAGNOSTIC TECHNICIAN VIEW */}
        {activeTab === 'ai-diagnose' && (
          <AiDiagnostic
            onSelectRecommendedService={handleSelectRecommendedService}
            onNavigateToSchedule={() => {
              setActiveTab('schedule');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* MY BOOKINGS APPOINTMENT PORTAL VIEW */}
        {activeTab === 'bookings' && (
          <MyBookings
            onNavigateToSchedule={() => {
              setActiveTab('schedule');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            openCallbackModal={() => setIsCallbackModalOpen(true)}
          />
        )}

      </main>

      {/* Emergency Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />

      {/* Persistent Footer */}
      <Footer
        onNavigate={(tab, cat) => {
          if (cat) {
            setCatalogSearchTerm(cat);
          }
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openCallbackModal={() => setIsCallbackModalOpen(true)}
      />

    </div>
  );
}
