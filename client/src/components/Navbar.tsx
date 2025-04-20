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
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.div
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
        </div>
        
        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-4">
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
        
        {/* Theme Toggle Button - Right Aligned */}
        <motion.button
          onClick={toggleTheme}
          className="relative flex items-center justify-center rounded-full p-1 overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-border">
            <AnimatePresence mode="sync" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MoonStar className="h-4 w-4 text-indigo-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: 30, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -30, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4 text-amber-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
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
          
          {/* Theme Toggle Button (Mobile) */}
          <div className="flex items-center gap-3 py-2">
            <span>Theme:</span>
            <motion.button
              onClick={toggleTheme}
              className="relative flex items-center justify-center rounded-full p-1 overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center border border-border">
                <AnimatePresence mode="sync" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="moon-mobile"
                      initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoonStar className="h-4 w-4 text-indigo-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun-mobile"
                      initial={{ opacity: 0, rotate: 30, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -30, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4 text-amber-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="ml-2 text-sm">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
