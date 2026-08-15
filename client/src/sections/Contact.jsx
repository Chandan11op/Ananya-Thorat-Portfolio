import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Send, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { LinkedInIcon, InstagramIcon } from '../components/common/SocialIcons';
import confetti from 'canvas-confetti';
import { profileData } from '../data/profile';
import { DoodleUnderline } from '../components/common/Doodles';
import { PaperTape } from '../components/common/PaperTape';
import { StampBadge } from '../components/common/StampBadge';
import { playApplauseChime } from '../utils/soundEffects';

export const Contact = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    organization: '',
    eventType: 'Corporate Summit / Entrepreneurship Fest',
    eventDate: '',
    city: 'Mumbai',
    audienceSize: '100-300 attendees',
    notes: '',
    botField: '' // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const eventTypes = [
    "Corporate Summit / Entrepreneurship Fest",
    "Fashion Show / Cultural Night",
    "Business Pitch Competition / Panel",
    "College Annual Day / Institutional Ceremony",
    "Brand Launch / Youth Festival"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      email: '',
      organization: '',
      eventType: 'Corporate Summit / Entrepreneurship Fest',
      eventDate: '',
      city: 'Mumbai',
      audienceSize: '100-300 attendees',
      notes: '',
      botField: ''
    });
    setSubmittedBookingId('');
    setIsSubmitted(false);
    setErrorMessage('');
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Basic frontend validation
    if (!formData.clientName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "We couldn't send your booking brief right now. Please try again in a moment.");
      }

      // Success sequence
      setSubmittedBookingId(resData.bookingId || '');
      setIsSubmitted(true);
      playApplauseChime();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7A1736', '#E8A0B8', '#F5C542', '#241A1D']
      });

    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMessage(err.message || "We couldn't send your booking brief right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-700/10 border border-burgundy-700/20 text-burgundy-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>06 — LET'S WORK TOGETHER</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-ink-900 tracking-tight leading-none">
            YOUR EVENT. <br className="sm:hidden" />
            <span className="text-burgundy-700 italic font-serif">HER STAGE.</span>
          </h2>

          <div className="flex justify-center">
            <DoodleUnderline className="w-48 sm:w-64 h-4 text-brandPink-300" />
          </div>

          <p className="font-handwritten text-xl sm:text-2xl text-ink-700 max-w-xl mx-auto">
            "Looking for an energetic host who commands the mic, keeps time, and creates unforgettable audience moments?"
          </p>
        </div>

        {/* 2-COLUMN BOOKING CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Quick Contact Cards & Direct Reach */}
          <div className="lg:col-span-5 space-y-6">

            {/* Main Info Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-burgundy-900 to-burgundy-950 text-white shadow-paper-lift border-2 border-burgundy-700">
              <div className="absolute -top-3.5 left-8">
                <PaperTape variant="pink" rotate="-3deg" width="w-24" height="h-6" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-brandPink-300 block mb-2">
                DIRECT BOOKING INQUIRIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                Ananya Thorat
              </h3>
              <p className="text-xs text-brandPink-100/90 leading-relaxed font-sans mb-6">
                Available for corporate summits, entrepreneurship fests, fashion shows, panel discussions, cultural events, and college ceremonies across Mumbai & Pan-India.
              </p>

              {/* Direct channels */}
              <div className="space-y-3.5">
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold text-white border border-white/10"
                >
                  <Mail className="w-4 h-4 text-brandPink-300 shrink-0" />
                  <span className="truncate">{profileData.contact.email}</span>
                </a>

                <a
                  href={profileData.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors text-xs font-semibold text-white border border-[#25D366]/30"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>Instant WhatsApp Brief</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-xs text-white/80 border border-white/5">
                  <MapPin className="w-4 h-4 text-brandPink-300 shrink-0" />
                  <span>{profileData.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-6 border-t border-white/15 flex items-center gap-3">
                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-transform hover:scale-105"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href={profileData.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-transform hover:scale-105"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <span className="text-xs font-handwritten text-lg text-brandPink-200 ml-2">
                  Connect & follow live updates
                </span>
              </div>
            </div>

            {/* Quick Pitch Badge */}
            <div className="p-5 rounded-2xl bg-white border border-burgundy-900/10 shadow-paper flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-base text-ink-900 block">
                  Trilingual Host Ready
                </span>
                <span className="text-xs text-ink-muted">English • Hindi • Marathi</span>
              </div>
              <StampBadge text="LIVE AUDIENCE" variant="burgundy" rotate="3deg" />
            </div>

          </div>

          {/* RIGHT: Interactive Event Date Inquiry Builder */}
          <div className="lg:col-span-7 relative p-6 sm:p-10 rounded-3xl bg-white border-2 border-burgundy-900/15 shadow-paper-lift">
            <div className="absolute -top-3.5 right-12">
              <PaperTape variant="washi" rotate="2deg" width="w-28" height="h-6" />
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy-700 block">
                STAGE BRIEF GENERATOR
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">
                Book The Host For Your Date
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Fill in your event details below to submit an instant booking enquiry directly to Ananya.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-brandPink-50 border border-brandPink-300 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-burgundy-700 text-white mx-auto flex items-center justify-center shadow-burgundy-glow">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-display font-bold text-burgundy-900">
                    Booking Brief Sent Successfully!
                  </h4>
                  <p className="text-xs text-ink-700 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.clientName}</strong>! Your event details for <strong>{formData.eventType}</strong> have been received and a confirmation email has been sent to <strong>{formData.email}</strong>.
                  </p>
                </div>

                {submittedBookingId && (
                  <div className="inline-block px-4 py-2 rounded-xl bg-white border border-burgundy-700/20 shadow-sm text-xs">
                    <span className="text-ink-muted uppercase tracking-wider block text-[10px] font-bold">Reference ID</span>
                    <span className="font-mono font-bold text-burgundy-800 text-sm">{submittedBookingId}</span>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                  >
                    Create Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                      Your Name / POC *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      required
                      maxLength={100}
                      placeholder="e.g. Rahul Sharma"
                      value={formData.clientName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={254}
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                      Company / College / Organizers
                    </label>
                    <input
                      type="text"
                      name="organization"
                      maxLength={200}
                      placeholder="e.g. E-Cell, Fest Committee, Agency"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                      Event Format / Category *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all"
                    >
                      {eventTypes.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                      Tentative Date
                    </label>
                    <input
                      type="text"
                      name="eventDate"
                      maxLength={100}
                      placeholder="e.g. Oct 2026 / TBD"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      name="city"
                      maxLength={150}
                      placeholder="e.g. Mumbai, Navi Mumbai, Pune"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                      Audience Size
                    </label>
                    <input
                      type="text"
                      name="audienceSize"
                      maxLength={100}
                      placeholder="e.g. 300+ attendees"
                      value={formData.audienceSize}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-700 mb-1">
                    Special Requirements / Run-of-Show Notes
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    maxLength={2000}
                    placeholder="Tell Ananya about your event objectives, schedule, guest profile, or custom script requirements..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-offwhite-paper border border-ink-900/15 focus:border-burgundy-700 focus:bg-white text-xs text-ink-900 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 disabled:bg-burgundy-700/60 text-white font-bold text-xs uppercase tracking-wider shadow-burgundy-glow transition-all hover:scale-[1.01] disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING BRIEF...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Anchor Booking Brief</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
