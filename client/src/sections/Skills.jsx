import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mic, Layers, ShieldAlert, Users, Radio, MessageSquare } from 'lucide-react';
import { skillsData } from '../data/skills';
import { DoodleUnderline, DoodleStar, DoodleSparkle, DoodleAudioWave } from '../components/common/Doodles';
import { PaperTape } from '../components/common/PaperTape';
import { StampBadge } from '../components/common/StampBadge';
import { playCardHover, playMicTap } from '../utils/soundEffects';

export const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const handleHoverSkill = (skill) => {
    setActiveSkill(skill);
    playCardHover();
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-700/10 border border-burgundy-700/20 text-burgundy-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>05 — STAGE TOOLKIT</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-ink-900 tracking-tight">
            STAGE <span className="text-burgundy-700 italic font-serif">CAPABILITIES</span>
          </h2>

          <div className="flex justify-center">
            <DoodleUnderline className="w-44 sm:w-56 h-4 text-brandPink-300" />
          </div>

          <p className="font-handwritten text-xl sm:text-2xl text-ink-700 max-w-xl mx-auto">
            "No generic bars. Real vocal stamina, crisis management, and crowd control honed on live stages."
          </p>
        </div>

        {/* FLOATING EDITORIAL KEYWORD CLOUD */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-white border-2 border-burgundy-900/10 shadow-paper-lift mb-16 overflow-hidden">
          {/* Background subtle audio frequency line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-burgundy-900/5 -translate-y-1/2 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-10 max-w-5xl mx-auto py-4">
            {skillsData.floatingKeywords.map((item, idx) => {
              const isCurrent = activeSkill === item.text;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleHoverSkill(item.text)}
                  onMouseEnter={() => handleHoverSkill(item.text)}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transform: `rotate(${item.rotate})` }}
                  className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-display font-black tracking-wider uppercase transition-all duration-300 shadow-sm border-2 ${
                    isCurrent
                      ? 'bg-burgundy-700 text-white border-burgundy-800 shadow-burgundy-glow z-20'
                      : idx % 3 === 0
                      ? 'bg-[#FDF2F5] text-burgundy-900 border-brandPink-300 hover:border-burgundy-700'
                      : idx % 2 === 0
                      ? 'bg-white text-ink-900 border-ink-900/15 hover:border-burgundy-700'
                      : 'bg-amber-50/70 text-ink-800 border-amber-200 hover:border-burgundy-700'
                  } ${
                    item.size === 'xl' ? 'text-lg sm:text-2xl' :
                    item.size === 'lg' ? 'text-base sm:text-xl' :
                    item.size === 'md' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.text}
                    {isCurrent && <DoodleSparkle className="w-4 h-4 text-brandPink-200" />}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <span className="text-xs font-handwritten text-lg text-ink-muted">
              Tap or hover any skill to inspect anchoring domains below
            </span>
          </div>
        </div>

        {/* 3 STRUCTURED SKILL DOMAINS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.domains.map((domain, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-burgundy-900/10 shadow-paper flex flex-col justify-between"
            >
              {/* Tape Header */}
              <div className="absolute -top-3 left-8">
                <PaperTape 
                  variant={idx === 1 ? 'pink' : idx === 2 ? 'burgundy' : 'washi'} 
                  rotate={idx === 1 ? '3deg' : '-2deg'} 
                  width="w-20" 
                  height="h-5" 
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brandPink-100 text-burgundy-700 flex items-center justify-center font-bold">
                    0{idx + 1}
                  </div>
                  <DoodleAudioWave className="h-5 flex items-center gap-0.5 text-burgundy-600" />
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-900 mb-1">
                  {domain.category}
                </h3>
                <p className="text-xs text-ink-muted mb-6">
                  {domain.description}
                </p>

                <div className="space-y-4">
                  {domain.skills.map((s, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-offwhite-paper border border-ink-900/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-ink-900 font-sans">
                          {s.name}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-burgundy-700/10 text-burgundy-800">
                          {s.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-700 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-ink-900/10 flex items-center justify-between text-xs text-burgundy-800 font-handwritten text-base">
                <span>Verified live experience</span>
                <DoodleStar className="w-4 h-4 text-burgundy-600" animate={false} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
