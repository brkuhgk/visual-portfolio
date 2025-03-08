import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const categories = [
    { id: 'all', label: 'All Skills', color: '#FF6B6B' },
    { id: 'languages', label: 'Languages', color: '#FF8E53' },
    { id: 'frontend', label: 'Frontend', color: '#4ECDC4' },
    { id: 'backend', label: 'Backend', color: '#7B68EE' },
    { id: 'database', label: 'Database', color: '#36D7B7' },
    { id: 'cloud', label: 'Cloud & DevOps', color: '#FF9F1C' },
    { id: 'ai', label: 'AI/ML', color: '#5E5CE6' },
    { id: 'tools', label: 'Tools', color: '#9B59B6' }
  ];
  
  const allSkills = [
    // Languages
    { name: 'Java', category: 'languages', expertise: 'advanced', 
      relatedSkills: ['Spring Boot', 'Microservices'] },
    { name: 'Python', category: 'languages', expertise: 'advanced', 
      relatedSkills: ['Machine Learning', 'TensorFlow', 'PyTorch'] },
    { name: 'JavaScript', category: 'languages', expertise: 'advanced', 
      relatedSkills: ['React.js', 'Node.js', 'React Native'] },
    { name: 'TypeScript', category: 'languages', expertise: 'intermediate', 
      relatedSkills: ['React.js', 'Node.js'] },
    { name: 'SQL', category: 'languages', expertise: 'advanced', 
      relatedSkills: ['MySQL', 'PostgreSQL'] },
    
    // Frontend
    { name: 'React.js', category: 'frontend', expertise: 'advanced', 
      relatedSkills: ['Redux', 'JavaScript'] },
    { name: 'Redux', category: 'frontend', expertise: 'intermediate', 
      relatedSkills: ['React.js'] },
    { name: 'React Native', category: 'frontend', expertise: 'intermediate', 
      relatedSkills: ['React.js', 'JavaScript'] },
    { name: 'HTML/CSS', category: 'frontend', expertise: 'advanced', 
      relatedSkills: ['JavaScript'] },
    
    // Backend
    { name: 'Spring Boot', category: 'backend', expertise: 'advanced', 
      relatedSkills: ['Java', 'Microservices'] },
    { name: 'Node.js', category: 'backend', expertise: 'intermediate', 
      relatedSkills: ['JavaScript', 'MongoDB'] },
    { name: 'Microservices', category: 'backend', expertise: 'advanced', 
      relatedSkills: ['Spring Boot', 'Docker', 'Kubernetes'] },
    { name: 'REST API', category: 'backend', expertise: 'advanced', 
      relatedSkills: ['Spring Boot', 'Node.js'] },
    { name: 'GraphQL', category: 'backend', expertise: 'intermediate', 
      relatedSkills: ['REST API', 'Node.js'] },
    
    // Database
    { name: 'MySQL', category: 'database', expertise: 'advanced', 
      relatedSkills: ['SQL', 'Spring Boot'] },
    { name: 'MongoDB', category: 'database', expertise: 'intermediate', 
      relatedSkills: ['Node.js'] },
    { name: 'PostgreSQL', category: 'database', expertise: 'intermediate', 
      relatedSkills: ['SQL', 'Docker'] },
    { name: 'Redis', category: 'database', expertise: 'intermediate', 
      relatedSkills: ['Caching', 'Performance'] },
    
    // Cloud & DevOps
    { name: 'AWS', category: 'cloud', expertise: 'advanced', 
      relatedSkills: ['Docker', 'Kubernetes'] },
    { name: 'Docker', category: 'cloud', expertise: 'advanced', 
      relatedSkills: ['Kubernetes', 'CI/CD'] },
    { name: 'Kubernetes', category: 'cloud', expertise: 'intermediate', 
      relatedSkills: ['Docker', 'Microservices'] },
    { name: 'CI/CD', category: 'cloud', expertise: 'intermediate', 
      relatedSkills: ['Git/GitHub', 'Docker'] },
    { name: 'Terraform', category: 'cloud', expertise: 'basic', 
      relatedSkills: ['AWS'] },
    
    // AI/ML
    { name: 'Machine Learning', category: 'ai', expertise: 'intermediate', 
      relatedSkills: ['Python', 'TensorFlow', 'PyTorch'] },
    { name: 'TensorFlow', category: 'ai', expertise: 'intermediate', 
      relatedSkills: ['Python', 'Machine Learning'] },
    { name: 'PyTorch', category: 'ai', expertise: 'intermediate', 
      relatedSkills: ['Python', 'Machine Learning'] },
    { name: 'Computer Vision', category: 'ai', expertise: 'intermediate', 
      relatedSkills: ['Machine Learning', 'Python'] },
    { name: 'NLP', category: 'ai', expertise: 'basic', 
      relatedSkills: ['Machine Learning', 'Python'] },
    
    // Tools
    { name: 'Git/GitHub', category: 'tools', expertise: 'advanced', 
      relatedSkills: ['CI/CD'] },
    { name: 'Testing', category: 'tools', expertise: 'advanced', 
      relatedSkills: ['Java', 'JavaScript'] },
    { name: 'Performance', category: 'tools', expertise: 'intermediate', 
      relatedSkills: ['Redis', 'MySQL'] },
    { name: 'Responsive Design', category: 'tools', expertise: 'advanced', 
      relatedSkills: ['HTML/CSS'] }
  ];
  
  const getVisibleSkills = () => {
    if (activeCategory === 'all') {
      return allSkills;
    }
    return allSkills.filter(skill => skill.category === activeCategory);
  };
  
  const getExpertiseClass = (expertise) => {
    switch (expertise) {
      case 'advanced': return 'skill-advanced';
      case 'intermediate': return 'skill-intermediate';
      case 'basic': return 'skill-basic';
      default: return '';
    }
  };
  
  const handleCategoryChange = (categoryId) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveCategory(categoryId);
    
    // Allow time for animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };
  
  const visibleSkills = getVisibleSkills();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const skillVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300
      }
    }
  };
  
  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#ffffff';
  };

  return (
    <section className="skills-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>My <span className="highlight">Skills</span></h2>
        </motion.div>
        
        <div className="skills-filter">
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnimating}
              style={{
                borderColor: category.color,
                color: activeCategory === category.id ? '#fff' : undefined,
                backgroundColor: activeCategory === category.id ? category.color : undefined
              }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="skills-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {visibleSkills.map((skill, index) => {
              const categoryColor = getCategoryColor(skill.category);
              
              return (
                <motion.div
                  key={skill.name}
                  className={`skill-card ${getExpertiseClass(skill.expertise)}`}
                  variants={skillVariants}
                  whileHover="hover"
                  custom={index}
                  style={{
                    borderColor: categoryColor,
                    '--skill-color': categoryColor
                  }}
                >
                  <div className="skill-content">
                    <h3 className="skill-name">{skill.name}</h3>
                    <div className="skill-category-tag" style={{ backgroundColor: categoryColor }}>
                      {categories.find(c => c.id === skill.category)?.label}
                    </div>
                    <div className="skill-expertise">
                      <div className="expertise-label">{skill.expertise}</div>
                      <div className="expertise-bar">
                        <motion.div 
                          className="expertise-fill"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: skill.expertise === 'advanced' ? '90%' : 
                                  skill.expertise === 'intermediate' ? '65%' : '40%' 
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                          style={{ backgroundColor: categoryColor }}
                        />
                      </div>
                    </div>
                    {skill.relatedSkills && skill.relatedSkills.length > 0 && (
                      <div className="skill-related">
                        <div className="related-label">Related:</div>
                        <div className="related-skills">
                          {skill.relatedSkills.map(related => (
                            <span key={related} className="related-skill">{related}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="skill-glow" style={{ background: `radial-gradient(circle at center, ${categoryColor}20 0%, transparent 70%)` }} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;