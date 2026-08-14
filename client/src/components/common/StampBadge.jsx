import React from 'react';

export const StampBadge = ({
  text = "ON STAGE",
  subtext = "",
  variant = "burgundy", // 'burgundy', 'pink', 'ink'
  rotate = "-6deg",
  className = ""
}) => {
  const styles = {
    burgundy: "border-burgundy-700 text-burgundy-700 bg-burgundy-700/5",
    pink: "border-brandPink-400 text-burgundy-800 bg-brandPink-100/40",
    ink: "border-ink-800 text-ink-800 bg-ink-800/5",
  };

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center px-3.5 py-1.5 rounded-md border-2 border-dashed uppercase tracking-widest font-sans font-extrabold select-none ${styles[variant]} ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      <span className="text-xs sm:text-sm font-bold tracking-wider">{text}</span>
      {subtext && (
        <span className="text-[9px] tracking-normal font-medium opacity-85 font-handwritten capitalize -mt-0.5">
          {subtext}
        </span>
      )}
    </div>
  );
};
