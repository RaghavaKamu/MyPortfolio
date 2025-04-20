import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal, X, Brain, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      content: "👋 Hi there! I'm raghava.ai. Ask me anything about Raghava's skills, projects, or experience!",
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
                className="h-14 w-14 overflow-hidden rounded-full bg-gradient-to-r from-primary/90 to-primary/80 text-white flex items-center justify-center shadow-lg relative"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 20px rgba(var(--primary), 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
              >
                {/* Futuristic brain icon */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
                
                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-full animate-pulse opacity-50" 
                  style={{
                    background: "radial-gradient(circle, rgba(var(--primary), 0.3) 0%, transparent 70%)",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                  }}
                />
                
                {/* Sparkle effects */}
                <motion.div 
                  className="absolute top-1 right-2" 
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1, 0.8],
                    transition: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Sparkles className="h-3 w-3 text-white/80" />
                </motion.div>
                
                {/* Brain icon */}
                <div className="relative z-10">
                  <Brain className="h-6 w-6" />
                </div>
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
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">raghava.ai</h3>
                  <p className="text-xs text-muted-foreground">Your virtual portfolio assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="p-4 overflow-y-auto h-[calc(100%-128px)] custom-scrollbar"
            >
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={cn(
                          "text-xs mt-1",
                          message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}
                      >
                        {new Intl.DateTimeFormat('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted max-w-[80%] rounded-lg px-4 py-2">
                      <div className="flex space-x-1 items-center">
                        <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border flex gap-2 items-center bg-background/50"
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Raghava..."
                className="rounded-full"
              />
              <Button
                type="submit"
                size="icon"
                className="h-9 w-9 rounded-full"
                disabled={isBotTyping || !input.trim()}
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}