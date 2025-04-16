import { motion } from "framer-motion";
import { Code, Database, FileCode, Github, Server, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define skill categories based on the screenshot provided
const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Ruby", "GoLang"]
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "React.js", "Django", "Spring Boot"]
  },
  {
    title: "Frameworks",
    skills: ["React.js", "Django", "Spring Boot"]
  },
  {
    title: "Cloud Tools",
    skills: ["Azure", "AWS", "Git", "GitHub"]
  },
  {
    title: "Databases",
    skills: ["Oracle", "MySQL"]
  },
  {
    title: "Networking",
    skills: ["Cisco Technologies"]
  }
];

export default function SkillsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <motion.div 
              key={category.title}
              className="bg-card p-6 rounded-lg shadow-sm border border-border"
              variants={item}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
            >
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}