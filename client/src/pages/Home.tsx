import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Home() {
  const controls = useAnimation();

  useEffect(() => {
    // Set up intersection observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Start animation for the section
            controls.start(sectionId);
            
            // Update active nav link
            document.querySelectorAll(".nav-link").forEach((link) => {
              link.classList.remove("active");
              if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [controls]);

  // Set up smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
          e.preventDefault();
          
          const targetElement = document.querySelector(href);
          if (targetElement) {
            // Scroll to target with offset for header
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
