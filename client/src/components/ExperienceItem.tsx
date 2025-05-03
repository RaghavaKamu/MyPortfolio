import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Award,
  BuildingIcon,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface ExperienceItemProps {
  experience: {
    title: string;
    period: string;
    location: string;
    description: string;
    company: string;
    skills: string[];
    achievements: string[];
  };
  index: number;
  expandedExperience: number | null;
  toggleExpand: (index: number) => void;
}

const ExperienceItem = memo(function ExperienceItem({
  experience,
  index,
  expandedExperience,
  toggleExpand,
}: ExperienceItemProps) {
  return (
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
      <motion.div className="col-span-2 flex justify-center md:justify-end pb-4" layout>
        <div className="flex flex-col items-center">
          <motion.div
            className={`absolute left-0 md:relative md:left-auto flex items-center justify-center w-10 h-10 rounded-full ${
              expandedExperience === index ? "bg-primary scale-110" : "bg-primary/80"
            } text-white z-10 shadow-md transition-all duration-300`}
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
        className={`col-span-5 bg-card border border-border/50 rounded-lg shadow-sm overflow-hidden ${
          expandedExperience === index ? "ring-2 ring-primary/30" : ""
        }`}
        layout
      >
        <div className={`p-6 ${expandedExperience === index ? "pb-2" : ""}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
            <motion.h3 className="text-xl font-semibold flex items-center" layout>
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

            <p className="text-muted-foreground my-4">{experience.description}</p>

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
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <ArrowRight className="h-3.5 w-3.5 mr-2 mt-1 text-primary flex-shrink-0" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
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
  );
});

export default ExperienceItem;