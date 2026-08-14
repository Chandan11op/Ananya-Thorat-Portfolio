import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Zap, Users, GraduationCap, MapPin, Sparkles, Heart } from 'lucide-react';
import { profileData } from '../data/profile';
import { mediaAssets } from '../data/media';
import { PaperTape } from '../components/common/PaperTape';
import { StampBadge } from '../components/common/StampBadge';
import { 
  DoodleStar, 
  DoodleSparkle, 
  DoodleArrow, 
  DoodleCamera, 
  DoodleMic, 
  DoodleAudioWave, 
  DoodleUnderline 
} from '../components/common/Doodles';

export const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-offwhite-paper overflow-hidden">
      {/* Background Subtle Grid & Doodle Accents */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: mediaAssets.textures.paperGrain, backgroundSize: '32px 32px' }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-brandPink-50/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-24 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brandPink-200 text-burgundy-700 text-xs font-bold uppercase tracking-widest shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 — BEHIND THE MIC</span>
          </motion.div>
          
          <div className="relative inline-block">
            <h2 className="text-5xl sm:text-7xl font-display font-black text-ink-900 tracking-tight leading-none relative z-10">
              about <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandPink-400 to-burgundy-500 font-serif italic transform -rotate-2 inline-block ml-4 drop-shadow-sm">
                Ananya
              </span>
            </h2>
            {/* Playful background highlight behind Ananya */}
            <div className="absolute -bottom-2 -right-4 w-full h-8 bg-brandPink-200/50 -rotate-2 z-0 rounded-lg"></div>
            <div className="absolute top-0 -left-12">
              <DoodleSparkle className="w-8 h-8 text-burgundy-700/60 rotate-12" />
            </div>
            <div className="absolute -top-4 -right-16">
              <DoodleStar className="w-10 h-10 text-gold-400 -rotate-12" />
            </div>
          </div>
        </div>

        {/* SCRAPBOOK COLLAGE CONTAINER */}
        <div className="relative w-full max-w-4xl mx-auto min-h-[600px] sm:min-h-[700px] flex items-center justify-center">
          
          {/* CENTRAL CUTOUT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.2, y: 150, rotate: -25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring", 
              stiffness: 140, 
              damping: 14, 
              mass: 1.2,
              delay: 0.1 
            }}
            className="relative z-30"
          >
            <div className="relative w-[280px] sm:w-[380px] md:w-[450px] mx-auto">
              {/* White Outline Drop Shadow trick to look like a cutout sticker */}
              <img
                src={mediaAssets.about.portrait}
                alt="Ananya Thorat - Event Anchor"
                className="w-full h-auto relative z-20 filter contrast-[1.02] saturate-[1.05] hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
                style={{
                  filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.15)) drop-shadow(3px 3px 0px #7A1736)'
                }}
              />
              
              {/* Decorative elements strictly attached to the image */}
              
              {/* Top-left tape holding the photo */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-3 -left-6 z-40"
              >
                <PaperTape variant="pink" rotate="-15deg" width="w-24" height="h-6" />
              </motion.div>

              {/* Sparkle near top right */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.9 }}
                className="absolute top-4 -right-6 z-40"
              >
                <DoodleSparkle className="w-10 h-10 text-brandPink-400 rotate-12" />
              </motion.div>

              {/* Little stars floating on the left */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 1 }}
                className="absolute top-1/3 -left-8 z-40"
              >
                <DoodleStar className="w-6 h-6 text-gold-400 -rotate-12" />
              </motion.div>

              {/* Fun little note attached to the side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ type: "spring", delay: 1.1 }}
                className="absolute top-[60%] -left-[12%] sm:-left-[15%] z-40"
              >
                <div className="bg-white px-3 py-1.5 rounded shadow-sm border-2 border-brandPink-200">
                  <p className="font-handwritten text-lg text-burgundy-900 font-bold whitespace-nowrap">Always smiling! ✨</p>
                </div>
              </motion.div>

              {/* Existing Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.8 }}
                className="absolute -bottom-6 -right-6 z-40 rotate-12"
              >
                <StampBadge text="APPROVED HOST" date="EST 2022" color="burgundy" />
              </motion.div>
            </div>
          </motion.div>

          {/* FLOATING TEXT SNIPPETS & DOODLES (Desktop Absolute Positioning) */}
          
          {/* Top Left: Professional Identity */}
          <motion.div 
            initial={{ opacity: 0, x: -50, y: -20, rotate: -30, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: -4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
            className="absolute top-[5%] sm:top-[10%] left-0 sm:left-[5%] z-20 flex flex-col items-center max-w-[180px]"
          >
            <div className="absolute -top-4 -left-4"><DoodleStar className="w-6 h-6 text-burgundy-700" /></div>
            <p className="font-handwritten text-2xl text-ink-900 font-bold leading-tight text-center">
              Professional <br/> Event Anchor
            </p>
            <DoodleUnderline className="w-24 h-2 text-burgundy-600 mt-1" />
          </motion.div>

          {/* Middle Left: Energy */}
          <motion.div 
            initial={{ opacity: 0, x: -60, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            className="absolute top-[40%] left-[-2%] sm:left-[-5%] z-20 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-brandPink-100 flex items-center justify-center shadow-sm rotate-[-10deg]">
              <Zap className="w-5 h-5 text-burgundy-700" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-ink-900 border-b-2 border-brandPink-400 inline-block rotate-2">
                High-Voltage
              </span>
              <span className="font-display font-bold text-lg text-ink-900 rotate-2">
                Stage Energy
              </span>
            </div>
          </motion.div>

          {/* Bottom Left: Location/Base */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 20, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
            className="absolute bottom-[10%] left-[5%] sm:left-[10%] z-40 bg-white p-3 rounded-lg shadow-paper border border-ink-900/10 rotate-[-2deg]"
          >
            <PaperTape variant="washi" rotate="-4deg" width="w-16" height="h-4" className="absolute -top-2 left-2" />
            <div className="flex items-center gap-2 pt-2">
              <MapPin className="w-4 h-4 text-burgundy-700" />
              <p className="font-handwritten text-xl font-bold text-ink-800">Mumbai Based</p>
            </div>
          </motion.div>

          {/* Top Right: Voice/Languages */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 20, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, type: "spring", stiffness: 120 }}
            className="absolute top-[15%] right-0 sm:right-[5%] z-20 flex flex-col items-center max-w-[200px]"
          >
            <div className="bg-white border-2 border-brandPink-300 rounded-full px-4 py-2 shadow-sm rotate-[3deg] relative">
              <span className="font-display font-bold text-ink-900 text-sm">Trilingual Fluency</span>
              <div className="absolute -bottom-2 -left-2"><DoodleMic className="w-6 h-6 text-brandPink-400 rotate-12" /></div>
            </div>
            <p className="font-handwritten text-xl text-ink-700 mt-2 rotate-[3deg] text-center">
              English • Hindi • Marathi
            </p>
          </motion.div>

          {/* Middle Right: Interaction */}
          <motion.div 
            initial={{ opacity: 0, x: 60, scale: 0.5 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, type: "spring", stiffness: 120 }}
            className="absolute top-[50%] right-[-5%] sm:right-[-2%] z-20 flex items-center gap-2"
          >
            <div className="text-right">
              <span className="font-display font-bold text-lg text-ink-900 block rotate-[-3deg]">
                Spontaneous Wit
              </span>
              <p className="font-handwritten text-lg text-ink-700 rotate-[-3deg] mt-1">
                loves crowd connection!
              </p>
            </div>
            <DoodleArrow className="w-12 h-12 text-brandPink-500 rotate-[160deg] scale-x-[-1]" direction="right" />
          </motion.div>

          {/* Bottom Right: Fun fact / Hobby */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -25, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, type: "spring", stiffness: 120 }}
            className="absolute bottom-[5%] right-[5%] sm:right-[10%] z-40"
          >
            <div className="bg-brandPink-100/90 backdrop-blur-sm p-4 rounded-xl shadow-paper border-2 border-dashed border-brandPink-300 rotate-[5deg] relative">
              <PaperTape variant="pink" rotate="2deg" width="w-20" height="h-5" className="absolute -top-3 right-4" />
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-sm">
                <Heart className="w-4 h-4 text-burgundy-500 fill-burgundy-500" />
              </div>
              <p className="font-handwritten text-xl font-bold text-burgundy-900 leading-tight">
                Keeps the backstage <br/> organized & calm
              </p>
            </div>
          </motion.div>

          {/* Scattered background doodles */}
          <DoodleCamera className="absolute bottom-[20%] left-[20%] w-10 h-10 text-ink-900/10 rotate-[-15deg] z-0" />
          <DoodleAudioWave className="absolute top-[30%] left-[15%] w-16 text-burgundy-900/10 rotate-[20deg] z-0" />
          
        </div>

        {/* BOTTOM CREDENTIALS STRIP: Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 max-w-2xl mx-auto"
        >
          <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-burgundy-900/10 shadow-paper-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left transform hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -top-4 -left-4">
               <PaperTape variant="burgundy" rotate="-6deg" width="w-24" height="h-6" />
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-burgundy-50 text-burgundy-700 flex items-center justify-center shrink-0 shadow-inner">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brandPink-500 block mb-1">
                Academic Background
              </span>
              <h4 className="font-display font-black text-2xl text-ink-900 mb-1">
                {profileData.education.degree}
              </h4>
              <p className="text-sm text-ink-700 font-medium mb-3">
                {profileData.education.institution}
              </p>
              <div className="inline-flex items-center gap-2 bg-offwhite-paper px-3 py-1.5 rounded-lg border border-ink-900/5">
                <Users className="w-4 h-4 text-burgundy-600" />
                <p className="text-xs font-bold text-ink-800 uppercase tracking-wide">
                  Anchoring Dept Head • E-Cell
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
