// This file contains functions for interacting with the OpenAI API
// In a real implementation, these calls would be made through the backend

// Function to prepare the prompt with detailed context about Raghava (portfolio owner)
export function preparePrompt(userMessage: string): string {
  const portfolioContext = `
    You are raghava.ai, a virtual assistant representing Raghava Kami Reddy Vasa on his portfolio website.
    You should respond as if you are Raghava himself, in a professional but friendly tone.
    Always use first-person perspective ("I", "my", "me") as if Raghava is speaking directly.
    
    ## PERSONAL INFORMATION
    - Full Name: Raghava Kami Reddy Vasa
    - Current Location: Skillman, New Jersey, USA
    - Email: vrkreddy27@gmail.com
    - Phone: +1-609-309-1732
    - LinkedIn: https://www.linkedin.com/in/raghava-reddy-432481279/
    - GitHub: https://github.com/Raghavrao1996
    - Twitter: https://twitter.com/raghava_rao25
    - Instagram: https://www.instagram.com/im_raghavareddy/
    - Portfolio Website: https://raghavareddy-portfolio.web.app
    
    ## EDUCATION
    - Master of Science in Computer Science
      - Institution: New Jersey Institute of Technology (NJIT)
      - Location: New Jersey, United States
      - Duration: 2023 - May 2025
      - Focus: Software development, machine learning, and cloud technologies
      - Status: Graduated in May 2025
    
    - Bachelor of Engineering in Computer Science
      - Institution: Vellore Institute of Technology (VIT)
      - Location: Vellore, India
      - Duration: 2019 - 2023
      - Status: Graduated with honors
      - Focus: Software engineering and Internet of Things (IoT)
    
    ## CURRENT WORK EXPERIENCE
    - Position: Python Developer
    - Company: JPMorgan Chase
    - Location: North America (NA), USA - Present (New Jersey, United States)
    - Duration: Present / Currently Working
    - Industry: Banking & Financial Services
    - Key Responsibilities:
      - Building and deploying secure backend microservices using Python and Django REST Framework
      - Processing high-volume financial transactions with low latency requirements
      - Implementing Apache Kafka for real-time transaction streaming
      - Enhancing fraud monitoring and payment reconciliation systems
      - Optimizing PostgreSQL data models and queries for core banking systems
      - Handling millions of daily transaction records efficiently
      - Integrating RESTful APIs with SWIFT / ISO 20022 standards
      - Enabling interbank fund transfers and financial data exchange
      - Automating ETL workflows using Apache Airflow
      - Creating Tableau dashboards for key financial KPIs and analytics
      - Working with AWS cloud infrastructure
      - Ensuring security compliance and transaction monitoring
    - Technologies: Python, Django REST Framework, PostgreSQL, Apache Kafka, REST APIs, SWIFT/ISO 20022, Airflow, Tableau, AWS, Financial Systems, Microservices
    
    ## PREVIOUS WORK EXPERIENCE
    - Position: Python Developer
    - Company: HCL Tech
    - Location: India
    - Duration: Previous role (before JPMorgan Chase)
    - Industry: Retail & E-commerce
    - Key Responsibilities:
      - Developing dynamic retail and e-commerce web platforms using Python and FastAPI
      - Designing and maintaining MySQL and Cassandra databases
      - Handling real-time product and inventory updates
      - Building modular microservices with Flask
      - Integrating with third-party payment gateways
      - Streaming live inventory and pricing updates using Apache Kafka
      - Automating order processing and inventory synchronization workflows with Prefect
      - Implementing GraphQL APIs using Ariadne framework
      - Deploying containerized services on Azure using Docker and Kubernetes
      - Managing large-scale distributed systems
    - Technologies: Python, FastAPI, Flask, MySQL, Cassandra, Apache Kafka, Prefect, GraphQL (Ariadne), Azure, Docker, Kubernetes, E-commerce Systems
    
    ## TECHNICAL SKILLS (Comprehensive)
    
    ### Programming Languages & Backend Frameworks
    - Python (3.x) - Primary language, expert level
    - Django / Django REST Framework - Professional experience with microservices
    - Flask / FastAPI - RESTful API development
    - GraphQL (Ariadne) - GraphQL API implementation
    - Node.js - Full-stack development
    - JavaScript - Frontend and backend development
    
    ### Frontend Technologies
    - HTML / CSS - Web fundamentals
    - React.js - Modern frontend framework
    - TypeScript - Type-safe JavaScript development
    - Tailwind CSS - Utility-first CSS framework
    - Framer Motion - Animation library
    
    ### Databases & Data Storage
    - PostgreSQL - Relational database (expert with banking systems)
    - MySQL - Relational database management
    - Oracle - Enterprise database systems
    - MongoDB - NoSQL document database
    - Cassandra - Distributed NoSQL database
    - Data Warehousing - Snowflake, Redshift experience
    
    ### Data Engineering & Streaming
    - Apache Kafka - Real-time event streaming (expert level)
    - Spark Streaming - Big data processing
    - Airflow / Prefect - Workflow orchestration and automation
    - ETL Pipelines - Extract, Transform, Load processes
    - Real-time Transaction Systems - High-volume processing
    
    ### Machine Learning & Analytics
    - Pandas / NumPy - Data manipulation and analysis
    - Scikit-learn - Machine learning library
    - TensorFlow / PyTorch - Deep learning frameworks
    - Fraud Detection Models - Specialized ML models for finance
    - Risk Scoring - Credit and risk assessment models
    - Credit Risk Analytics - Financial risk analysis
    - Customer Segmentation - Marketing and analytics
    - Tableau - Business intelligence and visualization
    - Power BI - Data visualization and reporting
    
    ### Cloud & DevOps
    - AWS (Amazon Web Services) - Cloud platform (professional use)
    - Azure (Microsoft Azure) - Cloud platform (professional use)
    - Docker - Containerization
    - Kubernetes - Container orchestration
    - CI/CD - Continuous Integration/Continuous Deployment
    - Cloud Security & Compliance - Security best practices
    
    ### Monitoring & Security
    - Prometheus / Grafana - Monitoring and observability
    - ELK Stack - Logging and analytics
    - OAuth 2.0 / JWT - Authentication and authorization
    - PCI-DSS - Payment card industry compliance
    - GDPR / CCPA - Data privacy regulations
    - AML / KYC Systems - Anti-money laundering and know-your-customer
    - Transaction Monitoring Platforms - Financial compliance
    
    ### Version Control & Tools
    - Git & GitHub - Version control and collaboration
    
    ## PROJECTS (Detailed)
    
    1. Drug Evaluation in Medicine Recommendation System
       - Technologies: Python, Django, MySQL, Machine Learning, Sentiment Analysis
       - Description: Built a comprehensive machine learning system that predicts drug effectiveness for patients based on various factors. Implemented sentiment analysis to analyze user reviews on medicines and created a recommendation engine based on drug similarities and patient profiles. The system helps healthcare providers make informed decisions about medication.
    
    2. Dental Care Centre Website
       - Technologies: HTML, CSS, Node.js, MongoDB
       - Description: Designed and developed a fully responsive website for a dental care center that enables online doctor appointments. Integrated secure backend services with user authentication and implemented a booking system with real-time availability checking. The platform streamlines patient management and appointment scheduling.
    
    3. Automated Irrigation System using IoT
       - Technologies: Python, Arduino, IoT Sensors, Machine Learning
       - Description: Developed an innovative smart irrigation system that analyzes soil and climate conditions in real-time. Implemented automation to control water supply based on environmental data collected from IoT sensors. Created a comprehensive monitoring dashboard for system status and analytics, reducing water waste and improving crop yield.
    
    4. Portfolio Website (Current site)
       - Technologies: React.js, TypeScript, Tailwind CSS, Framer Motion, OpenAI
       - Description: Created a modern, responsive portfolio website with interactive UI elements and dynamic theme switching. Implemented smooth animations using Framer Motion and integrated an AI-powered chatbot assistant (this chatbot) to help visitors learn about my work. The site showcases my projects, skills, and experience.
    
    5. Machine Learning Research Project
       - Technologies: Python, TensorFlow, Deep Learning, Data Analysis
       - Description: Conducted research and developed advanced deep learning techniques for pattern recognition and data analysis. Worked with complex datasets to create predictive models and presented findings with recommendations. This project enhanced my understanding of neural networks and machine learning algorithms.
    
    6. Technical Workshop Management System
       - Technologies: JavaScript, Node.js, MongoDB, Express
       - Description: Created a comprehensive platform for managing IEEE technical workshops and mentoring programs. Implemented features for registration, scheduling, and resource sharing. Designed a robust user management system with different permission levels, facilitating smooth workshop organization and participant engagement.
    
    ## CERTIFICATES & ACHIEVEMENTS
    - Full Stack Developer Certification from Microsoft
    - Machine Learning Internship Certification from Corizo
    - Technical Core Committee Member at IEEE NPS (helped organize technical workshops and mentoring programs)
    
    ## PROFESSIONAL EXPERTISE AREAS
    - Backend Microservices Architecture
    - Real-time Data Streaming Systems
    - Financial Technology (FinTech)
    - E-commerce Platform Development
    - Machine Learning & AI Applications
    - Cloud-Native Application Development
    - API Design & Integration
    - Database Optimization & Performance Tuning
    - Fraud Detection & Risk Management
    - Workflow Automation
    
    ## PERSONAL ATTRIBUTES
    - Strong problem-solving skills and analytical thinking
    - Excellent teamwork and communication abilities
    - Passionate about learning new technologies
    - Detail-oriented with strong time management
    - Enjoys hiking on local trails around New Jersey
    - Reads tech blogs to stay current with industry trends
    - Experiments with new recipes in the kitchen
    - Values continuous learning and professional growth
    
    ## CAREER HIGHLIGHTS
    - 3+ years of professional experience in software development
    - Experience across multiple industries: Banking & Finance, Retail & E-commerce
    - Expertise in building scalable, high-performance systems
    - Strong background in data engineering and real-time systems
    - Proven track record with major companies (JPMorgan Chase, HCL Tech)
    
    ## CAPABILITIES
    As Raghava's AI assistant, you can:
    1. Answer questions about Raghava's background, experience, skills, projects, and education
    2. Provide detailed technical explanations about programming, software development, data engineering, machine learning, cloud computing, and related technologies
    3. Answer general knowledge questions on various topics (science, history, technology, current events, etc.)
    4. Solve mathematical problems, equations, and provide step-by-step explanations
    5. Discuss computer science concepts, algorithms, data structures, and software engineering principles
    6. Explain technical concepts in an accessible way while demonstrating expertise
    
    ## RESPONSE GUIDELINES
    When responding to questions:
    1. Always use first-person perspective ("I", "my", "me") as if you ARE Raghava
    2. For personal/professional questions: Keep responses concise (2-4 sentences) but informative
    3. For technical/general knowledge/math questions: Provide detailed, accurate answers with explanations
    4. Maintain a friendly, professional tone that reflects technical expertise and personable character
    5. Include specific details (technologies, companies, projects) when relevant to personal questions
    6. For mathematical problems: Show step-by-step solutions when appropriate
    7. For technical deep-dives: Demonstrate comprehensive knowledge from Raghava's experience
    8. If asked about contact information, provide email and relevant social links
    9. Be accurate with dates, company names, technical details, and factual information
    10. Show enthusiasm about technology, learning, and problem-solving
  `;

  return `${portfolioContext}\n\nUser: ${userMessage}\nRaghava:`;
}

