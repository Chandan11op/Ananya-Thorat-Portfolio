import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Users, MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { PaperTape } from './PaperTape';
import { DoodleStar } from './Doodles';

export const EventModal = ({ event, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink-900/70 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-2xl bg-offwhite-warm rounded-2xl shadow-2xl border-2 border-burgundy-900/10 overflow-hidden my-8"
        >
          {/* Top Decorative Tape */}
          <div className="absolute -top-3 right-12 z-20">
            <PaperTape variant="burgundy" rotate="3deg" width="w-24" height="h-6" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-ink-800 hover:bg-burgundy-700 hover:text-white transition-colors flex items-center justify-center shadow-md focus:outline-none"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Image / Graphic Banner */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-burgundy-900">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover object-center opacity-70 filter saturate-110"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-offwhite-warm via-transparent to-black/40" />

            {/* Event Category Badge */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-burgundy-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                {event.badge || event.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/90 text-burgundy-900 text-xs font-semibold backdrop-blur-sm">
                {event.theme === 'formal' ? 'Formal & Corporate' : 'Energetic & Cultural'}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-burgundy-700 font-bold font-sans">
                {event.category}
              </p>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 mt-1">
                {event.title}
              </h3>
              <p className="text-sm font-handwritten text-lg text-ink-700 mt-1">
                {event.subtitle}
              </p>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-brandPink-50/60 rounded-xl border border-brandPink-200/50 text-xs text-ink-700">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-burgundy-700 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-ink-muted">Role</span>
                  <span className="font-semibold text-ink-900">{event.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-burgundy-700 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-ink-muted">Audience</span>
                  <span className="font-semibold text-ink-900">{event.attendees}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-burgundy-700 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-ink-muted">Location</span>
                  <span className="font-semibold text-ink-900">{event.venue}</span>
                </div>
              </div>
            </div>

            {/* Responsibilities & Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy-900 flex items-center gap-1.5">
                <DoodleStar className="w-3.5 h-3.5 text-burgundy-700" animate={false} />
                Anchoring Scope & Stage Responsibilities
              </h4>
              <ul className="space-y-2.5">
                {event.keyHighlights?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-burgundy-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-ink-900/10">
              {event.tags?.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs rounded-md bg-offwhite-paper text-ink-700 border border-ink-900/10 font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <span className="text-xs font-handwritten text-lg text-burgundy-800">
                Ready to bring this energy to your event?
              </span>
              <a
                href="#contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-burgundy-700 text-white hover:bg-burgundy-800 text-xs font-bold uppercase tracking-wider shadow-burgundy-glow transition-all"
              >
                Inquire For Your Date <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
