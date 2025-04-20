import { useState, useEffect } from "react";
import { useTheme } from "@/lib/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Menu, X, MoonStar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  // Set up observer for detecting active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md shadow-sm" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-center items-center relative">
        {/* Mobile Menu Button - Positioned Absolutely on the Right */}
        <motion.div
          className="absolute right-4 md:hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </motion.div>
        
        {/* Theme Toggle - Absolutely Positioned to Top Right */}
        <motion.div 
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <button 
            onClick={toggleTheme}
            className="relative h-10 w-10 rounded-full overflow-hidden flex items-center justify-center"
            aria-label="Toggle theme"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-300 dark:from-indigo-400 dark:to-indigo-600 opacity-20 rounded-full" />
            <motion.div 
              initial={false}
              animate={{ 
                rotate: theme === 'dark' ? 360 : 0,
                scale: theme === 'dark' ? [1, 1.2, 1] : [1, 0.8, 1],
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, y: 10, rotate: -30 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: -10, rotate: 30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MoonStar className="h-5 w-5 text-indigo-200" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, y: -10, rotate: 30 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: 10, rotate: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5 text-amber-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </button>
        </motion.div>
      
        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-4">
          {[
            { href: "#home", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#skills", label: "Skills" },
            { href: "#projects", label: "Projects" },
            { href: "#experience", label: "Experience" },
            { href: "#contact", label: "Contact" }
          ].map((item) => (
            <motion.a 
              key={item.href}
              href={item.href} 
              className={`nav-link font-medium relative px-2 py-1 overflow-hidden ${
                activeSection === item.href.slice(1) ? "text-primary font-semibold" : ""
              }`}
              whileHover="hover"
              variants={{
                hover: {
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              {item.label}
              {/* Active indicator */}
              {activeSection === item.href.slice(1) && (
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Hover effect indicator */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/70 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                variants={{
                  hover: {
                    scaleX: 1,
                    transition: { 
                      duration: 0.2,
                      ease: "easeOut"
                    }
                  }
                }}
              />
            </motion.a>
          ))}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div 
        className={`md:hidden bg-background shadow-lg overflow-hidden ${isMenuOpen ? "block" : "hidden"}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {[
            { href: "#home", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#skills", label: "Skills" },
            { href: "#projects", label: "Projects" },
            { href: "#experience", label: "Experience" },
            { href: "#contact", label: "Contact" }
          ].map((item, index) => (
            <motion.a 
              key={item.href}
              href={item.href} 
              className={`font-medium py-2 ${activeSection === item.href.slice(1) ? "text-primary font-semibold" : ""}`}
              onClick={() => setIsMenuOpen(false)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              {item.label}
            </motion.a>
          ))}
          
          {/* Theme Toggle Switch (Mobile) */}
          <div className="flex items-center py-2">
            <span className="mr-3">Theme:</span>
            <div className="flex items-center bg-background/80 p-1 px-2 rounded-full border border-border">
              <Sun className="h-4 w-4 text-amber-500 mr-1" />
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 text-slate-700 dark:text-slate-400 ml-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
