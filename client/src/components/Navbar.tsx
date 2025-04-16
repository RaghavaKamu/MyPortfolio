import { useState, useEffect } from "react";
import { useTheme } from "@/lib/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to detect when to add backdrop
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md shadow-sm" : ""
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold font-sans text-primary">Portfolio</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="nav-link font-medium transition-colors hover:text-primary active">Home</a>
          <a href="#about" className="nav-link font-medium transition-colors hover:text-primary">About</a>
          <a href="#projects" className="nav-link font-medium transition-colors hover:text-primary">Projects</a>
          <a href="#experience" className="nav-link font-medium transition-colors hover:text-primary">Experience</a>
          <a href="#contact" className="nav-link font-medium transition-colors hover:text-primary">Contact</a>
          
          {/* Theme Toggle Button */}
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="rounded-full bg-card"
          >
            {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-background shadow-lg transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#home" className="font-medium py-2 transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#about" className="font-medium py-2 transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#projects" className="font-medium py-2 transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Projects</a>
          <a href="#experience" className="font-medium py-2 transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Experience</a>
          <a href="#contact" className="font-medium py-2 transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</a>
          
          {/* Theme Toggle Button (Mobile) */}
          <div className="flex items-center">
            <span className="mr-3">Theme:</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="rounded-full bg-card"
            >
              {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
