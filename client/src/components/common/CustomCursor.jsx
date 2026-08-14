import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import micCursorImg from '../../assets/mic-cursor.png';

export const CustomCursor = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if device is touch or coarse pointer
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let points = [];
    let animationFrameId;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Add new point for the trail
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop for the trail
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points age and remove old ones
      for (let i = 0; i < points.length; i++) {
        points[i].age += 1;
      }
      // Trail lifespan (higher = longer trail)
      points = points.filter(p => p.age < 30);

      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        
        // Connect to the last point
        const lastPoint = points[points.length - 1];
        ctx.lineTo(lastPoint.x, lastPoint.y);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Shooting star trail (pink shiny light)
        // Draw the outer glow
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'rgba(243, 197, 210, 0.4)'; // brandPink-200 with transparency
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#E8A0B8'; // brandPink-300
        ctx.stroke();

        // Draw the solid inner line
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#D67B9A'; // brandPink-400
        ctx.shadowBlur = 2;
        ctx.shadowColor = '#fff';
        ctx.stroke();

        // Draw the bright core
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Canvas for the shooting star trail */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998] hidden md:block"
      />

      {/* Mic Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <img 
          src={micCursorImg} 
          alt="mic cursor" 
          className="w-10 h-auto drop-shadow-[0_0_15px_rgba(232,160,184,0.6)]" 
          // Offset slightly so the mouse actually clicks where the tip of the mic is.
          style={{ transform: 'translate(0%, 0%)' }}
        />
      </motion.div>
    </>
  );
};

