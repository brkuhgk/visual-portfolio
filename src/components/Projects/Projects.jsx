import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: 'Self Driving Vehicle',
      category: 'Software Engineering',
      description: 'Led a robotics team, increasing speed control by 95% by replacing mechanical parts with correct electronics. Achieved 90% accuracy with Autopilot & End-to-End Cloning. Boosted development process by 10x times using simulations.',
      technologies: ['Computer Vision', 'Robotics', 'Python', 'Simulation'],
      color: '#FF6B6B',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 2,
      title: 'Low-Resolution Pedestrian Detection',
      category: 'AI',
      description: 'Developed an ML model that achieved 90% accuracy using Stationary Wavelet Transformation to prevent night-time accidents. Utilized AWS Lambda for real-time data processing without manual intervention. Solved data quality issues and improved app speed by 10x.',
      technologies: ['Python', 'AWS Lambda', 'ML', 'Wavelet Transformation'],
      color: '#4ECDC4',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 3,
      title: 'Taco Cloud',
      category: 'Software Engineering',
      description: 'Java Microservice Application with 15 distinct modules (API, email, JMX, Messaging, Security, UI, Web). Implemented Spring Actuator for real-time monitoring, improving system observability and reducing mean time to resolution by 35%.',
      technologies: ['Spring Boot', 'GraphQL', 'Kafka', 'RabbitMQ', 'MongoDB', 'Cassandra'],
      color: '#6A5ACD',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 4,
      title: 'Real-Time Notes Taking App',
      category: 'Software Engineering',
      description: 'Developed a Full Stack App that resolves the challenge of multiple users writing simultaneously using Operational Transformation technology.',
      technologies: ['React.js', 'Node.js', 'Socket.io', 'MongoDB', 'AWS'],
      color: '#1A535C',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 5,
      title: '3S Test Research App',
      category: 'Software Engineering',
      description: 'Developed a research-focused iOS app by collaborating with researchers at Kesseler Foundation. Delivered 100% results and received positive feedback for performance and usability.',
      technologies: ['React Native', 'Swift', 'UIKit', 'AWS'],
      color: '#FF9F1C',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 6,
      title: 'AI Resume Tailor',
      category: 'AI',
      description: 'Developed an automated resume generator using LLM and dynamic templates to convert job descriptions into customized resumes in seconds, reducing build time by 95% and boosting candidate match accuracy by 40%.',
      technologies: ['OpenAI API', 'Deepseek API', 'React.js', 'AWS'],
      color: '#7B68EE',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 7,
      title: 'AI Doodler',
      category: 'AI',
      description: 'Developed AI Doodler, a Chrome Extension that leverages text summarization, smart highlighting, and adjustable readability to enhance on-screen reading; user tests showed a 30% reduction in reading time and a 25% boost in comprehension.',
      technologies: ['OpenAI API', 'Chrome Extension', 'React.js', 'AWS'],
      color: '#d94c5d',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 8,
      title: 'Tracking missing objects in a video using yolo3 in cloudlet network',
      category: 'Publication',
      description: 'Research paper on tracking missing objects in video streams using YOLO3 architecture in a cloudlet network environment to optimize object detection performance.',
      technologies: ['Computer Vision', 'YOLO3', 'Cloudlet Network', 'Object Tracking'],
      color: '#9B59B6',
      image: '/api/placeholder/600/400',
      link: '#'
    },
    {
      id: 9,
      title: 'Classification of ImageNet retinal diseases using ResNet model',
      category: 'Publication',
      description: 'Research publication on using ResNet architecture to classify retinal diseases from ImageNet dataset, achieving high accuracy in medical image classification.',
      technologies: ['Deep Learning', 'ResNet', 'Medical Imaging', 'Classification'],
      color: '#9B59B6',
      image: '/api/placeholder/600/400',
      link: '#'
    }
  ];
  
  const categories = ['All', 'Software Engineering', 'AI', 'Publication'];
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleProjectClick = (project) => {
    setActiveProject(project);
  };

  const closeModal = () => {
    setActiveProject(null);
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <div className="projects-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>My <span className="highlight">Projects</span></h2>
        </motion.div>
        
        <div className="filter-buttons">
          {categories.map(category => (
            <motion.button
              key={category}
              className={`filter-button ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
              {filter === category && (
                <motion.div 
                  className="button-underline"
                  layoutId="buttonUnderline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter} // Re-render grid when filter changes
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              onClick={() => handleProjectClick(project)}
              variants={cardVariants}
              custom={index}
              whileHover="hover"
              style={{
                borderColor: project.color,
                borderTopWidth: '4px'
              }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-category" style={{ backgroundColor: project.color }}>
                  {project.category}
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag more">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {activeProject && (
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div 
                className="project-modal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={e => e.stopPropagation()}
              >
                <button className="close-button" onClick={closeModal}>×</button>
                
                <div className="modal-content">
                  <div className="modal-image">
                    <img src={activeProject.image} alt={activeProject.title} />
                  </div>
                  
                  <div className="modal-info">
                    <div className="modal-header">
                      <h3>{activeProject.title}</h3>
                      <div 
                        className="modal-category" 
                        style={{ backgroundColor: activeProject.color }}
                      >
                        {activeProject.category}
                      </div>
                    </div>
                    
                    <p>{activeProject.description}</p>
                    
                    <div className="modal-tech">
                      <h4>Technologies Used:</h4>
                      <div className="tech-container">
                        {activeProject.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    
                    <a 
                      href={activeProject.link} 
                      className="view-project-button"
                      style={{ 
                        backgroundColor: activeProject.color,
                        boxShadow: `0 8px 15px ${activeProject.color}40`
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;