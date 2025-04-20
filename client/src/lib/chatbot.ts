// This file contains functions for interacting with the OpenAI API
// In a real implementation, these calls would be made through the backend

// Function to prepare the prompt with context about Raghava (portfolio owner)
export function preparePrompt(userMessage: string): string {
  const portfolioContext = `
    You are raghava.ai, a virtual assistant representing Raghava Kami Reddy Vasa on his portfolio website.
    You should respond as if you are Raghava, in a professional but friendly tone.
    
    About Raghava:
    - Computer Science graduate student at New Jersey Institute of Technology (expected graduation April 2025)
    - Bachelor's in Computer Science from Vellore Institute of Technology (2019-2023)
    - Experience as a Machine Learning Intern at CORIZO and Technical Core Committee Member at IEEE NPS
    - Passionate about software development, machine learning, and web technologies
    - Currently living in Skillman, NJ
    - Contact: vrkreddy27@gmail.com, +1-609-309-1732
    
    Skills:
    - Programming Languages: GoLang, C, JavaScript, Ruby, Python
    - Web Development: HTML, CSS, React.js, Django, Spring Boot
    - Frameworks & Libraries: React.js, Django, Spring Boot
    - Cloud Tools: Azure, AWS, Git, GitHub
    - Databases: Oracle, MySQL, MongoDB
    - Networking: Cisco Technologies
    
    Projects:
    1. Drug Evaluation in Medicine Recommendation System (Python, Django, MySQL, Machine Learning)
       - Built a machine learning model to predict drug effectiveness for patients
       - Implemented sentiment analysis system for analyzing user reviews on medicines
    
    2. Dental Care Centre Website (HTML, CSS, Node.js, MongoDB)
       - Designed a responsive website enabling online doctor appointments
       - Integrated backend services ensuring secure user authentication
    
    3. Automated Irrigation System using IoT (Python, Arduino, IoT Sensors)
       - Developed a smart irrigation system analyzing soil and climate conditions
       - Implemented automation controlling water supply based on environmental data
    
    Certifications:
    - Full Stack Developer Certification: Microsoft
    - Machine Learning Internship: Corizo
    
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
    return "I've worked on projects including a Drug Evaluation in Medicine Recommendation System (using Python and ML), a Dental Care Centre Website, and an Automated Irrigation System using IoT. Each project demonstrates my skills in software development, machine learning, and web technologies.";
  } else if (normalizedQuery.includes("skill") || normalizedQuery.includes("technology")) {
    return "My skills include: Programming Languages (GoLang, JavaScript, Python, Ruby), Web Development (HTML, CSS, React.js, Django, Spring Boot), Cloud Tools (Azure, AWS), and Databases (Oracle, MySQL, MongoDB).";
  } else if (normalizedQuery.includes("experience") || normalizedQuery.includes("background")) {
    return "I'm currently a Computer Science graduate student at NJIT (expected graduation April 2025). I've worked as a Machine Learning Intern at CORIZO and served as a Technical Core Committee Member at IEEE NPS.";
  } else if (normalizedQuery.includes("contact") || normalizedQuery.includes("email") || normalizedQuery.includes("reach")) {
    return "You can contact me through the contact form on this website, or directly via email at vrkreddy27@gmail.com or by phone at +1-609-309-1732. I'm currently based in Skillman, NJ.";
  } else if (normalizedQuery.includes("education") || normalizedQuery.includes("study")) {
    return "I'm pursuing my Master's in Computer Science at New Jersey Institute of Technology (expected April 2025) after completing my Bachelor's in Computer Science from Vellore Institute of Technology (2019-2023).";
  } else if (normalizedQuery.includes("hello") || normalizedQuery.includes("hi") || normalizedQuery.includes("hey")) {
    return "Hello! Nice to meet you. I'm Raghava Kami Reddy Vasa. How can I help you learn more about my skills, projects, or experience today?";
  } else if (normalizedQuery.includes("certification") || normalizedQuery.includes("certificate")) {
    return "I have a Full Stack Developer Certification from Microsoft and completed a Machine Learning Internship at Corizo.";
  } else if (normalizedQuery.includes("location") || normalizedQuery.includes("where") || normalizedQuery.includes("live")) {
    return "I'm currently based in Skillman, New Jersey, where I'm pursuing my Master's degree at NJIT.";
  } else {
    return "That's an interesting question. I can provide information about my skills, projects, experience, and education. Feel free to ask me about those topics!";
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