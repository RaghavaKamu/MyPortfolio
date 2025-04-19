import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, Variants } from "framer-motion";
import { 
  Code, Database, FileCode, Github, Server, Terminal, 
  TerminalSquare, Braces, Globe, Cloud, HardDrive, Network
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Define skill categories with enhanced data for visualization
const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: <Braces className="h-8 w-8" />,
    color: "from-blue-400 to-blue-600",
    hoverColor: "group-hover:from-blue-500 group-hover:to-blue-700",
    textColor: "text-blue-50",
    skills: ["JavaScript", "TypeScript", "Python", "Ruby", "GoLang"]
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: <Globe className="h-8 w-8" />,
    color: "from-purple-400 to-purple-600",
    hoverColor: "group-hover:from-purple-500 group-hover:to-purple-700",
    textColor: "text-purple-50",
    skills: ["HTML", "CSS", "React.js", "Vue", "Angular"]
  },
  {
    id: "backend",
    title: "Backend",
    icon: <Server className="h-8 w-8" />,
    color: "from-green-400 to-green-600",
    hoverColor: "group-hover:from-green-500 group-hover:to-green-700",
    textColor: "text-green-50",
    skills: ["Node.js", "Express", "Django", "Spring Boot", "FastAPI"]
  },
  {
    id: "cloud",
    title: "Cloud Tools",
    icon: <Cloud className="h-8 w-8" />,
    color: "from-orange-400 to-orange-600",
    hoverColor: "group-hover:from-orange-500 group-hover:to-orange-700",
    textColor: "text-orange-50",
    skills: ["Azure", "AWS", "Google Cloud", "Docker", "Kubernetes"]
  },
  {
    id: "database",
    title: "Databases",
    icon: <Database className="h-8 w-8" />,
    color: "from-red-400 to-red-600",
    hoverColor: "group-hover:from-red-500 group-hover:to-red-700",
    textColor: "text-red-50",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"]
  },
  {
    id: "devops",
    title: "DevOps",
    icon: <TerminalSquare className="h-8 w-8" />,
    color: "from-teal-400 to-teal-600",
    hoverColor: "group-hover:from-teal-500 group-hover:to-teal-700",
    textColor: "text-teal-50",
    skills: ["Git", "CI/CD", "Jenkins", "GitHub Actions", "Terraform"]
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

  // Float animation
  useEffect(() => {
    bubbleControls.start({
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 4 + index * 0.5, // Different durations for each bubble
        ease: "easeInOut"
      }
    });
  }, [bubbleControls, index]);

  return (
    <motion.div
      ref={bubbleRef}
      className={cn(
        "relative flex flex-col items-center justify-center",
        "cursor-pointer group",
        isHovered ? "z-10" : "z-0"
      )}
      variants={bubbleVariants}
      animate={bubbleControls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
        
        <AnimatePresence>
          {isHovered ? (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className={cn("text-lg font-bold text-center mb-1", category.textColor)}>
                {category.title}
              </div>
              <div className={cn("text-xs text-center", category.textColor, "opacity-90")}>
                Hover to explore
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={cn("mb-2", category.textColor)}>{category.icon}</div>
              <div className={cn("text-sm font-bold text-center", category.textColor)}>
                {category.title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Skills orbit (visible only when hovered) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={orbitVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {category.skills.map((skill, i) => {
              // Calculate position in a circle around the main bubble
              const angle = (i * (360 / category.skills.length)) * (Math.PI / 180);
              // Use a smaller radius on mobile
              const radius = windowWidth < 768 ? 110 : 140; 
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={skill}
                  className="absolute"
                  variants={skillItemVariants}
                  style={{
                    x,
                    y,
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
                      "px-3 py-1 text-sm font-medium shadow-md",
                      "bg-white/90 dark:bg-slate-950/90 border-2",
                      {
                        "border-blue-500": category.id === "languages",
                        "border-purple-500": category.id === "frontend",
                        "border-green-500": category.id === "backend",
                        "border-orange-500": category.id === "cloud",
                        "border-red-500": category.id === "database",
                        "border-teal-500": category.id === "devops",
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
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
          className="flex flex-wrap justify-center gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <SkillBubble
              key={category.id}
              category={category}
              index={index}
              isActive={false}
            />
          ))}
        </motion.div>
        
        {/* Instructions text */}
        <motion.p
          className="text-center text-muted-foreground mt-12 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          Hover over a bubble to explore skills in that category
        </motion.p>
      </div>
    </section>
  );
}