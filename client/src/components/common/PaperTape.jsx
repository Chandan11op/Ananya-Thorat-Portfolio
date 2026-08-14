import React from 'react';

export const PaperTape = ({ 
  className = "", 
  variant = "washi", // 'washi', 'pink', 'kraft', 'burgundy'
  rotate = "-2deg",
  width = "w-28",
  height = "h-7"
}) => {
  const variantStyles = {
    washi: "bg-amber-100/75 border-amber-200/50 text-ink-700 shadow-sm",
    pink: "bg-brandPink-200/80 border-brandPink-300/50 text-burgundy-900 shadow-sm",
    kraft: "bg-amber-200/70 border-amber-300/50 text-ink-800 shadow-sm",
    burgundy: "bg-burgundy-700/80 border-burgundy-800/40 text-offwhite shadow-sm"
  };

  return (
    <div 
      className={`relative z-20 inline-block pointer-events-none select-none backdrop-blur-[1px] ${width} ${height} ${variantStyles[variant]} ${className}`}
      style={{
        transform: `rotate(${rotate})`,
        clipPath: 'polygon(0% 0%, 96% 2%, 100% 5%, 98% 95%, 95% 100%, 3% 98%, 0% 95%, 2% 5%)',
        boxShadow: '0 2px 6px rgba(36, 26, 29, 0.08)'
      }}
    >
      {/* Subtle textured overlay */}
      <div className="absolute inset-0 opacity-20 bg-repeat bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />
    </div>
  );
};
