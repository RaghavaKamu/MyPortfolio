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

interface SpotlightProps {
  // Control properties through CSS variables
  intensity?: number; // 0-100 controls opacity
  size?: number; // size in pixels
  color?: string; // CSS color value
  blur?: number; // blur in pixels
}

export default function InteractiveBackground({ 
  intensity = 80, 
  size = 500, 
  color = "rgba(var(--primary), 0.15)", 
  blur = 60 
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Create a ref for requestAnimationFrame
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Setup particles on mount
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });
    
    // Create particles - reduce the number for better performance
    const particleCount = Math.min(Math.floor(width * height / 35000), 25); // Reduced density
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1; // Smaller size between 1 and 3
      
      // Use more subtle theme colors for particles
      const colors = [
        "rgba(var(--primary), 0.12)",
        "rgba(var(--primary), 0.08)",
        "rgba(var(--secondary), 0.1)",
        "rgba(var(--muted), 0.15)",
        "rgba(var(--accent), 0.08)",
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
  
  // Animation loop for smooth spotlight movement
  const animateSpotlight = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - previousTimeRef.current;
    previousTimeRef.current = time;
    
    if (spotlightRef.current && isHovering) {
      const currentX = parseFloat(spotlightRef.current.style.left || '0');
      const currentY = parseFloat(spotlightRef.current.style.top || '0');
      
      // Calculate distance to target position
      const dx = mousePosition.x - currentX;
      const dy = mousePosition.y - currentY;
      
      // Smooth follow with easing - faster when mouse moves quickly
      const easing = 0.15 + (mouseSpeed * 0.1); // More responsive when moving fast
      const newX = currentX + dx * Math.min(easing, 0.3);
      const newY = currentY + dy * Math.min(easing, 0.3);
      
      // Update spotlight position with smooth transition
      spotlightRef.current.style.left = `${newX}px`;
      spotlightRef.current.style.top = `${newY}px`;
      
      // Make spotlight larger when mouse moves faster
      const speedFactor = Math.min(mouseSpeed / 20, 1); // Normalize speed
      const dynamicSize = size + (size * 0.3 * speedFactor);
      spotlightRef.current.style.width = `${dynamicSize}px`;
      spotlightRef.current.style.height = `${dynamicSize}px`;
      
      // Adjust opacity based on speed (more visible when moving faster)
      const opacityFactor = 0.5 + (speedFactor * 0.5);
      const opacityValue = (intensity / 100) * opacityFactor;
      spotlightRef.current.style.opacity = String(opacityValue);
    }
    
    requestRef.current = requestAnimationFrame(animateSpotlight);
  };
  
  // Start and stop the animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateSpotlight);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHovering, mousePosition, mouseSpeed]);
  
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
        
        // Calculate mouse speed based on distance from last position
        const dx = x - lastMousePosition.x;
        const dy = y - lastMousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        setMouseSpeed(distance);
        
        setMousePosition({ x, y });
        setLastMousePosition({ x, y });
        setIsHovering(true);
        
        // Initial position setting for spotlight
        if (spotlightRef.current && spotlightRef.current.style.opacity === '0') {
          spotlightRef.current.style.left = `${x}px`;
          spotlightRef.current.style.top = `${y}px`;
          spotlightRef.current.style.opacity = String(intensity / 100);
        }
      } else {
        // Mouse is outside container
        setIsHovering(false);
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = '0';
        }
      }
    };
    
    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if touch is within the container
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        // Calculate speed based on distance from last position
        const dx = x - lastMousePosition.x;
        const dy = y - lastMousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        setMouseSpeed(distance);
        
        setMousePosition({ x, y });
        setLastMousePosition({ x, y });
        setIsHovering(true);
        
        // Initial position setting for spotlight
        if (spotlightRef.current && spotlightRef.current.style.opacity === '0') {
          spotlightRef.current.style.left = `${x}px`;
          spotlightRef.current.style.top = `${y}px`;
          spotlightRef.current.style.opacity = String(intensity / 100);
        }
      }
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lastMousePosition, intensity]);
  
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
    const maxDistance = 180;
    
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
    const attractionStrength = 25 * factor; // Slightly stronger movement
    
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

  // Create gradient styles based on provided parameters
  const getSpotlightGradient = () => {
    return `radial-gradient(circle, ${color.replace(')', ', 0.6)')} 0%, ${color.replace(')', ', 0.2)')} 50%, transparent 75%)`;
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Dynamic spotlight effect */}
      <div
        ref={spotlightRef}
        className="absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)',
          background: getSpotlightGradient(),
          opacity: 0,
          transition: 'opacity 0.3s ease',
          filter: `blur(${blur}px)`,
          zIndex: 5,
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
            zIndex: 3
          }}
        />
      ))}
    </div>
  );
}