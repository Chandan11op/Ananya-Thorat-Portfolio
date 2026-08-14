import React from 'react';
import { PaperTape } from './PaperTape';

export const HandwrittenNote = ({
  children,
  tape = true,
  tapeVariant = "pink",
  tapeRotate = "-4deg",
  rotate = "1deg",
  bg = "bg-[#FFFBF0]",
  textColor = "text-ink-800",
  className = "",
  pin = false
}) => {
  return (
    <div 
      className={`relative p-4 rounded-sm shadow-paper border border-amber-900/5 transition-transform duration-300 hover:rotate-0 ${bg} ${textColor} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {pin && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 w-4 h-4 rounded-full bg-burgundy-700 shadow-md border-2 border-white flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-brandPink-200" />
        </div>
      )}

      {tape && !pin && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
          <PaperTape variant={tapeVariant} rotate={tapeRotate} width="w-20" height="h-6" />
        </div>
      )}

      <div className="font-handwritten text-lg leading-snug">
        {children}
      </div>
    </div>
  );
};
