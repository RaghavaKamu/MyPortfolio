// Just store icon name identifiers that will be used to lookup icons in components
export type SkillIconType = 'file-code' | 'code' | 'terminal' | 'react' | 'server' | 'database' | 'github' | 'typescript' | 'express';

export const skills = [
  // Core backend & APIs
  { name: "Python", icon: "code" },
  { name: "Django REST Framework", icon: "server" },
  { name: "Flask / FastAPI", icon: "server" },
  { name: "GraphQL (Ariadne)", icon: "server" },

  // Data & streaming
  { name: "PostgreSQL", icon: "database" },
  { name: "MySQL", icon: "database" },
  { name: "Cassandra", icon: "database" },
  { name: "MongoDB", icon: "database" },
  { name: "Apache Kafka", icon: "terminal" },
  { name: "Airflow / Prefect", icon: "terminal" },

  // Machine learning & analytics
  { name: "Scikit-learn", icon: "code" },
  { name: "TensorFlow / PyTorch", icon: "code" },
  { name: "Pandas / NumPy", icon: "code" },
  { name: "Fraud Detection & Risk Scoring", icon: "terminal" },
  { name: "Tableau / Power BI", icon: "file-code" },

  // Cloud & DevOps
  { name: "AWS", icon: "server" },
  { name: "Azure", icon: "server" },
  { name: "Docker & Kubernetes", icon: "server" },
  { name: "CI/CD", icon: "terminal" },

  // Web fundamentals
  { name: "React.js", icon: "react" },
  { name: "HTML / CSS", icon: "file-code" },
  { name: "Git & GitHub", icon: "github" },
];

export type ProjectCategory = 'Web Development' | 'Machine Learning' | 'IoT' | 'Mobile App' | 'Desktop App' | 'Data Analysis';

export const projectCategories: ProjectCategory[] = [
  'Web Development',
  'Machine Learning',
  'IoT',
  'Mobile App',
  'Desktop App',
  'Data Analysis'
];
export const extendedExperiences = [
  {
    title: "Frontend Developer",
    company: "XYZ Inc.",
    period: "Jan 2023 – Present",
    location: "Remote",
    description: "Worked on improving UI/UX...",
    skills: ["React", "Tailwind", "TypeScript"],
    achievements: ["Increased conversion by 30%", "Led UI migration project"],
  },
  // add more items as needed
];
export const projects = [
  {
    title: "Rent A Car - Thesis Project",
    description: "Developed a comprehensive car rental management system as my Master's thesis project using Django framework and SQL databases. The system enables efficient car rental operations with features for vehicle management, customer bookings, rental transactions, and automated billing.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["Django", "Python", "SQL", "PostgreSQL", "HTML", "CSS", "JavaScript"],
    category: "Web Development",
    demo: "#",
    code: "#"
  },
  {
    title: "Drug Evaluation in Medicine Recommendation System",
    description: "Built a machine learning model that predicts drug effectiveness for patients and implemented a sentiment analysis system that analyzes user reviews on medicines.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["Python", "Django", "MySQL", "Machine Learning", "Sentiment Analysis"],
    category: "Machine Learning",
    demo: "#",
    code: "#"
  },
  {
    title: "Dental Care Centre Website",
    description: "Designed a responsive website that enables online doctor appointments and integrated backend services to ensure secure user authentication.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    technologies: ["HTML", "CSS", "Node.js", "MongoDB"],
    category: "Web Development",
    demo: "#",
    code: "#"
  },
  {
    title: "Automated Irrigation System using IoT",
    description: "Developed a smart irrigation system that analyzes soil and climate conditions, and implemented automation to control water supply based on environmental data.",
    image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["Python", "Arduino", "IoT Sensors", "Machine Learning"],
    category: "IoT",
    demo: "#",
    code: "#"
  },
  {
    title: "Portfolio Website",
    description: "Created a responsive portfolio website with interactive UI elements, dynamic theme switching, and an AI-powered chatbot assistant.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "OpenAI"],
    category: "Web Development",
    demo: "my-portfolio-bf0d5.web.app",
    code: "#"
  },
  {
    title: "Machine Learning Research Project",
    description: "Researched and developed deep learning techniques for pattern recognition and data analysis as part of the machine learning internship.",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["Python", "TensorFlow", "Deep Learning", "Data Analysis"],
    category: "Machine Learning",
    demo: "#",
    code: "#"
  },
  {
    title: "Technical Workshop Management System",
    description: "Created a platform for managing IEEE technical workshops and mentoring programs, with features for registration, scheduling, and resource sharing.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["JavaScript", "Node.js", "MongoDB", "Express"],
    category: "Web Development",
    demo: "#",
    code: "#"
  }
];

// Work experience removed - focusing on SQL Developer role
export const experiences: any[] = [];
