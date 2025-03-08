import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

import ForceGraph2D from 'react-force-graph-2d';

const SkillsGraph = () => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  
  // Define the skills data structure
  const graphData = {
    nodes: [
      // Core node
      { id: 'core', name: 'Skills', group: 'core', val: 25 },
      
      // Category nodes
      { id: 'languages', name: 'Languages', group: 'category', val: 15 },
      { id: 'frontend', name: 'Frontend', group: 'category', val: 15 },
      { id: 'backend', name: 'Backend', group: 'category', val: 15 },
      { id: 'database', name: 'Database', group: 'category', val: 15 },
      { id: 'cloud', name: 'Cloud & DevOps', group: 'category', val: 15 },
      { id: 'ai', name: 'AI/ML', group: 'category', val: 15 },
      { id: 'tools', name: 'Tools', group: 'category', val: 15 },
      
      // Language skills
      { id: 'java', name: 'Java', group: 'languages', val: 10, level: 'advanced' },
      { id: 'python', name: 'Python', group: 'languages', val: 10, level: 'advanced' },
      { id: 'javascript', name: 'JavaScript', group: 'languages', val: 10, level: 'advanced' },
      { id: 'typescript', name: 'TypeScript', group: 'languages', val: 8, level: 'intermediate' },
      { id: 'sql', name: 'SQL', group: 'languages', val: 10, level: 'advanced' },
      
      // Frontend skills
      { id: 'react', name: 'React.js', group: 'frontend', val: 10, level: 'advanced' },
      { id: 'redux', name: 'Redux', group: 'frontend', val: 8, level: 'intermediate' },
      { id: 'reactnative', name: 'React Native', group: 'frontend', val: 8, level: 'intermediate' },
      { id: 'htmlcss', name: 'HTML/CSS', group: 'frontend', val: 10, level: 'advanced' },
      
      // Backend skills
      { id: 'springboot', name: 'Spring Boot', group: 'backend', val: 10, level: 'advanced' },
      { id: 'nodejs', name: 'Node.js', group: 'backend', val: 8, level: 'intermediate' },
      { id: 'microservices', name: 'Microservices', group: 'backend', val: 10, level: 'advanced' },
      { id: 'restapi', name: 'REST API', group: 'backend', val: 10, level: 'advanced' },
      { id: 'graphql', name: 'GraphQL', group: 'backend', val: 8, level: 'intermediate' },
      
      // Database skills
      { id: 'mysql', name: 'MySQL', group: 'database', val: 10, level: 'advanced' },
      { id: 'mongodb', name: 'MongoDB', group: 'database', val: 8, level: 'intermediate' },
      { id: 'postgresql', name: 'PostgreSQL', group: 'database', val: 8, level: 'intermediate' },
      { id: 'redis', name: 'Redis', group: 'database', val: 8, level: 'intermediate' },
      
      // Cloud & DevOps skills
      { id: 'aws', name: 'AWS', group: 'cloud', val: 10, level: 'advanced' },
      { id: 'docker', name: 'Docker', group: 'cloud', val: 10, level: 'advanced' },
      { id: 'kubernetes', name: 'Kubernetes', group: 'cloud', val: 8, level: 'intermediate' },
      { id: 'cicd', name: 'CI/CD', group: 'cloud', val: 8, level: 'intermediate' },
      { id: 'terraform', name: 'Terraform', group: 'cloud', val: 6, level: 'basic' },
      
      // AI/ML skills
      { id: 'machinelearning', name: 'Machine Learning', group: 'ai', val: 8, level: 'intermediate' },
      { id: 'tensorflow', name: 'TensorFlow', group: 'ai', val: 8, level: 'intermediate' },
      { id: 'pytorch', name: 'PyTorch', group: 'ai', val: 8, level: 'intermediate' },
      { id: 'computervision', name: 'Computer Vision', group: 'ai', val: 8, level: 'intermediate' },
      { id: 'nlp', name: 'NLP', group: 'ai', val: 6, level: 'basic' },
      
      // Tools skills
      { id: 'git', name: 'Git/GitHub', group: 'tools', val: 10, level: 'advanced' },
      { id: 'testing', name: 'Testing', group: 'tools', val: 10, level: 'advanced' },
      { id: 'performance', name: 'Performance', group: 'tools', val: 8, level: 'intermediate' },
      { id: 'responsive', name: 'Responsive Design', group: 'tools', val: 10, level: 'advanced' }
    ],
    links: [
      // Connect core to categories
      { source: 'core', target: 'languages', value: 5 },
      { source: 'core', target: 'frontend', value: 5 },
      { source: 'core', target: 'backend', value: 5 },
      { source: 'core', target: 'database', value: 5 },
      { source: 'core', target: 'cloud', value: 5 },
      { source: 'core', target: 'ai', value: 5 },
      { source: 'core', target: 'tools', value: 5 },
      
      // Connect Languages with their skills
      { source: 'languages', target: 'java', value: 3 },
      { source: 'languages', target: 'python', value: 3 },
      { source: 'languages', target: 'javascript', value: 3 },
      { source: 'languages', target: 'typescript', value: 3 },
      { source: 'languages', target: 'sql', value: 3 },
      
      // Connect Frontend with their skills
      { source: 'frontend', target: 'react', value: 3 },
      { source: 'frontend', target: 'redux', value: 3 },
      { source: 'frontend', target: 'reactnative', value: 3 },
      { source: 'frontend', target: 'htmlcss', value: 3 },
      
      // Connect Backend with their skills
      { source: 'backend', target: 'springboot', value: 3 },
      { source: 'backend', target: 'nodejs', value: 3 },
      { source: 'backend', target: 'microservices', value: 3 },
      { source: 'backend', target: 'restapi', value: 3 },
      { source: 'backend', target: 'graphql', value: 3 },
      
      // Connect Database with their skills
      { source: 'database', target: 'mysql', value: 3 },
      { source: 'database', target: 'mongodb', value: 3 },
      { source: 'database', target: 'postgresql', value: 3 },
      { source: 'database', target: 'redis', value: 3 },
      
      // Connect Cloud with their skills
      { source: 'cloud', target: 'aws', value: 3 },
      { source: 'cloud', target: 'docker', value: 3 },
      { source: 'cloud', target: 'kubernetes', value: 3 },
      { source: 'cloud', target: 'cicd', value: 3 },
      { source: 'cloud', target: 'terraform', value: 3 },
      
      // Connect AI with their skills
      { source: 'ai', target: 'machinelearning', value: 3 },
      { source: 'ai', target: 'tensorflow', value: 3 },
      { source: 'ai', target: 'pytorch', value: 3 },
      { source: 'ai', target: 'computervision', value: 3 },
      { source: 'ai', target: 'nlp', value: 3 },
      
      // Connect Tools with their skills
      { source: 'tools', target: 'git', value: 3 },
      { source: 'tools', target: 'testing', value: 3 },
      { source: 'tools', target: 'performance', value: 3 },
      { source: 'tools', target: 'responsive', value: 3 },
      
      // Add relationships between skills
      { source: 'javascript', target: 'typescript', value: 2 },
      { source: 'javascript', target: 'react', value: 2 },
      { source: 'javascript', target: 'nodejs', value: 2 },
      { source: 'react', target: 'redux', value: 2 },
      { source: 'react', target: 'reactnative', value: 2 },
      { source: 'java', target: 'springboot', value: 2 },
      { source: 'springboot', target: 'microservices', value: 2 },
      { source: 'nodejs', target: 'mongodb', value: 2 },
      { source: 'python', target: 'machinelearning', value: 2 },
      { source: 'machinelearning', target: 'tensorflow', value: 2 },
      { source: 'machinelearning', target: 'pytorch', value: 2 },
      { source: 'machinelearning', target: 'computervision', value: 2 },
      { source: 'machinelearning', target: 'nlp', value: 2 },
      { source: 'aws', target: 'docker', value: 2 },
      { source: 'docker', target: 'kubernetes', value: 2 },
      { source: 'aws', target: 'terraform', value: 2 }
    ]
  };
  
  // Define color scheme for nodes
  const getNodeColor = node => {
    const colorMap = {
      'core': '#ff6b6b',
      'category': '#4ecdc4',
      'languages': '#1a6b30',
      'frontend': '#2e8b57',
      'backend': '#3cb371',
      'database': '#66c285',
      'cloud': '#90ee90',
      'ai': '#32cd32',
      'tools': '#228b22'
    };
    
    if (node.level === 'advanced') {
      return colorMap[node.group] || '#ff6b6b';
    } else if (node.level === 'intermediate') {
      // Slightly lighter shade for intermediate skills
      const baseColor = colorMap[node.group] || '#ff6b6b';
      return baseColor + 'cc'; // Adding transparency
    } else if (node.level === 'basic') {
      // Even lighter for basic skills
      const baseColor = colorMap[node.group] || '#ff6b6b';
      return baseColor + '99'; // More transparency
    }
    
    return colorMap[node.group] || '#ff6b6b';
  };
  
  // Update dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.max(600, window.innerHeight * 0.7)
        });
      }
    };
    
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Initialize and customize graph once mounted
  useEffect(() => {
    if (graphRef.current) {
      // Customize force physics
      graphRef.current.d3Force('link').distance(link => {
        if (link.source.id === 'core') return 100;
        if (link.source.group === 'category') return 70;
        return 50;
      });
      
      graphRef.current.d3Force('charge').strength(-150);
      graphRef.current.d3Force('center', null);
      graphRef.current.d3Force('x', d3.forceX(dimensions.width / 2).strength(0.05));
      graphRef.current.d3Force('y', d3.forceY(dimensions.height / 2).strength(0.05));
      
      // Apply collision force to prevent overlap
      graphRef.current.d3Force('collision', d3.forceCollide(node => Math.sqrt(node.val * 25)));
    }
  }, [dimensions]);
  
  // Node tooltip
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  
  // Custom node object rendering
  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = node.group === 'core' ? 16 : node.group === 'category' ? 14 : 12;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const backgroundNodeSize = Math.max(textWidth + 8, node.val * 2);
    
    // Draw node background
    ctx.beginPath();
    ctx.fillStyle = getNodeColor(node);
    ctx.arc(node.x, node.y, backgroundNodeSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw node border
    ctx.strokeStyle = node.group === 'core' ? '#ffffff' : '#333333';
    ctx.lineWidth = node.group === 'core' ? 2 : 1;
    ctx.stroke();
    
    // Draw node label
    ctx.fillStyle = node.group === 'core' || node.group === 'category' ? '#ffffff' : '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, node.x, node.y);
    
    // Add stars for skill level
    if (node.level) {
      const starY = node.y + backgroundNodeSize / 2 + 10;
      ctx.fillStyle = '#FFD700'; // Gold color for stars
      
      if (node.level === 'advanced') {
        drawStar(ctx, node.x - 12, starY, 5, 3, 1.5);
        drawStar(ctx, node.x, starY, 5, 3, 1.5);
        drawStar(ctx, node.x + 12, starY, 5, 3, 1.5);
      } else if (node.level === 'intermediate') {
        drawStar(ctx, node.x - 6, starY, 5, 3, 1.5);
        drawStar(ctx, node.x + 6, starY, 5, 3, 1.5);
      } else if (node.level === 'basic') {
        drawStar(ctx, node.x, starY, 5, 3, 1.5);
      }
    }
  };
  
  // Helper function to draw a star
  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  };
  
  // Link color based on source and target
  const getLinkColor = link => {
    const sourceNode = graphData.nodes.find(node => node.id === link.source.id || node.id === link.source);
    if (sourceNode) {
      return getNodeColor(sourceNode) + '80'; // Add transparency
    }
    return '#88888880';
  };
  
  // Link width based on value
  const getLinkWidth = link => link.value;
  
  return (
    <div className="skills-section" style={{ padding: '100px 0' }}>
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h2>My <span style={{ color: 'var(--accent)' }}>Skills</span></h2>
          <p style={{ 
            maxWidth: '700px', 
            margin: '0 auto', 
            color: 'var(--text-secondary)',
            marginTop: '1rem',
            fontSize: '1.1rem'
          }}>
            Explore my skills network – hover over nodes to see connections, and click to focus on specific skill areas. The size and color intensity of each node represents my proficiency level.
          </p>
        </motion.div>
        
        <div 
          ref={containerRef} 
          className="graph-container"
          style={{ 
            width: '100%', 
            height: `${dimensions.height}px`,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'rgba(10,10,10,0.3)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}
        >
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            nodeRelSize={8}
            nodeVal={node => node.val}
            nodeCanvasObject={nodeCanvasObject}
            linkWidth={getLinkWidth}
            linkColor={getLinkColor}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.005}
            cooldownTicks={100}
            onNodeHover={node => {
              document.body.style.cursor = node ? 'pointer' : 'default';
            }}
            onNodeClick={node => {
              // Center view on clicked node and zoom in slightly
              if (graphRef.current) {
                graphRef.current.centerAt(node.x, node.y, 500);
                graphRef.current.zoom(1.5, 500);
              }
            }}
            onBackgroundClick={() => {
              // Reset zoom on background click
              if (graphRef.current) {
                graphRef.current.centerAt(dimensions.width/2, dimensions.height/2, 500);
                graphRef.current.zoom(1, 500);
              }
            }}
          />
          
          {tooltip.show && (
            <div 
              className="node-tooltip"
              style={{
                position: 'absolute',
                top: tooltip.y,
                left: tooltip.x,
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '12px',
                pointerEvents: 'none',
                zIndex: 1000,
                transform: 'translate(-50%, -100%)',
                marginTop: '-10px'
              }}
            >
              {tooltip.content}
            </div>
          )}
        </div>
        
        <div 
          className="legend"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem'
          }}
        >
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
            <strong style={{ marginRight: '0.5rem' }}>Proficiency:</strong>
          </div>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
            <span style={{ display: 'flex' }}>
              <span style={{ color: '#FFD700' }}>★★★</span>
            </span>
            <span style={{ marginLeft: '0.3rem' }}>Advanced</span>
          </div>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
            <span style={{ display: 'flex' }}>
              <span style={{ color: '#FFD700' }}>★★</span>
            </span>
            <span style={{ marginLeft: '0.3rem' }}>Intermediate</span>
          </div>
          <div className="legend-item" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'flex' }}>
              <span style={{ color: '#FFD700' }}>★</span>
            </span>
            <span style={{ marginLeft: '0.3rem' }}>Basic</span>
          </div>
        </div>
        
        <div
          className="instructions"
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}
        >
          <p>Click on a node to focus on specific skills. Click on background to reset view.</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsGraph;