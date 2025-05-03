import React, { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { experiences } from "../data"; // Import the base experiences
import { 
  Download, Award, BuildingIcon, Users, Calendar, MapPin, 
  ChevronRight, ChevronLeft, ArrowRight 
} from "lucide-react";
// Import your resume directly
import resumePDF from "../assets/Resume.pdf";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ButtonSpotlight } from "./ui/button-spotlight";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "./ui/card";

// Lazy load ExperienceItem
const ExperienceItem = lazy(() => import("./ExperienceItem"));

// Define extendedExperiences locally instead of importing it
const extendedExperiences = experiences.map((exp, index) => {
  let location = "New Jersey, USA";
  
  // Assign locations based on the company or title
  if (exp.title === "Frontend Developer") {
    location = "Hyderabad, India";
  } else if (exp.title === "Full Stack Developer (Internship)" || exp.title === "Full Stack Developer") {
    location = "Bangalore, India";
  }
  
  return {
    ...exp,
    location,
    achievements: [
      "Led a team of 5 developers to deliver projects on time and under budget",
      "Increased application performance by 40% through optimization techniques",
      "Onboarded and mentored 3 junior developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%"
    ].slice(0, index + 2)
  };
});

export default function ExperienceSection() {
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [activeExperience, setActiveExperience] = useState(0);

  const toggleExpand = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  const nextExperience = () => {
    setActiveExperience((prev) => (prev + 1) % extendedExperiences.length);
  };

  const prevExperience = () => {
    setActiveExperience((prev) => (prev - 1 + extendedExperiences.length) % extendedExperiences.length);
  };

  return (
    <section id="experience" className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work <span className="text-primary">Experience</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My professional journey in the tech industry...
        </motion.p>

        <Suspense fallback={<div className="text-center">Loading experience...</div>}>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:w-1 before:h-full before:bg-gradient-to-b before:from-primary/80 before:via-primary/50 before:to-primary/10 md:ml-5">
            {extendedExperiences.map((experience, index) => (
              <ExperienceItem
                key={index}
                experience={experience}
                index={index}
                expandedExperience={expandedExperience}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        </Suspense>
        
        {/* Career Highlights and Experience Spotlight Cards */}
        <motion.div 
          className="mt-20 flex flex-col md:flex-row gap-8 items-stretch"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Career Highlights Card */}
          <Card className="md:w-1/3 flex flex-col bg-primary text-white shadow-lg border-none">
            <CardHeader>
              <CardTitle>Career Highlights</CardTitle>
              <CardDescription className="text-white/70">Key milestones from my professional journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">2+ Years</h4>
                  <p className="text-sm text-white/70">Professional Experience</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">10+ Projects</h4>
                  <p className="text-sm text-white/70">Successfully Delivered</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                  <BuildingIcon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">3 Companies</h4>
                  <p className="text-sm text-white/70">Industry Leaders</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <ButtonSpotlight 
                variant="outline" 
                className="border-primary/70 text-white hover:bg-white/10 hover:text-white w-full"
                spotlightColor="rgba(255,255,255,0.2)"
                spotlightSize={180}
                spotlightOpacity={0.3}
              >
                <a 
                  href={resumePDF}
                  download="Resume.pdf"
                  className="flex items-center w-full justify-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download Full Resume</span>
                </a>
              </ButtonSpotlight>
            </CardFooter>
          </Card>
          
          {/* Experience Spotlight Card */}
          <Card className="md:w-2/3 relative overflow-hidden border-primary/20">
            <CardHeader className="pb-1">
              <div className="flex justify-between items-center">
                <CardTitle>Experience Spotlight</CardTitle>
                <div className="flex space-x-2">
                  <ButtonSpotlight 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={prevExperience}
                    spotlightColor="rgba(var(--primary), 0.15)"
                    spotlightSize={60}
                    spotlightOpacity={0.3}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </ButtonSpotlight>
                  <ButtonSpotlight 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={nextExperience}
                    spotlightColor="rgba(var(--primary), 0.15)"
                    spotlightSize={60}
                    spotlightOpacity={0.3}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </ButtonSpotlight>
                </div>
              </div>
              <CardDescription>
                {activeExperience + 1} of {extendedExperiences.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <MotionConfig transition={{ duration: 0.7, type: "spring" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExperience}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="pt-1"
                  >
                    <h3 className="text-xl font-semibold">{extendedExperiences[activeExperience].title}</h3>
                    <div className="flex items-center text-primary mb-1">
                      <BuildingIcon className="h-4 w-4 mr-2" />
                      <h4 className="font-medium">{extendedExperiences[activeExperience].company}</h4>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      <span className="mr-3">{extendedExperiences[activeExperience].period}</span>
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      <span>{extendedExperiences[activeExperience].location}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {extendedExperiences[activeExperience].description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {extendedExperiences[activeExperience].skills.map((skill, i) => (
                        <Badge 
                          key={i} 
                          variant="outline"
                          className="bg-primary/5 hover:bg-primary/10 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <h5 className="text-sm font-semibold mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-2">
                      {extendedExperiences[activeExperience].achievements.map((achievement, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          <ArrowRight className="h-3.5 w-3.5 mr-2 mt-1 text-primary flex-shrink-0" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </MotionConfig>
            </CardContent>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-primary/5">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: `${(activeExperience / (extendedExperiences.length - 1)) * 100}%` }}
                animate={{ width: `${(activeExperience / (extendedExperiences.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}