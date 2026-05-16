import { motion } from 'framer-motion';

export const Footer = () => (
  <motion.footer
    className="relative z-10 text-center py-10 px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.1, duration: 0.7 }}
  >
    <div className="flex items-center justify-center gap-3 text-[#222238] font-mono text-[11px] tracking-wide">
      <span>TF-IDF + LinearSVC</span>
      <span className="text-[#181828]">·</span>
      <span>FastAPI Backend</span>
      <span className="text-[#181828]">·</span>
      <span>16 Personality Types</span>
    </div>
    <p className="mt-1.5 text-[#181828] font-mono text-[11px]">
      React + Framer Motion
    </p>
  </motion.footer>
);
