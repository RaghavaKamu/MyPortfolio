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

// Simulated response function that doesn't require API access
function getSimulatedResponse(userMessage: string): string {
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
            content: "You are raghava.ai, a helpful assistant on Raghava's portfolio website. You answer questions about Raghava's skills, projects, and experience in a friendly, professional tone. Keep responses concise (under 3 sentences when possible) and focus on Raghava's professional attributes."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 250,
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