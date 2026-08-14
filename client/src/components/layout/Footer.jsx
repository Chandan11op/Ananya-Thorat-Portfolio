import React from 'react';
import { ArrowUp, Heart, Sparkles, Mail } from 'lucide-react';
import { LinkedInIcon, InstagramIcon } from '../common/SocialIcons';
import { profileData } from '../../data/profile';
import { DoodleStar, DoodleUnderline } from '../common/Doodles';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-ink-900 text-offwhite pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-4 border-burgundy-700 overflow-hidden">
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[22vw] font-display font-black text-white whitespace-nowrap">
        ANANYA
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left border-b border-white/10 pb-12">
          {/* Brand Wordmark & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-8 h-8 rounded-full bg-burgundy-700 text-offwhite flex items-center justify-center font-display font-bold text-sm shadow-sm">
                AT
              </span>
              <h3 className="font-display font-bold text-2xl tracking-wider text-white uppercase">
                {profileData.name}
              </h3>
            </div>
            <p className="text-xs uppercase tracking-widest text-brandPink-300 font-semibold">
              EVENT ANCHOR • HOST • MC • PUBLIC SPEAKER
            </p>
            <p className="text-xs text-ink-light max-w-sm">
              Vasai / Mumbai, Maharashtra • Available Pan-India for Live Stages
            </p>
          </div>

          {/* Center Handwritten Sign-off */}
          <div className="flex flex-col items-center">
            <p className="font-handwritten text-3xl text-brandPink-200">
              "See you on stage."
            </p>
            <DoodleUnderline className="w-36 h-3 text-burgundy-500 mt-1" />
          </div>

          {/* Social Links & Back to top */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-burgundy-700 text-white flex items-center justify-center transition-all hover:scale-105"
                title="Email Ananya"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-burgundy-700 text-white flex items-center justify-center transition-all hover:scale-105"
                title="LinkedIn Profile"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-burgundy-700 text-white flex items-center justify-center transition-all hover:scale-105"
                title="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brandPink-300 hover:text-white transition-colors"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-light font-sans text-center sm:text-left">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} Ananya Thorat. All Rights Reserved.
            </p>
            <p>
              Designed and developed by <a href="https://chandan-tiwadi.pages.dev" target="_blank" rel="noopener noreferrer" className="text-brandPink-300 hover:text-white underline decoration-brandPink-300/30 underline-offset-2 transition-colors">Chandan Tiwadi</a>
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Designed for live stage energy & editorial elegance</span>
            <Sparkles className="w-3 h-3 text-gold-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
