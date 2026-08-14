import React from 'react';
import { motion } from 'framer-motion';

export const DoodleStar = ({ className = "w-6 h-6 text-brandPink-400", animate = true, rotate = 0 }) => (
  <motion.svg
    viewBox="0 0 100 100"
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
    animate={animate ? { rotate: [rotate, rotate + 20, rotate - 10, rotate], scale: [1, 1.1, 0.95, 1] } : {}}
    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    fill="currentColor"
  >
    <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
  </motion.svg>
);

export const DoodleSparkle = ({ className = "w-5 h-5 text-gold-400", animate = true }) => (
  <motion.svg
    viewBox="0 0 100 100"
    className={className}
    animate={animate ? { scale: [0.8, 1.25, 0.8], opacity: [0.7, 1, 0.7] } : {}}
    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    fill="currentColor"
  >
    <path d="M50 0 C50 30 70 50 100 50 C70 50 50 70 50 100 C50 70 30 50 0 50 C30 50 50 30 50 0 Z" />
  </motion.svg>
);

export const DoodleArrow = ({ className = "w-12 h-12 text-burgundy-700", direction = "down-right" }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {direction === "down-right" && (
        <>
          <path d="M20 25 C45 20, 75 35, 75 75" />
          <path d="M55 70 L75 76 L78 54" />
        </>
      )}
      {direction === "curved-left" && (
        <>
          <path d="M80 20 C50 20, 25 45, 28 80" />
          <path d="M42 68 L27 80 L20 62" />
        </>
      )}
      {direction === "up-right" && (
        <>
          <path d="M20 80 C35 55, 60 30, 80 25" />
          <path d="M60 22 L80 25 L78 45" />
        </>
      )}
      {direction === "loop" && (
        <>
          <path d="M30 60 C10 40, 30 10, 60 25 C85 38, 70 75, 45 75 C35 75, 30 70, 30 60" />
          <path d="M48 65 L44 76 L55 80" />
        </>
      )}
    </svg>
  );
};

export const DoodleMic = ({ className = "w-10 h-10 text-burgundy-700" }) => (
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Capsule head */}
    <rect x="28" y="10" width="24" height="38" rx="12" className="fill-brandPink-100" />
    <line x1="28" y1="22" x2="52" y2="22" />
    <line x1="28" y1="32" x2="52" y2="32" />
    <line x1="40" y1="10" x2="40" y2="48" strokeDasharray="2 3" />
    {/* U-cradle */}
    <path d="M20 32 C20 52, 60 52, 60 32" strokeWidth="3.5" />
    {/* Base stand */}
    <line x1="40" y1="52" x2="40" y2="68" strokeWidth="3.5" />
    <line x1="26" y1="68" x2="54" y2="68" strokeWidth="4" />
    {/* Little audio waves */}
    <path d="M12 25 C8 32, 8 40, 12 47" strokeWidth="2.5" strokeDasharray="3 3" />
    <path d="M68 25 C72 32, 72 40, 68 47" strokeWidth="2.5" strokeDasharray="3 3" />
  </svg>
);

export const DoodleCamera = ({ className = "w-10 h-10 text-ink-800" }) => (
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M26 22 L32 14 L48 14 L54 22 Z" className="fill-brandPink-100" />
    <rect x="14" y="22" width="52" height="42" rx="8" className="fill-offwhite" />
    <circle cx="40" cy="43" r="14" strokeWidth="3.5" />
    <circle cx="40" cy="43" r="6" className="fill-burgundy-700" />
    <circle cx="56" cy="30" r="3" className="fill-gold-400" />
    {/* Flash burst */}
    <line x1="58" y1="14" x2="66" y2="8" strokeWidth="2.5" />
    <line x1="68" y1="18" x2="74" y2="18" strokeWidth="2.5" />
  </svg>
);

export const DoodleTicket = ({ className = "w-16 h-10 text-burgundy-800" }) => (
  <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 8 C5 8, 95 8, 95 8 L95 24 C90 24, 86 28, 86 32 C86 36, 90 40, 95 40 L95 52 L5 52 L5 40 C10 40, 14 36, 14 32 C14 28, 10 24, 5 24 Z" className="fill-offwhite" />
    <line x1="32" y1="12" x2="32" y2="48" strokeDasharray="3 3" strokeWidth="2" />
    <text x="58" y="28" fill="#7A1736" fontSize="10" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">STAGE PASS</text>
    <text x="58" y="42" fill="#241A1D" fontSize="8" fontFamily="'Caveat', cursive">VIP • 300+</text>
  </svg>
);

export const DoodleSpeech = ({ text = "MIC CHECK!", className = "text-burgundy-700" }) => (
  <div className={`relative inline-block ${className}`}>
    <div className="bg-white border-2 border-current px-3 py-1 rounded-2xl shadow-sm text-xs font-handwritten font-bold tracking-wide uppercase">
      {text}
    </div>
    <div className="absolute -bottom-2 left-4 w-3 h-3 bg-white border-r-2 border-b-2 border-current transform rotate-45" />
  </div>
);

export const DoodleUnderline = ({ className = "w-32 h-4 text-brandPink-400" }) => (
  <svg viewBox="0 0 160 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className={className}>
    <path d="M5 14 C45 6, 115 5, 155 12" />
    <path d="M25 17 C65 11, 120 12, 145 16" strokeWidth="2.5" opacity="0.6" />
  </svg>
);

export const DoodleCrown = ({ className = "w-8 h-8 text-gold-400" }) => (
  <svg viewBox="0 0 60 50" fill="currentColor" className={className}>
    <path d="M5 40 L55 40 L50 15 L38 28 L30 8 L22 28 L10 15 Z" />
    <circle cx="30" cy="5" r="3" fill="#7A1736" />
    <circle cx="8" cy="12" r="2.5" fill="#7A1736" />
    <circle cx="52" cy="12" r="2.5" fill="#7A1736" />
  </svg>
);

export const DoodleAudioWave = ({ className = "h-8 flex items-center gap-1 text-burgundy-700" }) => (
  <div className={className}>
    {[0.4, 0.9, 0.6, 1.0, 0.7, 0.4, 0.8, 0.5, 0.9, 0.3].map((heightRatio, i) => (
      <motion.span
        key={i}
        className="w-1 bg-current rounded-full"
        animate={{ height: [`${heightRatio * 100}%`, `${(1.1 - heightRatio) * 100}%`, `${heightRatio * 100}%`] }}
        transition={{ duration: 1.2 + (i % 3) * 0.3, repeat: Infinity, ease: "easeInOut" }}
        style={{ height: `${heightRatio * 100}%`, minHeight: '4px' }}
      />
    ))}
  </div>
);
