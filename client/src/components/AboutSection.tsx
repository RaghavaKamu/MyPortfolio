import { motion } from "framer-motion";
import { skills } from "@/data";
import { 
  Code, Database, FileCode, Github, Server, 
  Terminal, Braces, File, Heading3
} from "lucide-react";

export default function AboutSection() {
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

  // Render the appropriate icon based on the name
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case 'file-code':
        return <FileCode className="h-8 w-8 text-primary" />;
      case 'code':
        return <Code className="h-8 w-8 text-primary" />;
      case 'terminal':
        return <Terminal className="h-8 w-8 text-primary" />;
      case 'react':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
        );
      case 'server':
        return <Server className="h-8 w-8 text-primary" />;
      case 'database':
        return <Database className="h-8 w-8 text-primary" />;
      case 'github':
        return <Github className="h-8 w-8 text-primary" />;
      case 'typescript':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
        );
      case 'express':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <path d="M18 6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"></path>
          </svg>
        );
      default:
        return <Braces className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Get to know me</h3>
            <p className="mb-4">
              I'm a passionate Full Stack Developer with expertise in building exceptional digital experiences. With a background in computer science and 5+ years of industry experience, I specialize in creating responsive, user-friendly applications.
            </p>
            <p className="mb-4">
              My approach combines technical expertise with creative problem-solving to deliver solutions that not only meet but exceed client expectations. I enjoy working on challenging projects that push my abilities and allow me to learn new technologies.
            </p>
            <p>
              When I'm not coding, you can find me exploring hiking trails, reading tech blogs, or experimenting with new recipes in the kitchen.
            </p>
          </motion.div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {skills.map((skill) => (
                <motion.div 
                  key={skill.name}
                  className="bg-background p-4 rounded-lg shadow-sm flex flex-col items-center text-center"
                  variants={item}
                >
                  {renderIcon(skill.icon)}
                  <span className="font-medium mt-2">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
