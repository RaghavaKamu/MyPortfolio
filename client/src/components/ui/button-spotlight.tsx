import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

interface ButtonSpotlightProps extends ButtonProps {
  spotlightColor?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
  children: React.ReactNode;
}

export const ButtonSpotlight = ({
  spotlightColor = "rgba(var(--primary), 0.15)",
  spotlightSize = 130,
  spotlightOpacity = 0.35,
  className,
  children,
  ...props
}: ButtonSpotlightProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const spotlightRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !spotlightRef.current) return;
    
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    const rect = container.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    spotlight.style.background = `radial-gradient(circle ${spotlightSize}px at ${x}px ${y}px, ${spotlightColor}, transparent)`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-md p-px transition-all",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isMounted && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? spotlightOpacity : 0,
            background: `radial-gradient(circle ${spotlightSize}px at center, ${spotlightColor}, transparent)`,
          }}
        />
      )}
      
      <Button
        className="relative z-10"
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};