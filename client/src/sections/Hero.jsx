import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Mic, Award, ChevronRight, Play } from 'lucide-react';
import { profileData } from '../data/profile';
import { mediaAssets } from '../data/media';
import { useMousePosition } from '../hooks/useMousePosition';
import { ParallaxLayer } from '../components/common/ParallaxLayer';
import {
  DoodleStar,
  DoodleSparkle,
  DoodleArrow,
  DoodleMic,
  DoodleCamera,
  DoodleTicket,
  DoodleSpeech,
  DoodleUnderline,
  DoodleCrown
} from '../components/common/Doodles';
import { PaperTape } from '../components/common/PaperTape';
import { HandwrittenNote } from '../components/common/HandwrittenNote';
import { StampBadge } from '../components/common/StampBadge';
import { playMicTap, playCardHover } from '../utils/soundEffects';

export const Hero = () => {
  const mousePosition = useMousePosition();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden bg-offwhite"
    >
      {/* Background Subtle Editorial Grid & Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: mediaAssets.textures.paperGrain, backgroundSize: '24px 24px' }}
      />

      {/* Decorative Large Background Typography Silhouette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.035] text-[18vw] font-display font-black leading-none text-burgundy-900 whitespace-nowrap z-0">
        ANCHOR • MC
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center"
        >
          {/* LEFT EDITORIAL COLUMN: Title, Bio, Positioning & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left relative z-20">
            {/* Top Handwritten Greeting Pill */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brandPink-100/70 border border-brandPink-300/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-burgundy-700 animate-ping" />
                <span className="font-handwritten text-lg font-bold text-burgundy-900 tracking-wide">
                  HELLO, I'M ANANYA
                </span>
              </div>
              <StampBadge text="LIVE STAGE MC" rotate="-3deg" variant="burgundy" />
            </motion.div>

            {/* Giant Editorial Typography Block */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-black tracking-tight text-ink-900 leading-[0.92]">
                ANANYA <br />
                <span className="text-burgundy-700 italic font-serif">THORAT</span>
              </h1>
              <div className="pt-2">
                <DoodleUnderline className="w-48 sm:w-64 h-5 text-brandPink-300" />
              </div>
            </motion.div>

            {/* Professional Role Banner */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-ink-700">
              <span className="text-burgundy-700">EVENT ANCHOR</span>
              <span className="text-brandPink-400">•</span>
              <span>HOST</span>
              <span className="text-brandPink-400">•</span>
              <span>MC</span>
              <span className="text-brandPink-400">•</span>
              <span className="text-burgundy-700">PUBLIC SPEAKER</span>
            </motion.div>

            {/* Core Professional Summary Statement */}
            <motion.div
              variants={itemVariants}
              className="relative p-5 rounded-2xl bg-white/75 backdrop-blur-sm border border-burgundy-900/10 shadow-paper max-w-lg"
            >
              <div className="absolute -top-3 right-8">
                <PaperTape variant="washi" rotate="2deg" width="w-20" height="h-5" />
              </div>
              <p className="font-serif italic text-lg sm:text-xl text-burgundy-900 leading-relaxed font-medium">
                "{profileData.headlineQuote}"
              </p>
              <p className="text-xs text-ink-muted mt-2 font-sans">
                Commanding live audiences, institutional ceremonies, high-voltage entrepreneurship summits, and cultural stages with energy and stage poise.
              </p>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md pt-1">
              <div className="p-2.5 rounded-xl bg-brandPink-50/60 border border-brandPink-200/50">
                <span className="text-xl sm:text-2xl font-bold font-display text-burgundy-700 block">300+</span>
                <span className="text-[10px] sm:text-xs font-semibold text-ink-700 uppercase tracking-tight">Audience Flow</span>
              </div>
              <div className="p-2.5 rounded-xl bg-brandPink-50/60 border border-brandPink-200/50">
                <span className="text-xl sm:text-2xl font-bold font-display text-burgundy-700 block">E-Cell</span>
                <span className="text-[10px] sm:text-xs font-semibold text-ink-700 uppercase tracking-tight">Head of Anchoring</span>
              </div>
              <div className="p-2.5 rounded-xl bg-brandPink-50/60 border border-brandPink-200/50">
                <span className="text-xl sm:text-2xl font-bold font-display text-burgundy-700 block">3 Langs</span>
                <span className="text-[10px] sm:text-xs font-semibold text-ink-700 uppercase tracking-tight">EN • HI • MR</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#experience"
                onClick={() => playMicTap()}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-offwhite text-xs font-bold uppercase tracking-wider shadow-burgundy-glow transition-all hover:scale-105"
              >
                <span>View My Experience</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={() => playCardHover()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-brandPink-50 text-burgundy-900 border-2 border-burgundy-700/30 text-xs font-bold uppercase tracking-wider transition-all hover:border-burgundy-700 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-burgundy-600" />
                <span>Let's Work Together</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT EDITORIAL COLUMN: Scrapbook Collage Composition with Portrait & Doodles */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]">

            {/* Parallax Layer 1: Background Decorative Elements */}
            <ParallaxLayer mousePosition={mousePosition} speed={8} className="absolute inset-0 pointer-events-none">
              {/* Backing Pink Angular Card */}
              <div
                className="absolute top-8 left-6 right-8 bottom-12 rounded-3xl bg-brandPink-100/70 -rotate-3 border border-brandPink-200 shadow-paper"
              />
              {/* Decorative Stamp Background */}
              <div className="absolute top-4 right-6">
                <DoodleTicket className="w-24 h-14 text-burgundy-800 rotate-6 drop-shadow-sm" />
              </div>
            </ParallaxLayer>

            {/* Parallax Layer 2: Main Cutout Portrait with Frame */}
            <ParallaxLayer mousePosition={mousePosition} speed={16} className="relative z-10 w-full max-w-sm sm:max-w-md">
              <div
                className="relative mx-auto rounded-2xl p-3 bg-white shadow-paper-lift border-2 border-burgundy-900/10 rotate-1 transition-transform duration-500 hover:rotate-0"
                data-cursor-label="EXPLORE"
              >
                {/* Top Corner Washi Tapes */}
                <div className="absolute -top-4 left-6 z-30">
                  <PaperTape variant="burgundy" rotate="-6deg" width="w-24" height="h-6" />
                </div>
                <div className="absolute -top-3 right-8 z-30">
                  <PaperTape variant="washi" rotate="4deg" width="w-20" height="h-6" />
                </div>

                {/* Portrait Photo with Editorial Filter */}
                <div className="relative overflow-hidden rounded-xl bg-burgundy-900 aspect-[3/4]">
                  <img
                    src={mediaAssets.hero.portrait}
                    alt={mediaAssets.hero.alt}
                    className="w-full h-full object-cover object-top filter contrast-[1.04] saturate-[1.08] hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle Vignette & Stage Light Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Live Stage Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      ON STAGE • HOST
                    </div>
                    <span className="font-handwritten text-brandPink-200 text-sm drop-shadow">
                      Vasai / Mumbai
                    </span>
                  </div>
                </div>

                {/* Bottom Tape */}
                <div className="absolute -bottom-3 right-10 z-30">
                  <PaperTape variant="pink" rotate="-3deg" width="w-24" height="h-6" />
                </div>
              </div>
            </ParallaxLayer>

            {/* Parallax Layer 3: Floating Foreground Stickers & Annotations */}
            <ParallaxLayer mousePosition={mousePosition} speed={28} className="absolute inset-0 pointer-events-none z-20">
              {/* Top Left Speech Bubble */}
              <motion.div
                className="absolute -top-2 left-2 sm:left-4 pointer-events-auto"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <DoodleSpeech text="MIC CHECK! 🎤" className="text-burgundy-700" />
              </motion.div>

              {/* Floating Star Top Right */}
              <div className="absolute top-12 -right-2 sm:right-2">
                <DoodleStar className="w-8 h-8 text-brandPink-400" rotate={15} />
              </div>

              {/* Floating Sparkle Left */}
              <div className="absolute top-1/3 -left-4">
                <DoodleSparkle className="w-7 h-7 text-gold-400" />
              </div>

              {/* Sticky Note: "The Voice Behind The Moment" */}
              <motion.div
                className="absolute bottom-16 -left-4 sm:-left-8 pointer-events-auto max-w-[170px]"
                animate={{ rotate: [-2, 1, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <HandwrittenNote pin={true} bg="bg-[#FEFCE8]" rotate="-3deg" className="p-3 shadow-md">
                  <p className="text-xs font-bold text-burgundy-900 font-sans uppercase tracking-wider">
                    E-Cell Head of Anchoring Dept.
                  </p>
                  <p className="text-xs font-handwritten text-ink-800 mt-0.5">
                    "Commanding the stage with confidence & high energy!"
                  </p>
                </HandwrittenNote>
              </motion.div>

              {/* Floating Arrow & Note Pointing to Mic */}
              <div className="absolute top-1/2 -right-4 sm:-right-8 flex flex-col items-center">
                <DoodleArrow className="w-12 h-12 text-burgundy-700 -rotate-12" direction="curved-left" />
                <span className="font-handwritten text-base font-bold text-burgundy-800 -mt-2 bg-white/80 px-2 py-0.5 rounded shadow-sm">
                  The Voice! ✨
                </span>
              </div>

              {/* Bottom Right Floating Badge: Trilingual MC */}
              <div className="absolute -bottom-4 right-2 sm:right-6 pointer-events-auto">
                <StampBadge text="EN • HI • MR" subtext="Trilingual Host" variant="pink" rotate="5deg" />
              </div>
            </ParallaxLayer>

          </div>
        </motion.div>

        {/* Bottom Scroll Down Prompt */}
        <div className="mt-12 flex flex-col items-center justify-center gap-2">
          <a
            href="#about"
            className="group flex flex-col items-center text-ink-muted hover:text-burgundy-700 transition-colors focus:outline-none"
            aria-label="Scroll to About Section"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest group-hover:tracking-wider transition-all">
              Scroll To Explore Journal
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1"
            >
              <ArrowDown className="w-4 h-4 text-burgundy-600" />
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
};
