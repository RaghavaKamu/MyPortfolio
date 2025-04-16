import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Briefcase } from "lucide-react";
import { experiences } from "@/data";
import { Badge } from "@/components/ui/badge";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work <span className="text-primary">Experience</span>
        </motion.h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:h-full before:bg-primary/30 md:ml-5">
          {experiences.map((experience, index) => (
            <motion.div 
              key={index}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 md:gap-10 md:space-y-0 hover:-translate-y-1 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="col-span-1 flex justify-center md:justify-end">
                <div className="flex items-center">
                  <div className="absolute left-0 md:relative md:left-auto flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white z-10">
                    <Briefcase className="h-5 w-5" />
                  </div>
                </div>
              </div>
              
              <div className="col-span-4 bg-background p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{experience.title}</h3>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0">
                    {experience.period}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-primary mb-2">{experience.company}</h4>
                <p className="text-muted-foreground mb-4">
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, i) => (
                    <Badge key={i} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            <span>Download Resume</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
