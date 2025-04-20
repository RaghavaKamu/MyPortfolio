import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useAnimation, Variants } from "framer-motion";
import { 
  Code, Database, FileCode, Github, Server, Terminal, 
  TerminalSquare, Braces, Globe, Cloud, HardDrive, Network
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import InteractiveBackground from "./InteractiveBackground";

// Define skill categories with enhanced data for visualization
// Order has been arranged to match the star pattern positions
const skillCategories = [
  // Center position
  {
    id: "machinelearning",
    title: "Machine Learning",
    icon: <HardDrive className="h-8 w-8" />,
    color: "from-emerald-500 via-green-500 to-emerald-600",
    hoverColor: "group-hover:from-emerald-600 group-hover:via-green-500 group-hover:to-emerald-700",
    textColor: "text-emerald-50",
    glowColor: "rgba(16, 185, 129, 0.4)", // emerald-500 with transparency
    skills: ["TensorFlow", "Data Analysis", "Sentiment Analysis", "Deep Learning", "Neural Networks"]
  },
  // Top position
  {
    id: "languages",
    title: "Programming Languages",
    icon: <Braces className="h-8 w-8" />,
    color: "from-blue-600 via-indigo-500 to-blue-700",
    hoverColor: "group-hover:from-blue-700 group-hover:via-indigo-600 group-hover:to-blue-800",
    textColor: "text-blue-50",
    glowColor: "rgba(79, 70, 229, 0.4)", // indigo-600 with transparency
    skills: ["GoLang", "JavaScript", "Python", "Ruby", "C"]
  },
  // Right position
  {
    id: "frontend",
    title: "Web Development",
    icon: <Globe className="h-8 w-8" />,
    color: "from-violet-600 via-purple-500 to-violet-700",
    hoverColor: "group-hover:from-violet-700 group-hover:via-purple-600 group-hover:to-violet-800",
    textColor: "text-purple-50",
    glowColor: "rgba(139, 92, 246, 0.4)", // purple-500 with transparency
    skills: ["HTML", "CSS", "React.js", "Django", "Spring Boot"]
  },
  // Bottom position
  {
    id: "database",
    title: "Databases",
    icon: <Database className="h-8 w-8" />,
    color: "from-rose-500 via-red-500 to-rose-600",
    hoverColor: "group-hover:from-rose-600 group-hover:via-red-600 group-hover:to-rose-700",
    textColor: "text-red-50",
    glowColor: "rgba(225, 29, 72, 0.4)", // rose-600 with transparency
    skills: ["Oracle", "MySQL", "MongoDB", "SQL", "NoSQL"]
  },
  // Left position
  {
    id: "networking",
    title: "Networking",
    icon: <Network className="h-8 w-8" />,
    color: "from-cyan-500 via-teal-500 to-cyan-600",
    hoverColor: "group-hover:from-cyan-600 group-hover:via-teal-600 group-hover:to-cyan-700",
    textColor: "text-teal-50",
    glowColor: "rgba(20, 184, 166, 0.4)", // teal-500 with transparency
    skills: ["Cisco", "TCP/IP", "Network Security", "Routing", "LAN/WAN"]
  },
  // Extra position (between center and left)
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: <Cloud className="h-8 w-8" />,
    color: "from-amber-500 via-orange-500 to-amber-600",
    hoverColor: "group-hover:from-amber-600 group-hover:via-orange-600 group-hover:to-amber-700",
    textColor: "text-orange-50",
    glowColor: "rgba(234, 88, 12, 0.4)", // orange-600 with transparency
    skills: ["Azure", "AWS", "Git", "GitHub", "CI/CD"]
  }
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const bubbleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 150,
      damping: 15
    }
  }
};

const skillItemVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

const orbitVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Component for individual skill bubbles
interface SkillBubbleProps {
  category: typeof skillCategories[0];
  index: number;
  isActive: boolean;
}

// Hook to safely handle window resize
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return windowSize;
}

