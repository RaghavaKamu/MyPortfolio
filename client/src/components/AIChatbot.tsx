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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi there! I'm Raghava's AI assistant. Ask me anything about Raghava's skills, projects, or experience!",
      timestamp: new Date(),
    },
  ]);
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
      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <motion.button
                className="group h-14 w-14 overflow-hidden rounded-full bg-gradient-to-r from-primary/90 to-primary/80 text-white flex items-center justify-center shadow-lg relative"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 25px rgba(var(--primary), 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
              >
                {/* Animated glowing backdrop */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
                
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/10 to-primary/30 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                
                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-full animate-pulse opacity-50" 
                  style={{
                    background: "radial-gradient(circle, rgba(var(--primary), 0.4) 0%, transparent 70%)",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                  }}
                />
                
                {/* Orbital sparkle effects */}
                <div className="absolute inset-0 rounded-full">
                  <motion.div 
                    className="absolute h-2 w-2 rounded-full bg-white/80"
                    style={{ top: '15%', left: '15%' }}
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.8, 1.2, 0.8],
                      transition: { duration: 3, repeat: Infinity }
                    }}
                  />
                  <motion.div 
                    className="absolute h-1.5 w-1.5 rounded-full bg-white/70"
                    style={{ top: '70%', left: '25%' }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [0.7, 1.1, 0.7],
                      transition: { duration: 2.5, repeat: Infinity, delay: 0.5 }
                    }}
                  />
                  <motion.div 
                    className="absolute h-2 w-2 rounded-full bg-white/80"
                    style={{ top: '20%', right: '20%' }}
                    animate={{
                      opacity: [0.3, 0.9, 0.3],
                      scale: [0.7, 1.3, 0.7],
                      transition: { duration: 4, repeat: Infinity, delay: 1 }
                    }}
                  />
                </div>
                
                {/* Brain icon with glow effect */}
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 transform">
                  <div className="absolute inset-0 bg-white/10 filter blur-md rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <Brain className="h-6 w-6 group-hover:text-white text-white/90 transition-colors duration-300" />
                </div>
                
                {/* Hover text indicator */}
                <motion.div 
                  className="absolute -top-10 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-border/50 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-foreground whitespace-nowrap">Ask anything about Raghava</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-card border-r border-b border-border/50"></div>
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
            className="fixed bottom-5 right-5 w-[350px] md:w-[400px] h-[500px] bg-card rounded-lg shadow-xl z-50 overflow-hidden border border-border"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/15 to-primary/5 relative overflow-hidden">
              {/* Dynamic background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute h-40 w-40 rounded-full bg-primary/40 blur-3xl -top-20 -right-20" />
                <div className="absolute h-40 w-40 rounded-full bg-primary/40 blur-3xl -bottom-20 -left-20" />
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/70 to-primary/40 flex items-center justify-center shadow-md">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground/90">Raghava's AI</h3>
                  <p className="text-xs text-muted-foreground">Your virtual portfolio assistant</p>
                </div>
              </div>
              <ButtonSpotlight
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative z-10"
                onClick={toggleChat}
                spotlightColor="rgba(var(--primary), 0.15)"
                spotlightSize={80}
                spotlightOpacity={0.3}
              >
                <X className="h-4 w-4" />
              </ButtonSpotlight>
            </div>
            
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="p-4 overflow-y-auto h-[calc(100%-130px)] custom-scrollbar bg-gradient-to-b from-background/80 to-background"
            >
              <div className="space-y-4">
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
                        "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                          : "bg-gradient-to-br from-muted/90 to-muted border border-border/30"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div
                        className={cn(
                          "text-xs mt-1.5 flex items-center",
                          message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
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
                    <div className="bg-gradient-to-br from-muted/90 to-muted max-w-[80%] rounded-lg px-4 py-3 border border-border/30 shadow-sm">
                      <div className="flex space-x-2 items-center h-5">
                        <Brain className="h-3.5 w-3.5 text-foreground/40 mr-1" />
                        <div className="flex space-x-1 items-center">
                          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce"></div>
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
              className="p-4 border-t border-border flex gap-2 items-center bg-gradient-to-t from-background/60 to-background/30 backdrop-blur-sm relative"
            >
              {/* Subtle glow effect behind input */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute h-32 w-32 rounded-full bg-primary/30 blur-3xl -top-16 left-1/2 transform -translate-x-1/2" />
              </div>
              
              <div className="relative flex-1 rounded-full overflow-hidden shadow-sm border border-border/50 group backdrop-blur-sm">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Raghava..."
                  className="rounded-full border-0 bg-background/60 backdrop-blur-sm focus-visible:ring-0 focus-visible:ring-offset-0 group-hover:bg-background/80 transition-colors"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-primary/0 rounded-full pointer-events-none"></div>
              </div>
              
              <ButtonSpotlight
                type="submit"
                size="icon"
                className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-md relative overflow-hidden"
                disabled={isBotTyping || !input.trim()}
                spotlightColor="rgba(255, 255, 255, 0.1)"
                spotlightSize={120}
                spotlightOpacity={0.5}
              >
                {/* Inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-full"></div>
                <SendHorizontal className="h-4 w-4 relative z-10" />
              </ButtonSpotlight>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}