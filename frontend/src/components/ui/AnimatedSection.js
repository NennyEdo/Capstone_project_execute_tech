import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView } from 'framer-motion';

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  duration = 0.55,
  y = 24,
  once = true,
  amount = 0.15,
  ...rest
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const handle = (e) => setIsSmallScreen(e.matches);
    setIsSmallScreen(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', handle);
    else mq.addListener(handle);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle);
      else mq.removeListener(handle);
    };
  }, []);

  const effDuration = isSmallScreen ? Math.min(duration, 0.2) : duration;
  const effDelay = isSmallScreen ? 0 : delay;
  const effY = isSmallScreen ? Math.min(y, 8) : y;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: effY }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: effY }}
      transition={{ duration: effDuration, ease: [0.22, 1, 0.36, 1], delay: effDelay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  y: PropTypes.number,
  once: PropTypes.bool,
  amount: PropTypes.number,
};

export default AnimatedSection;
