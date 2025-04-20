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
  
  // Mouse move handler for both particles and cursor light
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
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
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    
    // Hide cursor light when mouse leaves
    if (cursorLightRef.current) {
      cursorLightRef.current.style.opacity = '0';
    }
  };
  
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
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Cursor light effect */}
      <div
        ref={cursorLightRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '200px', // Smaller cursor light
          height: '200px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(var(--primary), 0.08) 0%, rgba(var(--primary), 0.03) 50%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'plus-lighter', // Lighter blend mode that won't overpower text
          zIndex: 1,
          filter: 'blur(8px)' // Add slight blur for a softer effect
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