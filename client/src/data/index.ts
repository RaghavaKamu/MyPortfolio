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

export const projects = [
  {
    title: "E-commerce Website",
    description: "A full-featured e-commerce platform with product catalog, user authentication, and payment processing.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "#",
    code: "#"
  },
  {
    title: "Task Management App",
    description: "A productivity application that helps users organize tasks, set deadlines, and track progress.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    technologies: ["React", "Firebase", "Redux", "Tailwind"],
    demo: "#",
    code: "#"
  },
  {
    title: "Blog Platform",
    description: "A modern blogging platform with rich text editing, comments, and user profiles.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
    technologies: ["Next.js", "GraphQL", "PostgreSQL", "Auth0"],
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
