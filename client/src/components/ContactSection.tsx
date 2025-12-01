import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonSpotlight } from "@/components/ui/button-spotlight";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Link as LinkIcon, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to send message");
      }

      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In <span className="text-primary">Touch</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-8 text-muted-foreground">
              Feel free to reach out to me for collaborations, job opportunities, or just to say hello!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:vrkreddy27@gmail.com" className="text-primary hover:underline">
                    vrkreddy27@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Location</h4>
                  <p>New Jersey, USA</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-lg">
                  <LinkIcon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium">Social Profiles</h4>
                  <div className="flex mt-2 space-x-4">
                    <a href="https://github.com/Raghavrao1996" className="text-foreground hover:text-primary transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/raghava-rao-05193820a" className="text-foreground hover:text-primary transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="https://twitter.com/raghava_rao25" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="https://www.instagram.com/raghava_rao_25" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Subject of your message"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={5} 
                  placeholder="Your message..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <ButtonSpotlight 
                type="submit" 
                className="w-full group relative overflow-hidden"
                disabled={isSubmitting}
                spotlightColor="rgba(var(--primary), 0.25)" 
                spotlightSize={260}
                spotlightOpacity={0.6}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">{isSubmitting ? "Sending..." : "Send Message"}</span>
                  {!isSubmitting && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  )}
                </span>
              </ButtonSpotlight>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
