import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen pt-32 pb-16 flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-primary">John Doe</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-muted-foreground">
              Full Stack Developer
            </h2>
            <p className="text-lg mb-8 max-w-lg">
              I build exceptional digital experiences that make people's lives simpler through clean and intuitive design.
            </p>
            <div className="flex space-x-4">
              <Button asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>
            <div className="flex mt-8 space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="John Doe" 
                className="w-56 h-56 md:w-80 md:h-80 object-cover rounded-full relative z-10 border-4 border-background"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
