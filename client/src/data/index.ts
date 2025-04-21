// Just store icon name identifiers that will be used to lookup icons in components
export type SkillIconType = 'file-code' | 'code' | 'terminal' | 'react' | 'server' | 'database' | 'github' | 'typescript' | 'express';

export const skills = [
  {
    name: "GoLang",
    icon: "terminal" 
  },
  {
    name: "JavaScript",
    icon: "file-code"
  },
  {
    name: "Python",
    icon: "code"
  },
  {
    name: "Ruby",
    icon: "file-code"
  },
  {
    name: "React.js",
    icon: "react"
  },
  {
    name: "Django",
    icon: "server"
  },
  {
    name: "Spring Boot",
    icon: "server"
  },
  {
    name: "Azure",
    icon: "server"
  },
  {
    name: "AWS",
    icon: "server"
  },
  {
    name: "Git",
    icon: "github"
  },
  {
    name: "Oracle",
    icon: "database"
  },
  {
    name: "MySQL",
    icon: "database"
  },
  {
    name: "MongoDB",
    icon: "database"
  },
  {
    name: "HTML",
    icon: "file-code"
  },
  {
    name: "CSS",
    icon: "code"
  }
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

export const projects = [
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

export const experiences = [
  {
    title: "Graduate Student",
    company: "New Jersey Institute of Technology",
    period: "2023 - Expected 2025",
    description: "Pursuing a Master of Science in Computer Science with focus on software development, machine learning, and cloud technologies.",
    skills: ["GoLang", "Python", "Machine Learning", "Cloud Computing"]
  },
  {
    title: "Full Stack Developer",
    company: "Webologix Inc",
    period: "2023",
    description: "Converted to a full-time role after successful internship. Developed robust full-stack applications and collaborated with cross-functional teams to deliver high-quality software solutions.",
    skills: ["React.js", "Node.js", "MongoDB", "JavaScript", "Full Stack Development"]
  },
  {
    title: "Full Stack Developer (Internship)",
    company: "Webologix",
    period: "2021 - 2022",
    description: "Worked on web application development projects utilizing modern frameworks and technologies. Participated in the complete software development lifecycle from conception to deployment.",
    skills: ["JavaScript", "Web Development", "Frontend", "Backend", "MongoDB"]
  },
  {
    title: "Frontend Developer",
    company: "Freelance",
    period: "2020 - 2021",
    description: "Designed and developed responsive user interfaces for various client websites. Implemented modern frontend technologies to create engaging and interactive web experiences.",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "UI/UX Design"]
  }
];
