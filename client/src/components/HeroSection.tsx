import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonSpotlight } from "@/components/ui/button-spotlight";
import { Github, Linkedin, Twitter, Mail, ChevronDown } from "lucide-react";
import profilePic from "@assets/profile.jpg";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 dark:from-black/80 dark:to-black/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 mt-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            className="w-full md:w-1/2 text-white dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Hi, I'm <span className="text-primary">Raghava Reddy</span>
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-3xl font-medium mb-6 text-gray-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Full Stack Developer
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 max-w-lg text-gray-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Computer Science graduate with expertise in software development, machine learning, and web technologies.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <ButtonSpotlight 
                asChild 
                variant="default" 
                className="bg-primary hover:bg-primary/90 text-white"
                spotlightColor="rgba(var(--primary), 0.2)" 
                spotlightSize={180}
                spotlightOpacity={0.5}
              >
                <a href="#contact">Get in Touch</a>
              </ButtonSpotlight>
              <ButtonSpotlight 
                variant="outline" 
                asChild 
                className="border-white text-white hover:bg-white/10"
                spotlightColor="rgba(255, 255, 255, 0.15)" 
                spotlightSize={150}
                spotlightOpacity={0.35}
              >
                <a href="#projects">View Projects</a>
              </ButtonSpotlight>
            </motion.div>
            <motion.div 
              className="flex mt-8 space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/RaghavaKamu" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/raghava-reddy-432481279/" },
                { icon: Twitter, label: "Twitter", href: "https://x.com/RaghavaReddy27" },
                { icon: Mail, label: "Email", href: "mailto:vrkreddy27@gmail.com" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a 
                    key={item.label}
                    href={item.href} 
                    className="text-white hover:text-primary transition-all duration-300 transform hover:scale-125" 
                    aria-label={item.label}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"></div>
              <img 
                src={profilePic} 
                alt="Raghava Reddy" 
                className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full relative z-10 border-4 border-white/80"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
