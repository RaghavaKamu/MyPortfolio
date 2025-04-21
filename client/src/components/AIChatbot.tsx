import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal, X, Brain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonSpotlight } from "@/components/ui/button-spotlight";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { chatWithAI } from "@/lib/chatbot";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Use chatbot function from imported library

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Show typing indicator
    setIsBotTyping(true);

    try {
      // Simulate API delay for a more natural conversation flow
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

      // Get response from AI (using our chatbot library)
      const response = await chatWithAI(input);
      
      // Add AI response
      const aiMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <motion.button
                className="group h-14 w-14 overflow-hidden rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg relative"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 25px rgba(79, 70, 229, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
              >
                {/* Animated glowing backdrop */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-indigo-600/10" />
                
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/0 via-indigo-500/10 to-indigo-400/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                
                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-full animate-pulse opacity-50" 
                  style={{
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                  }}
                />
                
                {/* Brain icon with glow effect */}
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 transform">
                  <div className="absolute inset-0 bg-white/10 filter blur-md rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <Brain className="h-6 w-6 group-hover:text-white text-white/90 transition-colors duration-300" />
                </div>
                
                {/* Hover text indicator */}
                <motion.div 
                  className="absolute -top-10 bg-indigo-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-indigo-600/30 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-white whitespace-nowrap">Ask anything about Raghava</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-indigo-900 border-r border-b border-indigo-600/30"></div>
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[500px] bg-indigo-950 rounded-lg shadow-xl z-50 overflow-hidden border border-indigo-700/30"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-indigo-900/30 bg-gradient-to-r from-indigo-900/90 to-indigo-800/80 relative overflow-hidden">
              {/* Dynamic background pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute h-40 w-40 rounded-full bg-indigo-500/30 blur-3xl -top-20 -right-20" />
                <div className="absolute h-40 w-40 rounded-full bg-indigo-600/30 blur-3xl -bottom-20 -left-20" />
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500/80 to-indigo-600/70 flex items-center justify-center shadow-md">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Raghava's AI</h3>
                  <p className="text-xs text-indigo-200/70">Your virtual portfolio assistant</p>
                </div>
              </div>
              <button
                className="h-8 w-8 flex items-center justify-center rounded-full bg-indigo-700/50 hover:bg-indigo-600/60 text-white relative z-10 transition-colors"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="p-4 overflow-y-auto h-[calc(100%-130px)] custom-scrollbar bg-gradient-to-b from-indigo-950/50 to-indigo-950/70"
            >
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="flex items-center justify-center h-32 mt-12">
                    <div className="text-center max-w-[80%] text-indigo-300/50">
                      <Brain className="h-10 w-10 mx-auto mb-4 text-indigo-400/30" />
                      <p className="text-sm">Ask Raghava's AI about his skills, projects, or experience</p>
                    </div>
                  </div>
                )}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3 shadow-md",
                        message.role === "user"
                          ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border border-indigo-500/30"
                          : "bg-gradient-to-br from-indigo-900/80 to-indigo-800/70 text-indigo-100 border border-indigo-700/30"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div
                        className={cn(
                          "text-xs mt-1.5 flex items-center",
                          message.role === "user"
                            ? "text-indigo-200/80"
                            : "text-indigo-300/60"
                        )}
                      >
                        {message.role === "assistant" && (
                          <Brain className="h-3 w-3 mr-1 opacity-70" />
                        )}
                        {new Intl.DateTimeFormat('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(message.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-indigo-900/80 to-indigo-800/70 max-w-[80%] rounded-lg px-4 py-3 border border-indigo-700/30 shadow-md">
                      <div className="flex space-x-2 items-center h-5">
                        <Brain className="h-3.5 w-3.5 text-indigo-300/60 mr-1" />
                        <div className="flex space-x-1 items-center">
                          <div className="h-2 w-2 bg-indigo-400/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 bg-indigo-400/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 bg-indigo-400/60 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-indigo-900/20 flex gap-3 items-center bg-gradient-to-r from-indigo-950/80 to-indigo-900/70 backdrop-blur-sm relative"
            >
              {/* Subtle glow effect behind input */}
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute h-32 w-32 rounded-full bg-indigo-600/30 blur-3xl -top-16 left-1/2 transform -translate-x-1/2" />
              </div>
              
              <div className="relative flex-1 rounded-full overflow-hidden shadow-sm border border-indigo-600/30 group">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Raghava..."
                  className="rounded-full border-0 bg-indigo-900/70 text-white placeholder:text-indigo-200/70 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-800/50 to-indigo-600/30 rounded-full pointer-events-none"></div>
              </div>
              
              <ButtonSpotlight
                type="submit"
                size="icon"
                className="h-12 w-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-md relative overflow-hidden"
                disabled={isBotTyping || !input.trim()}
                spotlightColor="rgba(255, 255, 255, 0.2)"
                spotlightSize={120}
                spotlightOpacity={0.5}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-400/10 to-indigo-300/20 rounded-full"></div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="relative z-10 h-5 w-5 transform rotate-45"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </ButtonSpotlight>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}