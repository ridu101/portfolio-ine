import { motion } from "framer-motion";
import { ReactNode } from "react";

const GlassCard = ({ children, className = "", hover = true }: { children: ReactNode; className?: string; hover?: boolean }) => (
  <motion.div
    whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
    transition={{ duration: 0.3 }}
    className={`glass-card-hover p-6 ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
