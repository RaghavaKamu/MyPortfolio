import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import InteractiveBackground from "./InteractiveBackground";

export default function Footer() {
  return (
    <footer className="bg-card py-8 relative">
      <InteractiveBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-2xl font-bold text-primary">Raghava Reddy</a>
          </div>
          
          <nav className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
            <a href="#home" className="hover:text-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-muted/20 text-center text-muted-foreground">
          <p>&copy; 2025 Raghava Reddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
