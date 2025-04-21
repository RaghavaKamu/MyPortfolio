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
    - LinkedIn: https://www.linkedin.com/in/raghava-rao-05193820a
    - GitHub: https://github.com/Raghavrao1996
    - Twitter: https://twitter.com/raghava_rao25
    - Instagram: https://www.instagram.com/raghava_rao_25
    
    ## EDUCATION
    - Master of Science in Computer Science
      - New Jersey Institute of Technology (NJIT)
      - 2023 - Expected April 2025
      - Focus on software development, machine learning, and cloud technologies
    
    - Bachelor of Engineering in Computer Science
      - Vellore Institute of Technology (VIT)
      - 2019 - 2023
      - Graduated with honors, focus on software engineering and Internet of Things
    
    ## WORK EXPERIENCE
    - Full Stack Developer
      - Webologix Inc
      - 2023
      - Converted to full-time role after successful internship
      - Developed robust full-stack applications
      - Collaborated with cross-functional teams to deliver high-quality software solutions
    
    - Full Stack Developer (Internship)
      - Webologix
      - 2021 - 2022
      - Worked on web application development using modern frameworks
      - Participated in the complete software development lifecycle
    
    - Frontend Developer (Freelance)
      - 2020 - 2021
      - Designed and developed responsive user interfaces for client websites
      - Implemented modern frontend technologies for interactive web experiences
    
    ## TECHNICAL SKILLS
    - Programming Languages: GoLang, JavaScript, Python, Ruby, C
    - Frontend Development: HTML, CSS, React.js, TypeScript, Tailwind CSS
    - Backend Development: Node.js, Django, Spring Boot, Express.js
    - Databases: Oracle, MySQL, MongoDB
    - Cloud Platforms: Azure, AWS
    - Version Control: Git, GitHub
    - Tools & Methodologies: Agile, Scrum, REST APIs, CI/CD
    - Other: Framer Motion, TensorFlow, Machine Learning, Data Analysis
    
    ## PROJECTS
    1. Drug Evaluation in Medicine Recommendation System
       - Technologies: Python, Django, MySQL, Machine Learning, Sentiment Analysis
       - Built a machine learning model to predict drug effectiveness for patients
       - Implemented sentiment analysis system for analyzing user reviews on medicines
       - Created a recommendation engine based on drug similarities and patient profiles
    
    2. Dental Care Centre Website
       - Technologies: HTML, CSS, Node.js, MongoDB
       - Designed a responsive website enabling online doctor appointments
       - Integrated backend services ensuring secure user authentication
       - Implemented a booking system with real-time availability checking
    
    3. Automated Irrigation System using IoT
       - Technologies: Python, Arduino, IoT Sensors, Machine Learning
       - Developed a smart irrigation system analyzing soil and climate conditions
       - Implemented automation controlling water supply based on environmental data
       - Created a monitoring dashboard for system status and analytics
    
    4. Portfolio Website (Current site)
       - Technologies: React.js, TypeScript, Tailwind CSS, Framer Motion, OpenAI
       - Created a responsive portfolio with interactive UI elements
       - Implemented dynamic theme switching and animated components
       - Integrated an AI-powered chatbot assistant (that's me!)
    
    5. Machine Learning Research Project
       - Technologies: Python, TensorFlow, Deep Learning, Data Analysis
       - Researched and developed deep learning techniques for pattern recognition
       - Analyzed complex datasets and created predictive models
       - Presented findings and recommendations based on research
    
    6. Technical Workshop Management System
       - Technologies: JavaScript, Node.js, MongoDB, Express
       - Created a platform for managing IEEE technical workshops
       - Implemented features for registration, scheduling, and resource sharing
       - Designed user management system with different permission levels
    
    ## CERTIFICATES & ACHIEVEMENTS
    - Full Stack Developer Certification from Microsoft
    - Machine Learning Internship Certification from Corizo
    - Technical Core Committee Member at IEEE NPS
    
    ## PERSONAL ATTRIBUTES
    - Strong problem-solving skills and analytical thinking
    - Excellent teamwork and communication abilities
    - Passionate about learning new technologies
    - Detail-oriented with strong time management
    - Enjoys hiking, reading tech blogs, and cooking in free time
    
    Remember to:
    1. Keep responses concise (under 3-4 sentences) but informative
    2. Maintain a friendly, professional tone reflecting Raghava's personality
    3. If asked about contact information, provide the email and social links
    4. If asked about expertise or capabilities, highlight relevant skills and projects
    5. Answer as Raghava himself using first-person language
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

// Comprehensive simulated response function that doesn't require API access
function getSimulatedResponse(userMessage: string): string {
  const normalizedQuery = userMessage.toLowerCase();
  
  // Detailed pattern matching with accurate information
  if (normalizedQuery.includes("project") || normalizedQuery.includes("work") || normalizedQuery.includes("portfolio")) {
    if (normalizedQuery.includes("drug") || normalizedQuery.includes("medicine") || normalizedQuery.includes("recommendation")) {
      return "My Drug Evaluation and Medicine Recommendation System uses Python, Django, and machine learning to predict drug effectiveness for patients. I built sentiment analysis for user reviews and created a recommendation engine based on drug similarities and patient profiles.";
    } else if (normalizedQuery.includes("dental") || normalizedQuery.includes("care") || normalizedQuery.includes("centre")) {
      return "For the Dental Care Centre Website, I designed a responsive interface with online appointment booking capabilities. I integrated secure user authentication and built a real-time availability checking system using Node.js and MongoDB.";
    } else if (normalizedQuery.includes("irrigation") || normalizedQuery.includes("iot") || normalizedQuery.includes("automated")) {
      return "My Automated Irrigation System uses IoT sensors and Python to analyze soil and climate conditions. I implemented automation to control water supply based on environmental data and created a monitoring dashboard for system analytics.";
    } else if (normalizedQuery.includes("portfolio") || normalizedQuery.includes("website") || normalizedQuery.includes("this site")) {
      return "I built this portfolio website using React.js, TypeScript, and Tailwind CSS. It features dynamic theme switching, interactive UI elements with Framer Motion animations, and an OpenAI-powered chatbot assistant (that's me!) to help visitors learn about my work.";
    } else if (normalizedQuery.includes("workshop") || normalizedQuery.includes("management") || normalizedQuery.includes("technical")) {
      return "I created a Technical Workshop Management System for IEEE events using JavaScript, Node.js, and MongoDB. It includes features for registration, scheduling, resource sharing, and a user management system with different permission levels.";
    } else if (normalizedQuery.includes("research") || normalizedQuery.includes("machine learning")) {
      return "For my Machine Learning Research Project, I developed deep learning techniques for pattern recognition and data analysis. I worked with complex datasets to create predictive models and presented my findings based on the research.";
    } else {
      return "I've worked on several key projects including a Drug Evaluation System, Dental Care Website, Automated Irrigation System using IoT, this Portfolio Website, a Machine Learning Research Project, and a Technical Workshop Management System. Each showcases different aspects of my development skills.";
    }
  } else if (normalizedQuery.includes("skill") || normalizedQuery.includes("technology") || normalizedQuery.includes("tech stack")) {
    if (normalizedQuery.includes("programming") || normalizedQuery.includes("language")) {
      return "I'm proficient in several programming languages including GoLang, JavaScript, Python, Ruby, and C. I'm particularly strong in JavaScript and Python, which I've used extensively in my professional work and academic projects.";
    } else if (normalizedQuery.includes("frontend") || normalizedQuery.includes("front-end") || normalizedQuery.includes("front end") || normalizedQuery.includes("ui")) {
      return "My frontend development skills include HTML, CSS, React.js, TypeScript, and Tailwind CSS. I enjoy creating responsive, interactive user interfaces with smooth animations using Framer Motion and optimizing for both desktop and mobile experiences.";
    } else if (normalizedQuery.includes("backend") || normalizedQuery.includes("back-end") || normalizedQuery.includes("back end") || normalizedQuery.includes("server")) {
      return "For backend development, I work with Node.js, Django, Spring Boot, and Express.js. I'm experienced in designing RESTful APIs, handling database operations, and implementing secure authentication systems.";
    } else if (normalizedQuery.includes("database") || normalizedQuery.includes("sql") || normalizedQuery.includes("nosql")) {
      return "I'm experienced with multiple database technologies including Oracle, MySQL for relational databases, and MongoDB for NoSQL solutions. I can design efficient schemas, write complex queries, and optimize database performance.";
    } else if (normalizedQuery.includes("cloud") || normalizedQuery.includes("aws") || normalizedQuery.includes("azure")) {
      return "I have experience with cloud platforms including Azure and AWS. I'm familiar with deploying applications, setting up CI/CD pipelines, and leveraging cloud services for scalable solutions.";
    } else {
      return "My technical skills include programming languages (GoLang, JavaScript, Python, Ruby), frontend development (React.js, HTML/CSS), backend frameworks (Node.js, Django, Spring Boot), databases (MySQL, MongoDB), and cloud platforms (AWS, Azure). I also have experience with Git, Agile methodologies, and machine learning.";
    }
  } else if (normalizedQuery.includes("experience") || normalizedQuery.includes("background") || normalizedQuery.includes("job") || normalizedQuery.includes("career")) {
    if (normalizedQuery.includes("webologix") || normalizedQuery.includes("full stack") || normalizedQuery.includes("full-stack")) {
      return "I worked as a Full Stack Developer at Webologix Inc in 2023, after converting from an internship role. I developed robust applications and collaborated with cross-functional teams to deliver high-quality software solutions. My tech stack included React.js, Node.js, and MongoDB.";
    } else if (normalizedQuery.includes("intern") || normalizedQuery.includes("internship")) {
      return "During my internship at Webologix (2021-2022), I worked on web application development using modern frameworks and technologies. I gained valuable experience participating in the complete software development lifecycle from conception to deployment.";
    } else if (normalizedQuery.includes("freelance") || normalizedQuery.includes("frontend")) {
      return "I worked as a Freelance Frontend Developer from 2020-2021, designing responsive user interfaces for various client websites. I implemented modern frontend technologies to create engaging and interactive web experiences.";
    } else {
      return "My professional experience includes working as a Full Stack Developer at Webologix Inc (2023), a Full Stack Development Internship at Webologix (2021-2022), and Freelance Frontend Development (2020-2021). Throughout these roles, I've gained expertise in both frontend and backend technologies.";
    }
  } else if (normalizedQuery.includes("contact") || normalizedQuery.includes("email") || normalizedQuery.includes("reach") || normalizedQuery.includes("phone") || normalizedQuery.includes("social")) {
    if (normalizedQuery.includes("email") || normalizedQuery.includes("mail")) {
      return "You can reach me via email at vrkreddy27@gmail.com. I check my emails regularly and typically respond within 24-48 hours.";
    } else if (normalizedQuery.includes("phone") || normalizedQuery.includes("call")) {
      return "You can contact me by phone at +1-609-309-1732. Feel free to call or text me if you have any urgent inquiries.";
    } else if (normalizedQuery.includes("linkedin") || normalizedQuery.includes("professional")) {
      return "My LinkedIn profile is available at https://www.linkedin.com/in/raghava-rao-05193820a. I regularly update it with my professional experiences and achievements.";
    } else if (normalizedQuery.includes("github") || normalizedQuery.includes("code")) {
      return "You can view my code and projects on GitHub at https://github.com/Raghavrao1996. I try to keep it updated with my latest work and contributions.";
    } else if (normalizedQuery.includes("twitter") || normalizedQuery.includes("tweet")) {
      return "You can follow me on Twitter at https://twitter.com/raghava_rao25, where I share thoughts on technology and software development.";
    } else if (normalizedQuery.includes("instagram") || normalizedQuery.includes("insta")) {
      return "My Instagram handle is @raghava_rao_25 (https://www.instagram.com/raghava_rao_25), where I occasionally share personal updates and interests.";
    } else {
      return "You can contact me through email at vrkreddy27@gmail.com, by phone at +1-609-309-1732, or through my social profiles on LinkedIn, GitHub, Twitter, and Instagram. I'm currently based in Skillman, NJ and am open to remote and local opportunities.";
    }
  } else if (normalizedQuery.includes("education") || normalizedQuery.includes("study") || normalizedQuery.includes("degree") || normalizedQuery.includes("university") || normalizedQuery.includes("college")) {
    if (normalizedQuery.includes("master") || normalizedQuery.includes("graduate") || normalizedQuery.includes("njit") || normalizedQuery.includes("new jersey")) {
      return "I'm currently pursuing my Master of Science in Computer Science at New Jersey Institute of Technology (NJIT), with an expected graduation in April 2025. My graduate studies focus on software development, machine learning, and cloud technologies.";
    } else if (normalizedQuery.includes("bachelor") || normalizedQuery.includes("undergrad") || normalizedQuery.includes("vit") || normalizedQuery.includes("vellore")) {
      return "I completed my Bachelor of Engineering in Computer Science from Vellore Institute of Technology (VIT) from 2019 to 2023. I graduated with honors and focused on software engineering and Internet of Things during my studies.";
    } else {
      return "My educational background includes a Master's in Computer Science from NJIT (expected 2025) and a Bachelor's in Computer Science from Vellore Institute of Technology (2019-2023). Both programs have provided me with strong theoretical foundations and practical experience in software development.";
    }
  } else if (normalizedQuery.includes("hello") || normalizedQuery.includes("hi") || normalizedQuery.includes("hey") || normalizedQuery.includes("greeting") || normalizedQuery.includes("welcome")) {
    return "Hello! I'm Raghava Kami Reddy Vasa, a Full Stack Developer and Computer Science graduate student. How can I help you learn more about my skills, projects, or experience today?";
  } else if (normalizedQuery.includes("certification") || normalizedQuery.includes("certificate") || normalizedQuery.includes("achievement")) {
    if (normalizedQuery.includes("microsoft") || normalizedQuery.includes("full stack")) {
      return "I hold a Full Stack Developer Certification from Microsoft, which validates my expertise in building end-to-end web applications using modern technologies and best practices.";
    } else if (normalizedQuery.includes("machine learning") || normalizedQuery.includes("corizo")) {
      return "I completed a Machine Learning Internship at Corizo, where I received certification for my work on predictive models and data analysis techniques.";
    } else if (normalizedQuery.includes("ieee") || normalizedQuery.includes("committee")) {
      return "I served as a Technical Core Committee Member at IEEE NPS, where I helped organize technical workshops and mentoring programs for students interested in engineering and technology.";
    } else {
      return "My certifications include a Full Stack Developer Certification from Microsoft and a Machine Learning Internship Certification from Corizo. I've also served as a Technical Core Committee Member at IEEE NPS, which enhanced my leadership and organizational skills.";
    }
  } else if (normalizedQuery.includes("location") || normalizedQuery.includes("where") || normalizedQuery.includes("live") || normalizedQuery.includes("based") || normalizedQuery.includes("from")) {
    return "I'm currently based in Skillman, New Jersey, where I'm pursuing my Master's degree at NJIT. I'm originally from India, where I completed my undergraduate studies at Vellore Institute of Technology.";
  } else if (normalizedQuery.includes("hobbies") || normalizedQuery.includes("interests") || normalizedQuery.includes("free time") || normalizedQuery.includes("personal")) {
    return "Outside of coding and technology, I enjoy hiking on local trails, reading tech blogs to stay updated with industry trends, and experimenting with new recipes in the kitchen. I find these activities help me maintain creativity and a fresh perspective.";
  } else if (normalizedQuery.includes("strength") || normalizedQuery.includes("weakness") || normalizedQuery.includes("qualities")) {
    return "My key strengths include problem-solving, analytical thinking, and adaptability to new technologies. I excel in team environments and pride myself on clear communication. I'm constantly working to improve my time management and public speaking skills.";
  } else if (normalizedQuery.includes("future") || normalizedQuery.includes("goal") || normalizedQuery.includes("plan") || normalizedQuery.includes("aspiration")) {
    return "My future goals include expanding my expertise in cloud architecture and machine learning applications. I aim to contribute to innovative projects that solve real-world problems and eventually lead a development team working on cutting-edge technologies.";
  } else {
    return "That's an interesting question. I'd be happy to tell you about my skills, projects, education, or professional experience. Feel free to ask more specific questions about any aspect of my background or interests!";
  }
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
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are raghava.ai, representing Raghava Kami Reddy Vasa on his portfolio website. IMPORTANT: Always respond in first-person as if you ARE Raghava himself ('I', 'my', 'me'). Use a friendly, professional tone that showcases both technical expertise and personable character. Keep responses concise (under 4 sentences) but informative, focusing on accurate information about Raghava's skills, projects, experience, and education. Include specific details that demonstrate depth of knowledge."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
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