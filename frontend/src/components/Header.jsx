import { motion } from 'framer-motion';

export const Header = () => (
  <motion.header
    className="relative z-10 text-center pt-16 pb-10 px-4"
    initial={{ opacity: 0, y: -24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* Eyebrow pill */}
    <motion.div
      className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
      style={{
        background: 'rgba(99,102,241,0.06)',
        border: '1px solid rgba(99,102,241,0.18)',
        backdropFilter: 'blur(12px)',
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.5 }}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-indigo-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="eyebrow-text text-indigo-400">
        Neural Personality Engine
      </span>
    </motion.div>

    {/* Hero title */}
    <h1 className="hero-title mb-5">
      <motion.span
        className="block text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Mind
      </motion.span>
      <motion.span
        className="block"
        style={{
          backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 35%, #c084fc 65%, #f472b6 100%)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradientShift 5s ease infinite',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Reader
      </motion.span>
    </h1>

    {/* Subtitle */}
    <motion.p
      className="text-[#7a7a9e] text-lg font-[400] max-w-sm mx-auto leading-relaxed"
      style={{ letterSpacing: '0.01em' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.7 }}
    >
      Share your thoughts. Our model decodes the patterns that reveal your personality type.
    </motion.p>

    {/* Decorative line */}
    <motion.div
      className="mt-8 mx-auto flex items-center gap-4 max-w-xs"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-indigo-500/30" />
      <span className="section-label text-indigo-500/40">v2.0</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-500/30" />
    </motion.div>
  </motion.header>
);
