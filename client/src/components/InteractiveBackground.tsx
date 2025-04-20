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
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Setup particles on mount
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
    
    // Create particles
    const particleCount = Math.min(Math.floor(width * height / 15000), 40); // Adjust density as needed
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 2; // Size between 2 and 5
      
      // Use theme colors for particles
      const colors = [
        "rgba(var(--primary), 0.3)",
        "rgba(var(--primary), 0.2)",
        "rgba(var(--secondary), 0.2)",
        "rgba(var(--muted), 0.3)",
        "rgba(var(--accent), 0.2)",
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
  
  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
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
    
    // Maximum influence distance
    const maxDistance = 200;
    
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
    
    // Calculate repulsion effect - particles move away from cursor
    const factor = 1 - distance / maxDistance;
    const repulsionStrength = 40 * factor;
    
    // Apply repulsion in opposite direction of mouse
    const angle = Math.atan2(dy, dx);
    const offsetX = -Math.cos(angle) * repulsionStrength;
    const offsetY = -Math.sin(angle) * repulsionStrength;
    
    return {
      x: particle.initialX + offsetX,
      y: particle.initialY + offsetY,
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 15 
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
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}