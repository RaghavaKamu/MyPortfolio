import React, { useEffect, useRef, useState } from 'react';

export default function CursorLight() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Get the element under the cursor
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        
        // Check if we're in the hero section or hovering over a skill bubble
        let currentElement = elementUnderCursor;
        let inHeroSection = false;
        let onSkillBubble = false;
        
        while (currentElement) {
          if (currentElement.id === 'home') {
            inHeroSection = true;
            break;
          }
          
          // Check if we're hovering a skill bubble
          if (currentElement.classList && 
              (currentElement.classList.contains('skill-bubble') || 
               currentElement.getAttribute('data-skill-bubble') === 'true')) {
            onSkillBubble = true;
            break;
          }
          
          currentElement = currentElement.parentElement;
        }
        
        // Update cursor position
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        
        // Show/hide based on section and skill bubble status
        if (inHeroSection || onSkillBubble) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none"
      style={{
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(var(--primary), 1) 0%, rgba(var(--primary), 0.6) 15%, rgba(var(--primary), 0.3) 35%, transparent 70%)',
        mixBlendMode: 'overlay',
        opacity: isVisible ? 0.8 : 0,
        transition: 'opacity 0.3s ease',
        boxShadow: '0 0 30px 10px rgba(var(--primary), 0.3)'
      }}
    />
  );
}