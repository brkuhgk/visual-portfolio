import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Import icons from react-icons
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [focused, setFocused] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFocus = (field) => {
    setFocused(field);
  };
  
  const handleBlur = () => {
    setFocused(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  const contactInfo = [
    {
      id: 'email',
      icon: <MdEmail size={24} />,
      title: 'Email',
      value: 'boddu.k007@gmail.com',
      link: 'mailto:boddu.k007@gmail.com'
    }
  ];
  
  const socialLinks = [
    { id: 'github', icon: <FaGithub size={22} />, url: 'https://github.com/brkuhgk' },
    { id: 'linkedin', icon: <FaLinkedin size={22} />, url: 'https://linkedin.com/in/' },
    { id: 'twitter', icon: <FaTwitter size={22} />, url: 'https://twitter.com/' },
    { id: 'instagram', icon: <FaInstagram size={22} />, url: 'https://instagram.com/' }
  ];
  
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };
  
  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3 }
    },
    rest: {
      scale: 1,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };
  
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: '#ff4d4d',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };
  
  const contactInfoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="contact-section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In <span className="highlight">Touch</span></h2>
        </motion.div>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            variants={contactInfoVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Contact Information</h3>
            
            <div className="info-items">
              {contactInfo.map(item => (
                <motion.div 
                  key={item.id}
                  className="info-item"
                  variants={contactItemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="info-icon">
                    {item.icon}
                  </div>
                  <div className="info-details">
                    <h4>{item.title}</h4>
                    {item.link ? (
                      <a href={item.link}>{item.value}</a>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="connect-section">
              <h4>Connect with me</h4>
              <div className="social-icons">
                {socialLinks.map(social => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${social.id}`}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>Send a Message</h3>
            
            <div className="form-group">
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                placeholder="Your Name"
                required
                variants={inputVariants}
                animate={focused === 'name' ? 'focused' : 'rest'}
              />
            </div>
            
            <div className="form-group">
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                placeholder="Your Email"
                required
                variants={inputVariants}
                animate={focused === 'email' ? 'focused' : 'rest'}
              />
            </div>
            
            <div className="form-group">
              <motion.input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                placeholder="Subject"
                required
                variants={inputVariants}
                animate={focused === 'subject' ? 'focused' : 'rest'}
              />
            </div>
            
            <div className="form-group">
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                placeholder="Your Message"
                required
                variants={inputVariants}
                animate={focused === 'message' ? 'focused' : 'rest'}
              />
            </div>
            
            <motion.button
              type="submit"
              className="submit-button"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              Send Message
            </motion.button>
            
            {formStatus.submitted && (
              <motion.div 
                className={`form-message ${formStatus.success ? 'success' : 'error'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus.message}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
      
      <div className="background-decoration">
        {Array(20).fill().map((_, index) => (
          <motion.div
            key={index}
            className="decoration-dot"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              opacity: [
                Math.random() * 0.5 + 0.1,
                Math.random() * 0.5 + 0.3,
                Math.random() * 0.5 + 0.1
              ],
              transition: {
                duration: 20 + Math.random() * 30,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            style={{
              width: `${(Math.random() * 5) + 2}px`,
              height: `${(Math.random() * 5) + 2}px`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Contact;