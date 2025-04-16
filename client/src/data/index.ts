// Just store icon name identifiers that will be used to lookup icons in components
export type SkillIconType = 'file-code' | 'code' | 'terminal' | 'react' | 'server' | 'database' | 'github' | 'typescript' | 'express';

export const skills = [
  {
    name: "HTML5",
    icon: "file-code" 
  },
  {
    name: "CSS3",
    icon: "code"
  },
  {
    name: "JavaScript",
    icon: "terminal"
  },
  {
    name: "React",
    icon: "react"
  },
  {
    name: "Node.js",
    icon: "server"
  },
  {
    name: "MongoDB",
    icon: "database"
  },
  {
    name: "Git",
    icon: "github"
  },
  {
    name: "TypeScript",
    icon: "typescript"
  },
  {
    name: "Express",
    icon: "express"
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
    title: "E-commerce Website",
    description: "A full-featured e-commerce platform with product catalog, user authentication, and payment processing.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web Development",
    demo: "#",
    code: "#"
  },
  {
    title: "Task Management App",
    description: "A productivity application that helps users organize tasks, set deadlines, and track progress.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    technologies: ["React", "Firebase", "Redux", "Tailwind"],
    category: "Web Development",
    demo: "#",
    code: "#"
  },
  {
    title: "Blog Platform",
    description: "A modern blogging platform with rich text editing, comments, and user profiles.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "Auth0"],
    category: "Web Development",
    demo: "#",
    code: "#"
  },
  {
    title: "Image Recognition App",
    description: "An AI application that recognizes objects and faces in images using deep learning algorithms.",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask"],
    category: "Machine Learning",
    demo: "#",
    code: "#"
  },
  {
    title: "Smart Home Automation",
    description: "An IoT system that automates home devices like lights, thermostats, and security cameras.",
    image: "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["Raspberry Pi", "MQTT", "Node.js", "React"],
    category: "IoT",
    demo: "#",
    code: "#"
  },
  {
    title: "Sentiment Analysis Tool",
    description: "A machine learning model that analyzes text to determine sentiment and emotional tone.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["Python", "NLTK", "scikit-learn", "PyTorch"],
    category: "Machine Learning",
    demo: "#",
    code: "#"
  },
  {
    title: "Fitness Tracker App",
    description: "A mobile application that tracks workouts, nutrition, and health metrics.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    category: "Mobile App",
    demo: "#",
    code: "#"
  },
  {
    title: "Weather Station",
    description: "An IoT weather station that collects environmental data and provides forecasts.",
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    technologies: ["Arduino", "Sensors", "Python", "InfluxDB"],
    category: "IoT",
    demo: "#",
    code: "#"
  },
  {
    title: "Code Editor",
    description: "A lightweight code editor with syntax highlighting and plugin support.",
    image: "https://images.unsplash.com/photo-1542831371-32f555c86880?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["Electron", "TypeScript", "CodeMirror", "Node.js"],
    category: "Desktop App",
    demo: "#",
    code: "#"
  },
  {
    title: "Stock Market Analyzer",
    description: "A data analysis tool that visualizes stock market trends and predicts movement patterns.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
    category: "Data Analysis",
    demo: "#",
    code: "#"
  },
  {
    title: "Social Media Dashboard",
    description: "A comprehensive dashboard to manage and analyze social media accounts and campaigns.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    technologies: ["React", "D3.js", "Node.js", "Express"],
    category: "Web Development",
    demo: "#",
    code: "#"
  },
  {
    title: "AR Navigation App",
    description: "A mobile app that provides augmented reality navigation assistance in urban environments.",
    image: "https://images.unsplash.com/photo-1581263518406-31e6457229e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["ARKit", "Swift", "Core Location", "MapKit"],
    category: "Mobile App",
    demo: "#",
    code: "#"
  }
];

export const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    description: "Led frontend development for multiple web applications, mentored junior developers, and improved performance by 40%.",
    skills: ["React", "TypeScript", "GraphQL", "CI/CD"]
  },
  {
    title: "Full Stack Developer",
    company: "WebSolutions Ltd.",
    period: "2018 - 2021",
    description: "Developed and maintained web applications for various clients, implemented new features, and optimized database performance.",
    skills: ["JavaScript", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "Frontend Developer Intern",
    company: "StartupHQ",
    period: "2017 - 2018",
    description: "Assisted in developing user interfaces, fixed bugs, and contributed to project documentation.",
    skills: ["HTML", "CSS", "JavaScript", "jQuery"]
  }
];
