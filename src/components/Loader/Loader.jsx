import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  const [loadingText, setLoadingText] = useState('');
  const loadingMessages = ['Cracking eggs', 'Preparing portfolio', 'Loading experience', 'Assembling skills'];
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingMessages[currentIndex]);
      currentIndex = (currentIndex + 1) % loadingMessages.length;
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="loader-container">
      <motion.div
        className="egg-loader"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="150" height="200" viewBox="0 0 150 200">
          <motion.ellipse
            cx="75"
            cy="100"
            rx="60"
            ry="80"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        
        <motion.div 
          className="egg-yolk"
          animate={{ 
            scale: [1, 1.1, 1],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <motion.p 
        className="loading-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {loadingText}
      </motion.p>
    </div>
  );
};

export default Loader;