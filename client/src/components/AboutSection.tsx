import { motion } from "framer-motion";
import { 
  GraduationCap, Award, Briefcase, 
  Calendar, MapPin, GripVertical
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import profileImg from "../assets/profile.jpg";

const education = [
  {
    degree: "Master of Science in Computer Science",
    institution: "New Jersey Institute of Technology",
    year: "2023 - 2025",
    location: "New Jersey, United States",
    description: "Master's degree in Computer Science with a focus on software development and machine learning."
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Vellore Institute of Technology",
    year: "2019 - 2023",
    location: "Vellore, India",
    description: "Graduated with honors. Focused on software engineering and Internet of Things."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-1"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <Briefcase className="h-5 w-5 text-primary" />
                </span>
                Get to know me
              </h3>
              <p className="mb-4 text-muted-foreground">
                I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer based in New Jersey, USA, currently pursuing my Master's in Computer Science at NJIT with an expected graduation in April 2025. With 3+ years of experience across banking, finance, retail, and e-commerce, I build secure, scalable backend services and intuitive user experiences using Python, Django REST Framework, FastAPI, and modern frontend stacks.
              </p>
              <p className="mb-4 text-muted-foreground">
                My professional journey includes working as a Python Developer at JPMorgan Chase in North America, where I build and deploy secure microservices for high-volume financial transactions, and as a Python Developer at HCL Tech in India, where I developed large-scale retail and e-commerce platforms. I have a strong foundation in backend engineering, data engineering, and API integrations, complemented by experience with fraud detection, real-time data streaming, and analytics dashboards.
              </p>
              <p className="mb-4 text-muted-foreground">
                I regularly work with technologies like PostgreSQL, MySQL, Cassandra, Apache Kafka, Airflow/Prefect, Pandas/NumPy, Scikit-learn, and cloud platforms such as AWS and Azure using Docker and Kubernetes. I'm always looking for opportunities to apply these skills to solve complex problems in financial services and data-intensive applications.
              </p>

              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center">
                  <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </span>
                  Current Work Experience
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Python Developer – JPMorgan Chase, NA</span>{" "}
                    · Real-time banking microservices, Kafka-based transaction streams, PostgreSQL, Airflow, Tableau.
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Python Developer – HCL Tech, India</span>{" "}
                    · Retail & e-commerce platforms using FastAPI/Flask, MySQL, Cassandra, Kafka, Prefect, Azure, Kubernetes.
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </span>
                Education
              </h3>
              
              <div className="space-y-6 relative pl-6">
                <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-border">
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-3 h-3 rounded-full bg-primary" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-primary" />
                </div>
                
                {education.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  >
                    <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="text-lg font-medium text-primary mb-1">{item.degree}</h4>
                        <p className="text-sm font-medium mb-1">{item.institution}</p>
                        <div className="flex items-center text-xs text-muted-foreground mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="mr-3">{item.year}</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{item.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="order-2 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={profileImg} 
                alt="Raghava Kami Reddy Vasa" 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Python Full Stack Developer</h3>
                <div className="flex space-x-2">
                  <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded">3+ Years Experience</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded">Finance & Retail Domains</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <h4 className="text-sm font-medium">Teamwork</h4>
                <span className="text-xs text-muted-foreground">90%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <motion.div 
                  className="bg-primary h-2.5 rounded-full" 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "90%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
              
              <div className="flex justify-between mb-2 mt-4">
                <h4 className="text-sm font-medium">Problem Solving</h4>
                <span className="text-xs text-muted-foreground">95%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <motion.div 
                  className="bg-primary h-2.5 rounded-full" 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "95%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
              
              <div className="flex justify-between mb-2 mt-4">
                <h4 className="text-sm font-medium">Time Management</h4>
                <span className="text-xs text-muted-foreground">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <motion.div 
                  className="bg-primary h-2.5 rounded-full" 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              
              <div className="flex justify-between mb-2 mt-4">
                <h4 className="text-sm font-medium">Communication</h4>
                <span className="text-xs text-muted-foreground">88%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <motion.div 
                  className="bg-primary h-2.5 rounded-full" 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "88%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
