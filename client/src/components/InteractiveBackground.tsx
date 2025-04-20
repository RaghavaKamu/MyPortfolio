import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorLightRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Setup particles on mount
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
    
    // Create particles - reduce the number for better performance
    const particleCount = Math.min(Math.floor(width * height / 25000), 30); // Reduced density
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1; // Smaller size between 1 and 3
      
      // Use more subtle theme colors for particles
      const colors = [
        "rgba(var(--primary), 0.15)",
        "rgba(var(--primary), 0.1)",
        "rgba(var(--secondary), 0.15)",
        "rgba(var(--muted), 0.2)",
        "rgba(var(--accent), 0.1)",
      ];
      
      newParticles.push({
        x,
        y,
        initialX: x,
        initialY: y,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setParticles(newParticles);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Set up mousemove event listener on the entire document
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if mouse is within the container
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
        setIsHovering(true);
        
        // Update cursor light position
        if (cursorLightRef.current) {
          cursorLightRef.current.style.left = `${x}px`;
          cursorLightRef.current.style.top = `${y}px`;
          cursorLightRef.current.style.opacity = '1';
        }
      } else {
        // Mouse is outside container
        setIsHovering(false);
        if (cursorLightRef.current) {
          cursorLightRef.current.style.opacity = '0';
        }
      }
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);
  
  // Empty handler functions since we're using the global event listener
  const handleMouseMove = () => {};
  const handleMouseLeave = () => {};
  
  // Update particle positions based on mouse position
  const getParticleStyles = (particle: Particle, index: number) => {
    if (!isHovering) {
      // Return to original position when not hovering
      return {
        x: particle.initialX,
        y: particle.initialY,
        transition: { 
          type: "spring", 
          stiffness: 50, 
          damping: 20 
        }
      };
    }
    
    // Calculate distance from mouse
    const dx = mousePosition.x - particle.initialX;
    const dy = mousePosition.y - particle.initialY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Maximum influence distance - keep this smaller than before
    const maxDistance = 150;
    
    if (distance > maxDistance) {
      return {
        x: particle.initialX,
        y: particle.initialY,
        transition: { 
          type: "spring", 
          stiffness: 50, 
          damping: 20 
        }
      };
    }
    
    // Calculate subtle attraction effect - particles are gently pulled toward cursor
    const factor = 1 - distance / maxDistance;
    const attractionStrength = 20 * factor; // Gentler movement
    
    // Apply attraction in direction of mouse
    const angle = Math.atan2(dy, dx);
    const offsetX = Math.cos(angle) * attractionStrength;
    const offsetY = Math.sin(angle) * attractionStrength;
    
    return {
      x: particle.initialX + offsetX,
      y: particle.initialY + offsetY,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20
      }
    };
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Cursor light effect */}
      <div
        ref={cursorLightRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '350px', // Even larger cursor light
          height: '350px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(var(--primary), 0.7) 0%, rgba(var(--primary), 0.3) 40%, transparent 80%)',
          opacity: 0,
          transition: 'opacity 0.15s ease',
          zIndex: 999, // Very high z-index to ensure it's visible above all content
          filter: 'blur(3px)', // Even less blur for more visible effect
          pointerEvents: 'none'
        }}
      />
      
      {/* Subtle background particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          animate={getParticleStyles(particle, index)}
          style={{
            left: particle.initialX,
            top: particle.initialY,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}