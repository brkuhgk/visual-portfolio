import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = ({ setActiveSection }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonPieces, setButtonPieces] = useState([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [textDimensions, setTextDimensions] = useState({ width: 0, height: 0 });
  const titleRef = useRef(null);
  
  // Measure text dimensions after component mounts and on window resize
  useEffect(() => {
    const measureText = () => {
      if (titleRef.current) {
        const { width, height } = titleRef.current.getBoundingClientRect();
        setTextDimensions({ width, height });
      }
    };
    
    // Initial measurement
    measureText();
    
    // Set up resize listener
    window.addEventListener('resize', measureText);
    
    // Clean up
    return () => window.removeEventListener('resize', measureText);
  }, []);
  
  useEffect(() => {
    // Start the animation sequence
    setTimeout(() => {
      setAnimationComplete(true);
    }, 4000); // Total animation duration
  }, []);
  
  useEffect(() => {
    if (buttonClicked) {
      // Create button shell pieces
      const newPieces = [];
      const pieceCount = 12;
      
      for (let i = 0; i < pieceCount; i++) {
        const angle = (i / pieceCount) * 360;
        const delay = i * 0.05;
        const distance = 300 + Math.random() * 300;
        
        newPieces.push({
          id: i,
          angle,
          delay,
          distance,
          size: 10 + Math.random() * 30,
          initialTop: 40 + Math.random() * 20,
          initialLeft: 40 + Math.random() * 20,
          color: `hsl(${355 + Math.random() * 10}, 100%, ${55 + Math.random() * 10}%)`,
          rotation: Math.random() * 720 - 360
        });
      }
      
      setButtonPieces(newPieces);
      
      // Navigate to Projects section after animation
      setTimeout(() => {
        setActiveSection('projects');
      }, 1000);
    }
  }, [buttonClicked, setActiveSection]);

  const handleButtonClick = () => {
    if (!buttonClicked) {
      setButtonClicked(true);
    }
  };

  // Animation variants
  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(255, 107, 107, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95
    }
  };

  // Text highlight animations
  const highlightVariants = {
    initial: { width: 0 },
    animate: { 
      width: '100%',
      transition: { duration: 0.8, delay: 1.0 }
    }
  };

  const socialButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 4.0, // Delay social buttons until after pencil animation
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  // Pencil animation path
  const pencilPathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 3,
        ease: "easeInOut" 
      }
    }
  };

  // Calculate path based on measured text size
  const generateUnderlinePath = () => {
    if (textDimensions.width === 0) return "";
    
    const width = textDimensions.width;
    const height = textDimensions.height;
    const arcHeight = height * 0.15; // Controls the curve height
    
    // Starting point (left side, slightly below text)
    const startX = 0;
    const startY = height + arcHeight;
    
    // Ending point (right side, slightly below text)
    const endX = width;
    const endY = height + arcHeight;
    
    // Control points for the curve (these create the slight arc)
    const controlX = width / 2;
    const controlYBottom = height + arcHeight * 2; // Bottom control point for the curve
    
    // Create the path: move to start, curve to end
    return `M${startX},${startY} Q${controlX},${controlYBottom} ${endX},${endY}`;
  };

  // Calculate the SVG viewBox based on text dimensions
  const getViewBox = () => {
    if (textDimensions.width === 0) return "0 0 300 60";
    
    const padding = 10; // Padding around the text
    return `${-padding} 0 ${textDimensions.width + padding * 2} ${textDimensions.height + 30}`;
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={nameVariants}>
            <span className="highlight">Hello, I'm</span> Boddu Karthik
          </motion.h1>
          
          <div className="title-container">
            <motion.h2 
              variants={titleVariants}
              ref={titleRef}
              className="title-text"
            >
              Software Engineer
            </motion.h2>
            
            {/* SVG container positioned relative to the text */}
            <div className="svg-container" style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none' 
            }}>
              {textDimensions.width > 0 && (
                <svg 
                  className="title-animation-svg" 
                  viewBox={getViewBox()}
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <motion.path
                    d={generateUnderlinePath()}
                    stroke="#ff6b6b"
                    strokeWidth="2"
                    fill="none"
                    initial="hidden"
                    animate="visible"
                    variants={pencilPathVariants}
                  />
                  
                  {/* Pencil icon that follows the path */}
                  {!animationComplete && (
                    <motion.g
                      className="pencil-icon"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Pencil body */}
                      <motion.path
                        d="M-5,-5 L5,-15 L15,-5 L5,5 Z"
                        fill="#FCD462"
                      />
                      {/* Pencil tip */}
                      <motion.path
                        d="M-5,-5 L5,5 L2,8 L-8,-2 Z"
                        fill="#E48B45"
                      />
                      {/* Pencil point */}
                      <motion.rect
                        x="2"
                        y="8"
                        width="3"
                        height="3"
                        fill="#333"
                      />
                      <motion.animateMotion
                        path={generateUnderlinePath()}
                        rotate="auto"
                        begin="0s"
                        dur="3s"
                        fill="freeze"
                      />
                    </motion.g>
                  )}
                </svg>
              )}
            </div>
          </div>
          
          <motion.p variants={titleVariants} className="hero-paragraph">
            I love building <span className="highlight-word">efficient</span>, <span className="highlight-word">scalable</span>, and <span className="highlight-word">user-friendly</span> applications with a focus on performance and clean code.
          </motion.p>
          
          {!buttonClicked ? (
            <motion.div
              className="button-container"
              variants={buttonVariants}
            >
              <motion.button 
                className="cta-button"
                onClick={handleButtonClick}
                whileHover="hover"
                whileTap="tap"
              >
                View My Work
              </motion.button>
            </motion.div>
          ) : (
            <div className="button-explosion-container">
              {/* Button pieces */}
              {buttonPieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  className="button-piece"
                  style={{
                    backgroundColor: piece.color,
                    width: `${piece.size}px`,
                    height: `${piece.size}px`,
                  }}
                  initial={{ 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    scale: 1,
                    rotate: 0,
                    borderRadius: "50px"
                  }}
                  animate={{
                    opacity: 0,
                    x: Math.cos(piece.angle * (Math.PI / 180)) * piece.distance,
                    y: Math.sin(piece.angle * (Math.PI / 180)) * piece.distance,
                    scale: 0,
                    rotate: piece.rotation,
                    borderRadius: "50%"
                  }}
                  transition={{
                    duration: 1.5,
                    delay: piece.delay,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
          
          <div className="social-links">
            <motion.a 
              href="https://linkedin.com/in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button linkedin"
              variants={socialButtonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              View LinkedIn
            </motion.a>
            <motion.a 
              href="https://github.com/brkuhgk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button github"
              variants={socialButtonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              View GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <div className="hero-background">
        <div className="gradient-bg"></div>
        <div className="particles">
          {Array(20).fill().map((_, index) => (
            <motion.div
              key={index}
              className="particle"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                transition: {
                  duration: 20 + Math.random() * 30,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear"
                }
              }}
              style={{
                width: `${(Math.random() * 10) + 5}px`,
                height: `${(Math.random() * 10) + 5}px`,
                opacity: Math.random() * 0.5 + 0.1,
                background: `hsl(${Math.random() * 60 + 330}, 100%, 70%)`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;