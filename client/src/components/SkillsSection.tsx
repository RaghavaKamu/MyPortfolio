import { useState, useRef, useEffect } from "react";
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
    color: "from-green-400 to-green-600",
    hoverColor: "group-hover:from-green-500 group-hover:to-green-700",
    textColor: "text-green-50",
    skills: ["TensorFlow", "Data Analysis", "Sentiment Analysis", "Deep Learning", "Neural Networks"]
  },
  // Top position
  {
    id: "languages",
    title: "Programming Languages",
    icon: <Braces className="h-8 w-8" />,
    color: "from-blue-400 to-blue-600",
    hoverColor: "group-hover:from-blue-500 group-hover:to-blue-700",
    textColor: "text-blue-50",
    skills: ["GoLang", "JavaScript", "Python", "Ruby", "C"]
  },
  // Right position
  {
    id: "frontend",
    title: "Web Development",
    icon: <Globe className="h-8 w-8" />,
    color: "from-purple-400 to-purple-600",
    hoverColor: "group-hover:from-purple-500 group-hover:to-purple-700",
    textColor: "text-purple-50",
    skills: ["HTML", "CSS", "React.js", "Django", "Spring Boot"]
  },
  // Bottom position
  {
    id: "database",
    title: "Databases",
    icon: <Database className="h-8 w-8" />,
    color: "from-red-400 to-red-600",
    hoverColor: "group-hover:from-red-500 group-hover:to-red-700",
    textColor: "text-red-50",
    skills: ["Oracle", "MySQL", "MongoDB", "SQL", "NoSQL"]
  },
  // Left position
  {
    id: "networking",
    title: "Networking",
    icon: <Network className="h-8 w-8" />,
    color: "from-teal-400 to-teal-600",
    hoverColor: "group-hover:from-teal-500 group-hover:to-teal-700",
    textColor: "text-teal-50",
    skills: ["Cisco", "TCP/IP", "Network Security", "Routing", "LAN/WAN"]
  },
  // Extra position (between center and left)
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: <Cloud className="h-8 w-8" />,
    color: "from-orange-400 to-orange-600",
    hoverColor: "group-hover:from-orange-500 group-hover:to-orange-700",
    textColor: "text-orange-50",
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

  // Log hover state changes
  useEffect(() => {
    console.log(`Bubble ${category.title} hover state: ${isHovered}`);
  }, [isHovered, category.title]);

  const handleHoverStart = () => {
    console.log("Hover started on", category.title);
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    console.log("Hover ended on", category.title);
    setIsHovered(false);
  };

  return (
    <div className="relative">
      {/* Skills orbit (visible only when hovered) */}
      {isHovered && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
          <div className="absolute" style={{ 
            top: bubbleRef.current ? bubbleRef.current.getBoundingClientRect().top + window.scrollY + (bubbleRef.current.getBoundingClientRect().height / 2) : 0,
            left: bubbleRef.current ? bubbleRef.current.getBoundingClientRect().left + window.scrollX + (bubbleRef.current.getBoundingClientRect().width / 2) : 0,
          }}>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {category.skills.map((skill, i) => {
                // Calculate position in a circle around the main bubble
                const angle = (i * (360 / category.skills.length)) * (Math.PI / 180);
                // Use a smaller radius on mobile but ensure skills don't overlap with category bubbles
                const radius = windowWidth < 768 ? 150 : 200; 
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={skill}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x,
                      y,
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
                      transition: {
                        duration: 0.1
                      }
                    }}
                    style={{ 
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: "auto" 
                    }}
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
                          "border-blue-500": category.id === "languages",
                          "border-purple-500": category.id === "frontend",
                          "border-orange-500": category.id === "cloud",
                          "border-red-500": category.id === "database",
                          "border-teal-500": category.id === "networking",
                          "border-green-500": category.id === "machinelearning",
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
            </motion.div>
          </div>
        </div>
      )}

      {/* The main category bubble */}
      <motion.div
        ref={bubbleRef}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "cursor-pointer group",
          isHovered ? "z-10" : "z-0" // Increase z-index when hovered, but keep lower than skills
        )}
        variants={bubbleVariants}
        animate={bubbleControls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className={cn(
            "flex items-center justify-center rounded-full",
            "bg-gradient-to-br shadow-lg",
            "relative overflow-hidden",
            category.color,
            category.hoverColor,
            "transition-all duration-300",
            isHovered ? "scale-110" : "",
            isHovered ? "md:h-48 md:w-48 h-32 w-32" : "md:h-32 md:w-32 h-24 w-24" 
          )}
        >
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50"></div>
          
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