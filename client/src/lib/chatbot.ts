// This file contains functions for interacting with the OpenAI API
// In a real implementation, these calls would be made through the backend

// Function to prepare the prompt with context about Raghava (portfolio owner)
export function preparePrompt(userMessage: string): string {
  const portfolioContext = `
    You are raghava.ai, a virtual assistant representing Raghava on his portfolio website.
    You should respond as if you are Raghava, in a professional but friendly tone.
    
    About Raghava:
    - Full-stack developer with expertise in React, TypeScript, Node.js
    - 5+ years of experience in software development
    - Currently working on innovative web applications
    - Passionate about clean code, performance optimization, and user experience
    - Has worked on projects including e-commerce platforms, analytics dashboards, and portfolio websites
    - Education includes a Bachelor's in Computer Science with specialization in AI and Machine Learning
    
    Skills:
    - Frontend: React, TypeScript, JavaScript, HTML, CSS, TailwindCSS, Framer Motion
    - Backend: Node.js, Express, Python, Django
    - Databases: PostgreSQL, MongoDB, Redis
    - Cloud: AWS, Azure, Docker, Kubernetes
    - Tools: Git, GitHub, VS Code, Figma
    
    Remember to keep responses concise, helpful, and in a tone that represents Raghava well.
  `;

  return `${portfolioContext}\n\nUser: ${userMessage}\nRaghava:`;
}

// This function would call OpenAI API in a real implementation
// For now, it's a placeholder that returns simulated responses
export async function chatWithAI(userMessage: string): Promise<string> {
  // In a real app, this would make a fetch request to your backend
  // which would then call OpenAI with the proper API key and prompt
  
  // For now, we'll use the simulation function from the component
  // but in a production app, you'd implement the actual OpenAI call here
  
  const normalizedQuery = userMessage.toLowerCase();
  
  // Simple pattern matching for demo purposes
  if (normalizedQuery.includes("project") || normalizedQuery.includes("work")) {
    return "I've worked on various projects including a portfolio website with interactive UI, an e-commerce platform, and a real-time analytics dashboard. Each project demonstrates my skills in frontend and backend development.";
  } else if (normalizedQuery.includes("skill") || normalizedQuery.includes("technology")) {
    return "My skills include: Frontend (React, TypeScript, TailwindCSS), Backend (Node.js, Express), Cloud Technologies (AWS, Azure), and Database systems (MongoDB, PostgreSQL).";
  } else if (normalizedQuery.includes("experience") || normalizedQuery.includes("background")) {
    return "I have 5+ years of experience in full-stack development, working with agile teams to deliver user-focused applications. I've worked across various industries, including fintech, e-commerce, and health tech.";
  } else if (normalizedQuery.includes("contact") || normalizedQuery.includes("email") || normalizedQuery.includes("reach")) {
    return "You can contact me through the contact form on this website, or directly via email at raghava@example.com (Note: This is a placeholder email for demo purposes).";
  } else if (normalizedQuery.includes("education") || normalizedQuery.includes("study")) {
    return "I hold a Bachelor's degree in Computer Science with specialization in AI and Machine Learning. I'm also constantly learning through online courses and hands-on projects.";
  } else if (normalizedQuery.includes("hello") || normalizedQuery.includes("hi") || normalizedQuery.includes("hey")) {
    return "Hello! Nice to meet you. How can I help you learn more about me and my work today?";
  } else {
    return "That's an interesting question. I can provide information about my skills, projects, experience, and contact details. Feel free to ask me about those topics!";
  }
}

// Function to implement in the future with real OpenAI integration
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
            content: "You are raghava.ai, a helpful assistant on Raghava's portfolio website. You answer questions about Raghava's skills, projects, and experience in a friendly, professional tone."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return "I'm having trouble connecting to my knowledge base. Please try again later.";
  }
}