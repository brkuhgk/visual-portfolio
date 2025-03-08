import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../src/components/Hero/Hero'
import './components/Hero/Hero.css';
import About from './components/About/About';
import './components/About/About.css';
import './components/Projects/Projects.css';
import './components/Skills/Skills.css';
import './components/Contact/Contact.css';
import './components/Navbar/Navbar.css';
import './components/Cursor/Cursor.css';
import './components/Loader/Loader.css';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import Cursor from './components/Cursor/Cursor';
import Loader from './components/Loader/Loader';
import SkillsGraph from './components/SkillsGraph/SkillsGraph';
import './components/SkillsGraph/SkillsGraph.css';

import './App.css';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const sections = {
    hero: <Hero setActiveSection={setActiveSection} />,
    about: <About />,
    projects: <Projects />,
    skills: <Skills />,
    contact: <Contact />
  };

  return (
    <div className="app">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Cursor />
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          <main className="main-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="section-container"
              >
                {sections[activeSection]}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
};

export default App;