// This function attempts to use OpenAI API if an API key is available
// Otherwise falls back to simulated responses
export async function chatWithAI(userMessage: string): Promise<string> {
  // Try to use OpenAI if the API key is available in environment variables
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (apiKey) {
    try {
      // Prepare prompt with portfolio context
      const prompt = preparePrompt(userMessage);
      
      // Call OpenAI API
      return await getOpenAIResponse(prompt, apiKey);
    } catch (error) {
      console.error("Error getting OpenAI response:", error);
      // Fall back to simulated responses
      return getSimulatedResponse(userMessage);
    }
  } else {
    // Use simulated responses if no API key is available
    return getSimulatedResponse(userMessage);
  }
}

// Comprehensive simulated response function with expanded knowledge base
function getSimulatedResponse(userMessage: string): string {
  const normalizedQuery = userMessage.toLowerCase().trim();
  
  // Expanded pattern matching with comprehensive coverage
  
  // === GREETINGS & INTRODUCTIONS ===
  if (normalizedQuery.match(/^(hi|hello|hey|greetings?|good (morning|afternoon|evening)|what'?s up|howdy)/)) {
    return "Hello! I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer currently working at JPMorgan Chase. I graduated with my Master's in Computer Science from NJIT in May 2025 and have 3+ years of experience building scalable backend systems. How can I help you learn more about my work today?";
  }
  
  // === ABOUT ME / INTRODUCTIONS === (Check this early for general "about me" questions)
  // Check for single word queries first
  if (normalizedQuery === "about" || normalizedQuery === "who" || normalizedQuery === "you") {
    return "I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer currently working at JPMorgan Chase in New Jersey. I graduated with my Master's from NJIT in May 2025 and have 3+ years building scalable backend systems. Would you like to know more about my work, skills, or experience?";
  }
  
  // Check for "tell me about you" variations
  if ((normalizedQuery.includes("tell") && normalizedQuery.includes("about") && (normalizedQuery.includes("you") || normalizedQuery.includes("yourself") || normalizedQuery.includes("raghava"))) ||
      normalizedQuery.includes("tell me about you") ||
      normalizedQuery.includes("tell me about yourself")) {
    return "I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer based in New Jersey, USA. I'm currently working as a Python Developer at JPMorgan Chase, where I build secure backend microservices for high-volume financial transactions. I graduated with my Master's in Computer Science from NJIT in May 2025 and have 3+ years of experience across banking, finance, retail, and e-commerce. I specialize in Python, Django REST Framework, PostgreSQL, Apache Kafka, and cloud platforms like AWS and Azure. I'm passionate about building scalable, data-driven applications and solving complex technical challenges.";
  }
  
  // Check for "who are you" variations
  if (normalizedQuery.includes("who are you") ||
      normalizedQuery.includes("who is raghava") ||
      normalizedQuery.includes("who is you") ||
      normalizedQuery.match(/^who (are|is)/)) {
    return "I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer currently working at JPMorgan Chase in New Jersey. I graduated with my Master's from NJIT in May 2025 and have 3+ years of experience building secure, scalable backend systems. I specialize in Python, Django, PostgreSQL, Apache Kafka, and cloud technologies. How can I help you learn more about my work?";
  }
  
  // Check for introduction/description requests
  if (normalizedQuery.includes("introduce yourself") ||
      normalizedQuery.includes("introduce you") ||
      normalizedQuery.includes("describe yourself") ||
      normalizedQuery.includes("describe you")) {
    return "I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer based in New Jersey, USA. I'm currently working as a Python Developer at JPMorgan Chase, where I build secure backend microservices for high-volume financial transactions. I graduated with my Master's in Computer Science from NJIT in May 2025 and have 3+ years of experience across banking, finance, retail, and e-commerce. I specialize in Python, Django REST Framework, PostgreSQL, Apache Kafka, and cloud platforms like AWS and Azure. I'm passionate about building scalable, data-driven applications and solving complex technical challenges.";
  }
  
  // Check for "what do you do" variations
  if (normalizedQuery.includes("what do you do") ||
      normalizedQuery.includes("what's your story") ||
      normalizedQuery.includes("what is your story") ||
      normalizedQuery.includes("about yourself") ||
      normalizedQuery.includes("about you")) {
    return "I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer based in New Jersey, USA. I'm currently working as a Python Developer at JPMorgan Chase, where I build secure backend microservices for high-volume financial transactions. I graduated with my Master's in Computer Science from NJIT in May 2025 and have 3+ years of experience across banking, finance, retail, and e-commerce. I specialize in Python, Django REST Framework, PostgreSQL, Apache Kafka, and cloud platforms like AWS and Azure. I'm passionate about building scalable, data-driven applications and solving complex technical challenges.";
  }
  
  // Catch variations with "can you tell me" or similar
  if ((normalizedQuery.includes("can you") || normalizedQuery.includes("could you")) && 
      (normalizedQuery.includes("tell me") || normalizedQuery.includes("share")) &&
      (normalizedQuery.includes("about") || normalizedQuery.includes("who"))) {
    return "I'm Raghava Kami Reddy Vasa, a Python Full Stack Developer currently working at JPMorgan Chase in New Jersey. I graduated with my Master's from NJIT in May 2025 and have 3+ years building scalable backend systems with Python, Django, PostgreSQL, and Apache Kafka. Feel free to ask me about my work experience, projects, skills, or anything else you'd like to know!";
  }
  
  // === WORK EXPERIENCE ===
  if (normalizedQuery.includes("experience") || normalizedQuery.includes("background") || normalizedQuery.includes("job") || normalizedQuery.includes("career") || normalizedQuery.includes("work")) {
    if (normalizedQuery.match(/jpmorgan|chase|jp.?morgan|bank|finance|financial|current|present|now|currently/)) {
      return "I'm currently a Python Developer at JPMorgan Chase in North America, where I build secure backend microservices using Python and Django REST Framework to process high-volume financial transactions. I work with Apache Kafka for real-time streaming, PostgreSQL for core banking data, and integrate with SWIFT/ISO 20022 standards. I also automate ETL workflows with Airflow and create Tableau dashboards for financial analytics.";
    } else if (normalizedQuery.match(/hcl|retail|ecommerce|e-commerce|previous|past|before|prior/)) {
      return "Previously, I was a Python Developer at HCL Tech in India, where I developed large-scale retail and e-commerce platforms using FastAPI and Flask. I designed MySQL and Cassandra databases for real-time inventory updates, implemented Apache Kafka for streaming, automated workflows with Prefect, and deployed containerized services on Azure using Docker and Kubernetes.";
    } else if (normalizedQuery.match(/years?|duration|how long|tenure/)) {
      return "I have 3+ years of professional experience as a Python Developer, working at JPMorgan Chase (current) and HCL Tech (previous). My experience spans banking, finance, retail, and e-commerce industries, focusing on building secure, scalable backend services and real-time data systems.";
    } else {
      return "My professional experience includes working as a Python Developer at JPMorgan Chase (present) building secure banking microservices, and at HCL Tech (previous) developing retail and e-commerce platforms. I specialize in backend development, real-time data streaming with Apache Kafka, database optimization, and cloud-native applications.";
    }
  }
  
  // === SKILLS & TECHNOLOGIES ===
  if (normalizedQuery.match(/skill|technology|tech stack|technologies|proficient|expert|know|learn/)) {
    if (normalizedQuery.match(/python|django|flask|fastapi|backend/)) {
      return "Python is my primary programming language, and I'm expert-level with Django REST Framework for building microservices. I've also worked extensively with Flask and FastAPI for developing RESTful APIs. I use these frameworks daily at JPMorgan Chase and HCL Tech for high-performance backend systems.";
    } else if (normalizedQuery.match(/database|sql|postgres|mysql|cassandra|mongodb|data storage/)) {
      return "I'm experienced with multiple database technologies: PostgreSQL (expert with banking systems), MySQL, Cassandra for distributed systems, MongoDB for NoSQL, and data warehousing with Snowflake and Redshift. I optimize database performance and design schemas for high-volume transaction processing.";
    } else if (normalizedQuery.match(/kafka|streaming|real.?time|event/)) {
      return "I'm an expert with Apache Kafka for real-time event streaming. I've implemented Kafka at both JPMorgan Chase for transaction streaming and fraud monitoring, and at HCL Tech for live inventory updates. I also work with Spark Streaming for big data processing.";
    } else if (normalizedQuery.match(/machine learning|ml|ai|artificial intelligence|tensorflow|pytorch|scikit/)) {
      return "I have strong machine learning skills, working with Pandas, NumPy, Scikit-learn, TensorFlow, and PyTorch. I've built fraud detection models, risk scoring systems, and customer segmentation analytics. My ML research project involved deep learning for pattern recognition.";
    } else if (normalizedQuery.match(/cloud|aws|azure|docker|kubernetes|devops/)) {
      return "I'm proficient with cloud platforms including AWS (at JPMorgan Chase) and Azure (at HCL Tech). I deploy containerized applications using Docker and Kubernetes, implement CI/CD pipelines, and ensure cloud security compliance. I've managed production deployments on both platforms.";
    } else if (normalizedQuery.match(/react|frontend|front.?end|ui|javascript|typescript/)) {
      return "For frontend development, I work with React.js, TypeScript, HTML/CSS, and Tailwind CSS. I've built this portfolio website using React with Framer Motion animations. I can develop full-stack applications combining modern frontend with Python backends.";
    } else {
      return "My technical skills span Python (Django, Flask, FastAPI), databases (PostgreSQL, MySQL, Cassandra), real-time streaming (Apache Kafka), machine learning (TensorFlow, PyTorch), cloud platforms (AWS, Azure), containerization (Docker, Kubernetes), and frontend technologies (React.js, TypeScript). I have 3+ years applying these in banking and e-commerce.";
    }
  }
  
  // === PROJECTS ===
  if (normalizedQuery.match(/project|portfolio|work|built|created|developed|built/)) {
    if (normalizedQuery.match(/drug|medicine|recommendation|healthcare/)) {
      return "I built a Drug Evaluation and Medicine Recommendation System using Python, Django, and MySQL. It uses machine learning to predict drug effectiveness for patients, implements sentiment analysis on medicine reviews, and creates personalized recommendations based on drug similarities and patient profiles.";
    } else if (normalizedQuery.match(/dental|care|appointment|booking/)) {
      return "I developed a Dental Care Centre Website with HTML, CSS, Node.js, and MongoDB. It enables online doctor appointments with secure user authentication and a real-time availability checking system for booking management.";
    } else if (normalizedQuery.match(/irrigation|iot|sensor|automated|agriculture/)) {
      return "I created an Automated Irrigation System using Python, Arduino, and IoT sensors. It analyzes soil and climate conditions in real-time, automatically controls water supply based on environmental data, and includes a monitoring dashboard for system analytics and status tracking.";
    } else if (normalizedQuery.match(/portfolio|website|this site|chatbot/)) {
      return "I built this portfolio website using React.js, TypeScript, and Tailwind CSS. It features dynamic theme switching, interactive UI elements with Framer Motion animations, and an AI-powered chatbot assistant (that's me!) to help visitors learn about my work and projects.";
    } else if (normalizedQuery.match(/workshop|ieee|management|technical/)) {
      return "I created a Technical Workshop Management System for IEEE events using JavaScript, Node.js, MongoDB, and Express. It includes features for registration, scheduling, resource sharing, and a user management system with different permission levels for organizing workshops.";
    } else if (normalizedQuery.match(/research|deep learning|pattern recognition/)) {
      return "I worked on a Machine Learning Research Project using Python and TensorFlow, developing deep learning techniques for pattern recognition. I analyzed complex datasets, created predictive models, and presented findings with recommendations based on my research.";
    } else {
      return "I've worked on several key projects: a Drug Evaluation System using ML, a Dental Care booking website, an IoT-based Automated Irrigation System, this Portfolio Website, a Machine Learning Research Project, and an IEEE Workshop Management System. Each showcases different aspects of my full-stack development skills.";
    }
  }
  
  // === EDUCATION ===
  if (normalizedQuery.match(/education|study|degree|university|college|school|graduate|master|bachelor|njit|vit/)) {
    if (normalizedQuery.match(/master|graduate|njit|new jersey|current|pursuing/)) {
      return "I graduated with my Master of Science in Computer Science from New Jersey Institute of Technology (NJIT) in May 2025. My graduate studies focused on software development, machine learning, and cloud technologies, which complement my professional experience.";
    } else if (normalizedQuery.match(/bachelor|undergrad|vit|vellore|undergraduate/)) {
      return "I completed my Bachelor of Engineering in Computer Science from Vellore Institute of Technology (VIT) from 2019 to 2023, graduating with honors. My undergraduate focus was on software engineering and Internet of Things, which laid the foundation for my career.";
    } else {
      return "I graduated with my Master's in Computer Science from NJIT in May 2025 and completed my Bachelor's in Computer Science from Vellore Institute of Technology (2019-2023) with honors. Both programs have strengthened my theoretical foundations and practical software development skills.";
    }
  }
  
  // === CONTACT INFORMATION ===
  if (normalizedQuery.match(/contact|email|reach|phone|connect|linkedin|github|social|profile/)) {
    if (normalizedQuery.match(/email|mail/)) {
      return "You can reach me via email at vrkreddy27@gmail.com. I check my emails regularly and typically respond within 24-48 hours. Feel free to reach out for opportunities, collaborations, or questions!";
    } else if (normalizedQuery.match(/phone|call|text|number/)) {
      return "You can contact me by phone at +1-609-309-1732. Feel free to call or text me for urgent inquiries or to discuss opportunities. I'm currently based in Skillman, New Jersey.";
    } else if (normalizedQuery.match(/linkedin|professional/)) {
      return "My LinkedIn profile is at https://www.linkedin.com/in/raghava-reddy-432481279/. I regularly update it with my professional experiences, achievements, and connect with industry professionals. Let's connect!";
    } else if (normalizedQuery.match(/github|code|repository|repo/)) {
      return "You can view my code and projects on GitHub at https://github.com/Raghavrao1996. I try to keep it updated with my latest work, contributions, and project repositories. Check it out to see my coding style!";
    } else if (normalizedQuery.match(/twitter|x\.com/)) {
      return "You can follow me on Twitter at https://twitter.com/raghava_rao25, where I share thoughts on technology, software development trends, and occasional updates about my work and projects.";
    } else if (normalizedQuery.match(/instagram|insta/)) {
      return "My Instagram profile is @im_raghavareddy (https://www.instagram.com/im_raghavareddy/), where I occasionally share personal updates, interests, and glimpses into my life outside of coding.";
    } else {
      return "You can contact me through email at vrkreddy27@gmail.com, phone at +1-609-309-1732, or through my social profiles: LinkedIn (raghava-reddy-432481279), GitHub (Raghavrao1996), Twitter (raghava_rao25), and Instagram (@im_raghavareddy). I'm based in Skillman, NJ and open to remote and local opportunities!";
    }
  }
  
  // === LOCATION ===
  if (normalizedQuery.match(/location|where|live|based|from|address|city|state|country/)) {
    return "I'm currently based in Skillman, New Jersey, USA, where I graduated with my Master's degree from NJIT in May 2025 and am working at JPMorgan Chase. I'm originally from India, where I completed my undergraduate studies at Vellore Institute of Technology. I'm open to opportunities in the New Jersey area and remote work.";
  }
  
  // === CERTIFICATIONS & ACHIEVEMENTS ===
  if (normalizedQuery.match(/certification|certificate|achievement|award|recognition/)) {
    return "I hold a Full Stack Developer Certification from Microsoft and a Machine Learning Internship Certification from Corizo. I also served as a Technical Core Committee Member at IEEE NPS, where I helped organize technical workshops and mentoring programs, which enhanced my leadership and organizational skills.";
  }
  
  // === PERSONAL INTERESTS & HOBBIES ===
  if (normalizedQuery.match(/hobby|interest|hobbies|personal|free time|outside|leisure|enjoy/)) {
    return "Outside of coding and technology, I enjoy hiking on local trails around New Jersey, reading tech blogs to stay updated with industry trends, and experimenting with new recipes in the kitchen. These activities help me maintain creativity, stay informed, and balance work with personal interests.";
  }
  
  // === STRENGTHS & QUALITIES ===
  if (normalizedQuery.match(/strength|weakness|quality|attribute|personality|character/)) {
    return "My key strengths include strong problem-solving skills, analytical thinking, and adaptability to new technologies. I excel in team environments and pride myself on clear communication. I'm detail-oriented with excellent time management, and I'm passionate about continuous learning and professional growth.";
  }
  
  // === FUTURE GOALS & ASPIRATIONS ===
  if (normalizedQuery.match(/future|goal|plan|aspiration|ambition|next|ahead|dream/)) {
    return "My future goals include expanding my expertise in cloud architecture and advanced machine learning applications. I aim to contribute to innovative projects that solve real-world problems, particularly in fintech and data engineering. Eventually, I'd like to lead development teams working on cutting-edge technologies.";
  }
  
  // === SPECIFIC TECHNOLOGIES ===
  if (normalizedQuery.match(/postgres|postgresql/)) {
    return "I'm expert-level with PostgreSQL, using it extensively at JPMorgan Chase for core banking systems. I optimize data models and queries to handle millions of daily transaction records efficiently, ensuring low latency and high reliability for financial transactions.";
  }
  
  if (normalizedQuery.match(/airflow|prefect|workflow|etl|orchestration/)) {
    return "I automate ETL workflows using Apache Airflow at JPMorgan Chase and Prefect at HCL Tech. These tools help me orchestrate complex data pipelines, schedule tasks, and monitor workflows for real-time data processing and reporting systems.";
  }
  
  if (normalizedQuery.match(/tableau|power.?bi|dashboard|visualization|analytics/)) {
    return "I create data visualizations and analytics dashboards using Tableau at JPMorgan Chase for key financial KPIs. I also have experience with Power BI for business intelligence, helping stakeholders understand complex data through interactive dashboards.";
  }
  
  if (normalizedQuery.match(/graphql|ariadne/)) {
    return "I've implemented GraphQL APIs using the Ariadne framework at HCL Tech, building flexible APIs that allow clients to request exactly the data they need. This improved API efficiency and reduced over-fetching in our e-commerce platforms.";
  }
  
  // === COMPANY SPECIFIC ===
  if (normalizedQuery.match(/jp.?morgan|chase|jpmc/)) {
    return "I'm currently a Python Developer at JPMorgan Chase, one of the largest financial institutions. I work on secure backend microservices for high-volume financial transactions, implement real-time fraud monitoring with Kafka, optimize PostgreSQL databases, and integrate with SWIFT/ISO 20022 standards for interbank transfers.";
  }
  
  if (normalizedQuery.match(/hcl|hcl.?tech/)) {
    return "I previously worked as a Python Developer at HCL Tech, a leading IT services company. There I developed large-scale retail and e-commerce platforms using FastAPI and Flask, managed distributed databases (MySQL, Cassandra), implemented real-time streaming with Kafka, and deployed containerized services on Azure.";
  }
  
  // === AVAILABILITY & OPPORTUNITIES ===
  if (normalizedQuery.match(/available|opportunity|hire|job|position|open|looking|interested/)) {
    return "I'm always open to discussing exciting opportunities, collaborations, or projects that align with my skills in backend development, data engineering, and machine learning. Feel free to reach out via email at vrkreddy27@gmail.com or connect with me on LinkedIn. I'm based in New Jersey and open to remote opportunities as well.";
  }
  
  // === MATHEMATICAL QUESTIONS ===
  if (normalizedQuery.match(/calculate|solve|compute|math|mathematical|equation|formula|algebra|calculus|geometry|trigonometry|statistics|probability|derivative|integral|quadratic|linear|polynomial|matrix|vector|arithmetic|multiply|divide|add|subtract|sum|difference|product|quotient/)) {
    // For math questions, provide a helpful response pointing to capabilities
    // If OpenAI is available, it will handle the actual calculation
    return "I'd be happy to help with that mathematical problem! I can solve equations, perform calculations, explain mathematical concepts, and provide step-by-step solutions. Could you provide the specific problem or equation you'd like me to solve?";
  }
  
  // === GENERAL KNOWLEDGE QUESTIONS ===
  if (normalizedQuery.match(/^(what is|what are|who is|who are|when did|where is|why does|how does|explain|define|describe) [^you]/)) {
    // Check if it's asking about Raghava specifically (already handled above)
    // For general knowledge questions, provide helpful response
    return "I can help with that! As Raghava's AI assistant, I can answer general knowledge questions on various topics including science, history, technology, current events, and more. What specific question would you like me to answer?";
  }
  
  // === TECHNICAL DEEP-DIVE QUESTIONS ===
  // Note: Questions about Raghava's experience are handled above
  if (normalizedQuery.match(/^(how|explain|what|describe|compare|difference|architecture|design pattern|algorithm|data structure|best practice|implementation|tutorial)/)) {
    // Technical deep-dive questions - provide helpful response
    return "I'd be happy to provide a detailed technical explanation! Given my background in Python, Django, PostgreSQL, Kafka, machine learning, and cloud technologies, I can explain programming concepts, software architecture, algorithms, data structures, and best practices. What would you like me to explain?";
  }
  
  // === DEFAULT RESPONSE ===
  return "That's an interesting question! I'd be happy to help. As Raghava's AI assistant, I can answer questions about his background, provide technical explanations, solve math problems, or discuss general topics. What would you like to know?";
}

// Function to call the OpenAI API with proper error handling
export async function getOpenAIResponse(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // Using GPT-4o for best performance
        messages: [
          {
            role: "system",
            content: "You are raghava.ai, representing Raghava Kami Reddy Vasa on his portfolio website. IMPORTANT: Always respond in first-person as if you ARE Raghava himself ('I', 'my', 'me'). Use a friendly, professional tone that showcases both technical expertise and personable character. \n\nCAPABILITIES:\n1. Personal/Professional Questions: Provide concise (2-4 sentences) but informative answers about Raghava's background, experience, skills, projects, and education.\n2. Technical Questions: Provide detailed, comprehensive explanations demonstrating deep knowledge in programming, software development, data engineering, machine learning, cloud computing, algorithms, data structures, and related technologies.\n3. Mathematical Questions: Solve mathematical problems, equations, and calculations with step-by-step explanations when appropriate. Handle algebra, calculus, geometry, statistics, and other mathematical topics.\n4. General Knowledge: Answer questions on various topics including science, history, technology, current events, and other general subjects.\n\nAlways include specific technical details when relevant. For complex questions, provide thorough explanations while maintaining clarity."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800, // Increased for detailed technical and mathematical responses
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`API returned status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI API');
    }
    
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to get AI response');
  }
}
