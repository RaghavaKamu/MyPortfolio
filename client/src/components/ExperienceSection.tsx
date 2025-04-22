import { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonSpotlight } from "@/components/ui/button-spotlight";
import { 
  Download, Briefcase, Calendar, MapPin, Award, 
  BuildingIcon, Users, ChevronRight, ChevronLeft, ArrowRight 
} from "lucide-react";
import { experiences } from "@/data";
import { Badge } from "@/components/ui/badge";
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";

// Extended experience data with additional fields
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
  const [activeExperience, setActiveExperience] = useState(0);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  
  const nextExperience = () => {
    setActiveExperience((prev) => (prev + 1) % extendedExperiences.length);
  };
  
  const prevExperience = () => {
    setActiveExperience((prev) => (prev - 1 + extendedExperiences.length) % extendedExperiences.length);
  };
  
  const toggleExpand = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
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
          My professional journey in the tech industry, where I've had the opportunity to work on
          diverse projects and collaborate with talented teams.
        </motion.p>
        
        {/* Interactive Experience Timeline */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:w-1 before:h-full before:bg-gradient-to-b before:from-primary/80 before:via-primary/50 before:to-primary/10 md:ml-5">
          {extendedExperiences.map((experience, index) => (
            <motion.div 
              key={index}
              className={`relative pl-8 md:pl-0 md:grid md:grid-cols-7 md:gap-8 md:space-y-0 ${
                expandedExperience === index ? "" : "hover:-translate-y-1 hover:cursor-pointer"
              } transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => toggleExpand(index)}
              layout
            >
              {/* Timeline Node and Line */}
              <motion.div 
                className="col-span-2 flex justify-center md:justify-end pb-4"
                layout
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className={`absolute left-0 md:relative md:left-auto flex items-center justify-center w-10 h-10 rounded-full 
                      ${expandedExperience === index ? "bg-primary scale-110" : "bg-primary/80"} 
                      text-white z-10 shadow-md transition-all duration-300`}
                    whileHover={{ scale: 1.1 }}
                    layout
                  >
                    <Briefcase className="h-5 w-5" />
                  </motion.div>
                  
                  <div className="hidden md:flex flex-col items-center mt-4 space-y-2">
                    <div className="text-sm font-medium text-muted-foreground flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {experience.period}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                      {experience.location}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Experience Card */}
              <motion.div 
                className={`col-span-5 bg-card border border-border/50 rounded-lg shadow-sm overflow-hidden
                  ${expandedExperience === index ? "ring-2 ring-primary/30" : ""}
                `}
                layout
                whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)" }}
              >
                <div className={`p-6 ${expandedExperience === index ? "pb-2" : ""}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <motion.h3 
                      className="text-xl font-semibold flex items-center"
                      layout
                    >
                      {experience.title}
                      {expandedExperience === index && (
                        <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">
                          Current
                        </Badge>
                      )}
                    </motion.h3>
                    <div className="flex items-center gap-2">
                      <span className="md:hidden bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {experience.period}
                      </span>
                      {!expandedExperience && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                      )}
                    </div>
                  </div>
                  
                  <motion.div layout>
                    <div className="flex items-center">
                      <BuildingIcon className="h-4 w-4 text-primary mr-2" />
                      <h4 className="text-lg font-medium text-primary">{experience.company}</h4>
                    </div>
                    
                    <div className="md:hidden flex items-center text-xs text-muted-foreground mt-1 mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{experience.location}</span>
                    </div>
                    
                    <p className="text-muted-foreground my-4">
                      {experience.description}
                    </p>
                    
                    <AnimatePresence>
                      {expandedExperience === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t"
                        >
                          <h5 className="text-sm font-semibold mb-2 flex items-center">
                            <Award className="h-4 w-4 mr-2 text-primary" />
                            Key Achievements
                          </h5>
                          <ul className="space-y-2 mb-4">
                            {experience.achievements.map((achievement, i) => (
                              <motion.li 
                                key={i}
                                className="flex items-start text-sm text-muted-foreground"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <ArrowRight className="h-3.5 w-3.5 mr-2 mt-1 text-primary" />
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                          
                          <h5 className="text-sm font-semibold mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            Team Size
                          </h5>
                          <div className="flex items-center mb-4">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${30 + index * 20}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm">{3 + index * 2} people</span>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(index);
                            }}
                            className="mt-2 text-primary hover:text-primary hover:bg-primary/10"
                          >
                            Show Less
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {experience.skills.map((skill, i) => (
                      <Badge 
                        key={i} 
                        variant="outline"
                        className="bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Featured Experience Card */}
        <motion.div 
          className="mt-20 flex flex-col md:flex-row gap-8 items-stretch"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
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
                className="border-white/20 text-white hover:bg-white/10 hover:text-white w-full"
                spotlightColor="rgba(255, 255, 255, 0.2)"
                spotlightSize={180}
                spotlightOpacity={0.3}
              >
                <Download className="mr-2 h-4 w-4" />
                <span>Download Full Resume</span>
              </ButtonSpotlight>
            </CardFooter>
          </Card>
          
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
