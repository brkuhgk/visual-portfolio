import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  
  const tabVariants = {
    inactive: { color: 'var(--text-secondary)' },
    active: { color: 'var(--text-primary)' }
  };
  
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const tabs = [
    { id: 'story', label: 'About Me' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' }
  ];

  const tabContents = {
    story: (
      <div className="tab-content">
        <h3>Software Engineer with a Focus on Innovation</h3>
        <p>
          Hello! I'm a Software Engineer with a passion for building <span className="highlight-word">efficient</span>, <span className="highlight-word">scalable</span> solutions across the full tech stack.
          With experience in both <span className="highlight-word">front-end</span> and <span className="highlight-word">back-end</span> technologies, I specialize in creating responsive applications with
          clean architecture and optimized performance.
        </p>
        <p>
          My expertise spans <span className="highlight-word">Java Spring</span> applications, cloud infrastructure with <span className="highlight-word">AWS</span>, <span className="highlight-word">React-based</span> frontends, and <span className="highlight-word">AI/ML</span> integrations. 
          I've worked on everything from microservices and database optimization to mobile applications and Chrome extensions, 
          consistently delivering measurable improvements in performance and user experience.
        </p>
        <p>
          I'm passionate about solving real-world problems through technology, with particular interests in <span className="highlight-word">AI applications</span>, 
          <span className="highlight-word">performance optimization</span>, and creating <span className="highlight-word">smooth user experiences</span>. I believe in continuous learning and staying current
          with industry best practices to deliver the highest quality solutions.
        </p>
        <p>
          When I'm not coding, I enjoy exploring new technologies, contributing to technical discussions, and challenging myself
          with complex engineering problems that push the boundaries of what's possible.
        </p>
        
        <div className="about-social-links">
          <motion.a 
            href="https://linkedin.com/in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-button linkedin"
            whileHover={{ y: -5, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            View LinkedIn
          </motion.a>
          <motion.a 
            href="https://github.com/brkuhgk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-button github"
            whileHover={{ y: -5, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            View GitHub
          </motion.a>
        </div>
      </div>
    ),
    education: (
      <div className="tab-content">
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-item-content">
              <time>2022 - 2024</time>
              <h3>Masters in Computer Science</h3>
              <p>Montclair State University, Montclair, NJ</p>
              <p>
                Focused on advanced software engineering techniques, AI/ML applications, and cloud computing.
                Graduated May 2024.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-item-content">
              <time>2018 - 2022</time>
              <h3>Batchlers in Engineering</h3>
              <p>Velagapudi Ramakrishna Siddhartha College, India</p>
              <p>
                Developed strong engineering foundations with focuses on software development
                and computer science fundamentals. Graduated May 2022.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-item-content">
              <time>2023 [ Certificate ]</time>
              <h3>AWS Certified Developer-Associate</h3>
              <p>Amazon Web Services</p>
              <p>
                Validated expertise in developing, deploying, and debugging cloud-based applications using AWS.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    experience: (
      <div className="tab-content">
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-item-content">
              <time>Dec 2024 - Feb 2025</time>
              <h3>Software Engineer</h3>
              <p>MC COGREHAB (Freelance), Hackensack, NJ</p>
              <p>
                Established an automated testing framework using XCTest and Espresso, setting up CI/CD pipelines that cut app crashes by 25%.
                Deployed the ELK stack and Sentry for real-time monitoring and error tracking, cutting critical issue resolution times by 30%.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-item-content">
              <time>Feb 2023 - April 2024</time>
              <h3>Software Developer</h3>
              <p>Montclair Analytics Center, Montclair, NJ</p>
              <p>
                Built Java Spring REST API for AI model interaction, using AWS EC2, caching, and database to improve performance by 40%.
                Developed Java asynchronous processing and Redis caching to boost API performance, reducing latency by 70% under heavy load.
                Optimized SQL indexing and query performance by 70% across 50+ tables, reducing database load by 40% and improving app response time 3x.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-item-content">
              <time>March 2021 - April 2022</time>
              <h3>Software Developer</h3>
              <p>Indian Servers, Vijayawada, India</p>
              <p>
                Implemented OAuth 2.0 and JWT authentication, enhancing API security and reducing unauthorized access attempts by 95%.
                Engineered automated testing with JUnit & Mockito, increasing code coverage from 60% to 95% & reducing post-release bugs by 75%.
                Refactored legacy monolithic application into microservices, resulting in 50% faster feature deployments and 70% reduction in downtime.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="about-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>About <span className="highlight">Me</span></h2>
        </motion.div>
        
        <div className="about-content">
          <div className="about-tabs">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                variants={tabVariants}
                animate={activeTab === tab.id ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    className="tab-underline"
                    layoutId="tabUnderline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          <motion.div 
            className="tab-container"
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={tabContentVariants}
          >
            {tabContents[activeTab]}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;