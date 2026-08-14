import React from 'react';
import { motion } from 'framer-motion';

export const ParallaxLayer = ({
  children,
  mousePosition = { normalizedX: 0, normalizedY: 0 },
  speed = 15,
  reverse = false,
  className = "",
  style = {},
  ...props
}) => {
  const factor = reverse ? -1 : 1;
  const offsetX = mousePosition.normalizedX * speed * factor;
  const offsetY = mousePosition.normalizedY * speed * factor;

  return (
    <motion.div
      animate={{
        x: offsetX,
        y: offsetY,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 150,
        mass: 0.5,
      }}
      className={`will-change-transform ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};
