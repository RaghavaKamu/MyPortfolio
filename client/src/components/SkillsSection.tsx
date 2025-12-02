import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useAnimation, Variants } from "framer-motion";
import { 
  Code, Database, FileCode, Github, Server, Terminal, 
  TerminalSquare, Braces, Globe, Cloud, HardDrive, Network
} from "lucide-react";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";

// Skill categories with colors, icons, and skills
const skillCategories = [
  {
    id: "machinelearning",
    title: "Machine Learning",
    icon: <HardDrive className="h-8 w-8" />,
    color: "from-emerald-500 via-green-500 to-emerald-600",
    hoverColor: "group-hover:from-emerald-600 group-hover:via-green-500 group-hover:to-emerald-700",
    textColor: "text-emerald-50",
    glowColor: "rgba(16, 185, 129, 0.4)",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Fraud Detection Models",
      "Risk Scoring",
      "Credit Risk Analytics",
      "Customer Segmentation"
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    icon: <Braces className="h-8 w-8" />,
    color: "from-blue-600 via-indigo-500 to-blue-700",
    hoverColor: "group-hover:from-blue-700 group-hover:via-indigo-600 group-hover:to-blue-800",
    textColor: "text-blue-50",
    glowColor: "rgba(79, 70, 229, 0.4)",
    skills: [
      "GoLang", "JavaScript", "Python", "Ruby", "C", 
      "TypeScript", "Java"
    ]
  },
  {
    id: "frontend",
    title: "Web & API Development",
    icon: <Globe className="h-8 w-8" />,
    color: "from-violet-600 via-purple-500 to-violet-700",
    hoverColor: "group-hover:from-violet-700 group-hover:via-purple-600 group-hover:to-violet-800",
    textColor: "text-purple-50",
    glowColor: "rgba(139, 92, 246, 0.4)",
    skills: [
      "HTML",
      "CSS",
      "React.js",
      "Django / Django REST",
      "Flask / FastAPI",
      "GraphQL (Ariadne)",
      "Tailwind CSS"
    ],
  },
  {
    id: "database",
    title: "Databases",
    icon: <Database className="h-8 w-8" />,
    color: "from-rose-500 via-red-500 to-rose-600",
    hoverColor: "group-hover:from-rose-600 group-hover:via-red-600 group-hover:to-rose-700",
    textColor: "text-red-50",
    glowColor: "rgba(225, 29, 72, 0.4)",
    skills: [
      "Oracle", "MySQL", "MongoDB", "SQL", "NoSQL", 
      "PostgreSQL", "Firebase"
    ]
  },
  {
    id: "dataengineering",
    title: "Data Engineering & Streaming",
    icon: <Network className="h-8 w-8" />,
    color: "from-cyan-500 via-teal-500 to-cyan-600",
    hoverColor: "group-hover:from-cyan-600 group-hover:via-teal-600 group-hover:to-cyan-700",
    textColor: "text-teal-50",
    glowColor: "rgba(20, 184, 166, 0.4)",
    skills: [
      "Apache Kafka",
      "Spark Streaming",
      "Airflow / Prefect",
      "ETL Pipelines",
      "Real-time Transaction Systems",
      "Data Warehousing (Snowflake, Redshift)"
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: <Cloud className="h-8 w-8" />,
    color: "from-amber-500 via-orange-500 to-amber-600",
    hoverColor: "group-hover:from-amber-600 group-hover:via-orange-600 group-hover:to-amber-700",
    textColor: "text-orange-50",
    glowColor: "rgba(234, 88, 12, 0.4)",
    skills: [
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Git / GitHub",
      "Cloud Security & Compliance"
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: <FileCode className="h-8 w-8" />,
    color: "from-pink-500 via-pink-400 to-pink-600",
    hoverColor: "group-hover:from-pink-600 group-hover:via-pink-500 group-hover:to-pink-700",
    textColor: "text-pink-50",
    glowColor: "rgba(236, 72, 153, 0.4)",
    skills: [
      "Tableau",
      "Power BI",
      "VS Code",
      "Postman",
      "Prometheus / Grafana",
      "ELK Stack",
      "Jira",
      "Notion"
    ],
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

interface SkillBubbleProps {
  category: typeof skillCategories[0];
  index: number;
}

const SkillBubble = React.memo(function SkillBubble({ category, index }: SkillBubbleProps) {
  const bubbleControls = useAnimation();
  const bubbleRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [spotlightPosition, setSpotlightPosition] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    const animations = [
      { scale: [1, 1.05, 1], y: [0, -5, 0] },
      { y: [0, -15, 0], rotate: [0, -2, 0, 2, 0] },
      { y: [0, -8, 0], x: [0, 8, 0] },
      { x: [-10, 10, -10], rotate: [-1, 1, -1] },
      { y: [0, -5, 0, 5, 0], x: [0, 5, 0, -5, 0] },
      { rotate: [-3, 3, -3], y: [0, -3, 0] },
    ];
    const animation = animations[index % animations.length];
    bubbleControls.start({
      ...animation,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 5 + index * 0.8,
        ease: "easeInOut"
      }
    });
  }, [bubbleControls, index]);

  // Get the relative position for each skill in a circle
  const getSkillPosition = (index: number, total: number) => {
    const angle = (index * (360 / total)) * (Math.PI / 180);
    // Reduce the radius to ensure skills are closer to the bubble
    const radius = window.innerWidth < 768 ? 80 : 100;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <motion.div
      ref={bubbleRef}
      className={cn("relative flex flex-col items-center justify-center cursor-pointer group")}
      variants={bubbleVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      animate={bubbleControls}
      // Replace framer-motion hover events with standard React ones
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlightPosition({ x: 50, y: 50 });
      }}
      onMouseMove={(e) => {
        if (bubbleRef.current) {
          const rect = bubbleRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
          const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));
          setSpotlightPosition({ x: xPercent, y: yPercent });
        }
      }}
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
      
      {/* Main bubble */}
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
        
        {/* Default icon and title */}
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
      
      {/* Skills badges */}
      <div className="absolute" style={{ zIndex: 10, pointerEvents: "none", width: "400px", height: "400px" }}>
        <AnimatePresence>
          {isHovered && category.skills.map((skill, i) => {
            const pos = getSkillPosition(i, category.skills.length);
            return (
              <motion.div
                key={skill}
                className="absolute"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: pos.x, 
                  y: pos.y,
                  transition: { delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }
                }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                style={{ 
                  left: "50%", 
                  top: "50%", 
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "auto" 
                }}
              >
                <Badge 
                  className={cn(
                    "px-3 py-1 text-sm font-medium shadow-lg",
                    "bg-white/95 dark:bg-slate-900/95 border-2",
                    {
                      "border-indigo-500 text-indigo-600 dark:text-indigo-400": category.id === "languages",
                      "border-violet-500 text-violet-600 dark:text-violet-400": category.id === "frontend",
                      "border-amber-500 text-amber-600 dark:text-amber-400": category.id === "cloud",
                      "border-rose-500 text-rose-600 dark:text-rose-400": category.id === "database",
                      "border-cyan-500 text-cyan-600 dark:text-cyan-400": category.id === "networking",
                      "border-emerald-500 text-emerald-600 dark:text-emerald-400": category.id === "machinelearning",
                      "border-pink-500 text-pink-600 dark:text-pink-400": category.id === "tools",
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
    </motion.div>
  );
});

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
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
                top: index === 0 ? "40%" : index === 1 ? "8%" : index === 2 ? "40%" : index === 3 ? "72%" : index === 4 ? "40%" : index === 5 ? "25%" : "30%",
                left: index === 0 ? "50%" : index === 1 ? "50%" : index === 2 ? "85%" : index === 3 ? "50%" : index === 4 ? "15%" : index === 5 ? "70%" : "30%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SkillBubble
                category={category}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
