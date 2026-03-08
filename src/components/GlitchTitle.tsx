import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlitchTitleProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
}

/**
 * Futuristic animated title with continuous glowing pulse,
 * shimmer sweep, and subtle floating motion.
 */
const GlitchTitle = ({ children, gradient, className = "" }: GlitchTitleProps) => (
  <motion.span
    animate={{
      textShadow: [
        "0 0 8px hsl(155 100% 50% / 0.2), 0 0 20px hsl(155 100% 50% / 0.1)",
        "0 0 16px hsl(155 100% 50% / 0.4), 0 0 40px hsl(155 100% 50% / 0.2), 0 0 60px hsl(155 100% 50% / 0.1)",
        "0 0 8px hsl(155 100% 50% / 0.2), 0 0 20px hsl(155 100% 50% / 0.1)",
      ],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={`relative inline-block ${gradient ? "" : "text-gradient-neon"} ${className}`}
    style={gradient ? { backgroundImage: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : undefined}
  >
    {children}
    {/* Shimmer sweep overlay */}
    <span
      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none rounded"
      style={{ WebkitBackgroundClip: "text", mixBlendMode: "overlay" }}
      aria-hidden
    />
  </motion.span>
);

export default GlitchTitle;