function SkillBubble({ category, index, isActive }: SkillBubbleProps) {
  const bubbleControls = useAnimation();
  const bubbleRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowSize();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });

  // Different float animations for each bubble 
  useEffect(() => {
    // Create different animation patterns based on index
    const animations = [
      // Center/first bubble - gentle pulse
      {
        scale: [1, 1.05, 1],
        y: [0, -5, 0],
      },
      // Top bubble - vertical movement
      {
        y: [0, -15, 0],
        rotate: [0, -2, 0, 2, 0],
      },
      // Right side bubbles - diagonal movement
      {
        y: [0, -8, 0],
        x: [0, 8, 0],
      },
      // Bottom bubble - horizontal wobble
      {
        x: [-10, 10, -10],
        rotate: [-1, 1, -1],
      },
      // Left side bubbles - figure-8 movement
      {
        y: [0, -5, 0, 5, 0],
        x: [0, 5, 0, -5, 0],
      },
      // Extra bubble - gentle rotation
      {
        rotate: [-3, 3, -3],
        y: [0, -3, 0],
      },
    ];

    // Get the animation for this bubble (or use the first one as default)
    const animation = animations[index % animations.length];
    
    bubbleControls.start({
      ...animation,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 5 + index * 0.8, // Different durations for each bubble
        ease: "easeInOut"
      }
    });
  }, [bubbleControls, index]);

  // Handle mouse movement for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (bubbleRef.current) {
      const rect = bubbleRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate percentage for CSS spotlight
      const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));
      
      setMousePosition({ x, y });
      setSpotlightPosition({ x: xPercent, y: yPercent });
    }
  };

  const handleHoverStart = () => {
    console.log("Hover started on", category.title);
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    console.log("Hover ended on", category.title);
    setIsHovered(false);
    // Reset spotlight to center when not hovering
    setSpotlightPosition({ x: 50, y: 50 });
  };

  // Get the relative position for each skill in a circle
  const getSkillPosition = (index: number, total: number) => {
    const angle = (index * (360 / total)) * (Math.PI / 180);
    const radius = windowWidth < 768 ? 150 : 200;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  // Generate particle array for a subtle sparkling effect
  const particles = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 2 + Math.random() * 3,
      animationDelay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="relative" style={{ zIndex: isHovered ? 50 : 0 }}>
      {/* Skills that appear on hover */}
      <div className="absolute top-1/2 left-1/2" style={{ zIndex: 100 }}>
        <AnimatePresence>
          {isHovered && category.skills.map((skill, i) => {
            const pos = getSkillPosition(i, category.skills.length);
            
            return (
              <motion.div
                key={skill}
                className="absolute"
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: pos.x,
                  y: pos.y,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: i * 0.05
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0,
                  transition: { duration: 0.2 }
                }}
                style={{ pointerEvents: "auto" }}
                whileHover={{ 
                  scale: 1.15,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 10 
                  }
                }}
              >
                <Badge 
                  className={cn(
                    "px-3 py-1 text-sm font-medium shadow-lg",
                    "bg-white/95 dark:bg-slate-900/95 border-2",
                    {
                      "border-indigo-500": category.id === "languages",
                      "border-violet-500": category.id === "frontend",
                      "border-amber-500": category.id === "cloud",
                      "border-rose-500": category.id === "database",
                      "border-cyan-500": category.id === "networking",
                      "border-emerald-500": category.id === "machinelearning",
                    },
                    "hover:bg-white dark:hover:bg-slate-900",
                    "transition-all duration-200"
                  )}
                >
                  {skill}
                </Badge>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Main bubble */}
      <motion.div
        ref={bubbleRef}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "cursor-pointer group"
        )}
        variants={bubbleVariants}
        animate={bubbleControls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.1 }}
      >
        {/* Outer glow effect */}
        <div 
          className="absolute rounded-full blur-md transition-opacity duration-300"
          style={{ 
            width: isHovered ? '120%' : '110%',
            height: isHovered ? '120%' : '110%',
            background: category.glowColor,
            opacity: isHovered ? 0.7 : 0.3,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            zIndex: -1
          }}
        />
        
        <motion.div
          className={cn(
            "flex items-center justify-center rounded-full",
            "bg-gradient-to-br shadow-lg",
            "relative overflow-hidden backdrop-blur-[2px]",
            category.color,
            category.hoverColor,
            "transition-all duration-300",
            isHovered ? "scale-110" : "",
            isHovered ? "md:h-48 md:w-48 h-32 w-32" : "md:h-32 md:w-32 h-24 w-24" 
          )}
          style={{
            boxShadow: isHovered 
              ? `0 10px 25px -5px ${category.glowColor}, 0 8px 10px -6px rgba(0,0,0,0.1)` 
              : '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'
          }}
        >
          {/* Dynamic spotlight effect */}
          <div 
            className="absolute inset-0 opacity-60 transition-opacity duration-300 pointer-events-none"
            style={{ 
              background: `radial-gradient(circle at ${spotlightPosition.x}% ${spotlightPosition.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
              opacity: isHovered ? 0.8 : 0.4,
            }}
          />
          
          {/* Glass effect top highlight */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-full"></div>
          
          {/* Bottom shadow for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
          
          {/* Subtle particle effect for visual interest */}
          {particles.map((particle, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/80 animate-pulse"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                opacity: isHovered ? 0.9 : 0.5,
                animationDuration: `${particle.animationDuration}s`,
                animationDelay: `${particle.animationDelay}s`,
              }}
            />
          ))}
          
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={cn("text-base font-bold text-center", category.textColor)}>
                  {category.title}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={cn("mb-1", category.textColor)}>{category.icon}</div>
                <div className={cn("text-xs font-medium text-center", category.textColor)}>
                  {category.title}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  const { width: windowWidth } = useWindowSize();

  // Calculate positions for each bubble in a more artistic pattern
  // These positions are percentages of the container
  const getBubblePositions = () => {
    // Different layouts for mobile and desktop
    if (windowWidth < 768) {
      // Triangular pattern for mobile (more compact)
      return [
        // Center (Machine Learning)
        { top: "25%", left: "50%" },
        
        // Top (Programming Languages)
        { top: "5%", left: "50%" },
        
        // Right Side (Web Development)
        { top: "25%", left: "80%" },
        
        // Bottom (Databases) 
        { top: "45%", left: "50%" },
        
        // Left Side (Networking)
        { top: "25%", left: "20%" },
        
        // Bottom of triangle (Cloud & DevOps)
        { top: "65%", left: "50%" },
      ];
    } else {
      // Interactive diamond/star pattern for desktop
      return [
        // Center bubble (Machine Learning - most relevant to your work)
        { top: "40%", left: "50%" },
        
        // Top point (Programming Languages)
        { top: "8%", left: "50%" },
        
        // Right point (Web Development)
        { top: "40%", left: "85%" },
        
        // Bottom point (Databases)
        { top: "72%", left: "50%" },
        
        // Left point (Networking)
        { top: "40%", left: "15%" },
        
        // Extra bubble (Cloud & DevOps) - offset from center
        { top: "25%", left: "30%" },
      ];
    }
  };

  const bubblePositions = getBubblePositions();

  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />
      
      {/* Background gradient effects */}
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-primary">Skills</span>
        </motion.h2>
        
        <motion.div 
          className="relative h-[450px] md:h-[600px] w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="absolute"
              style={{
                top: bubblePositions[index].top,
                left: bubblePositions[index].left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <SkillBubble
                category={category}
                index={index}
                isActive={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}