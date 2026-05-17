import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const WAKE_UP_MESSAGES = [
  { text: "Model is waking up…", icon: "😴" },
  { text: "The AI just opened one eye…", icon: "👁️" },
  { text: "Brushing neural teeth…", icon: "🪥" },
  { text: "Feeding the model coffee…", icon: "☕" },
  { text: "Stretching brain cells…", icon: "🧠" },
  { text: "Scanning existential thoughts…", icon: "🌌" },
  { text: "Booting consciousness matrix…", icon: "⚡" },
  { text: "Loading personality subroutines…", icon: "⚙️" },
  { text: "Syncing neural pathways…", icon: "🔗" },
];

export const BackendStatus = ({ status }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate messages while sleeping
  useEffect(() => {
    if (status !== 'sleeping') return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % WAKE_UP_MESSAGES.length);
    }, 1800); // Change message every 1.8s

    return () => clearInterval(interval);
  }, [status]);

  // Reset message when backend wakes up
  useEffect(() => {
    if (status === 'awake') {
      setMessageIndex(WAKE_UP_MESSAGES.length - 1); // Show "ready" message
    }
  }, [status]);

  if (status === 'awake') {
    return (
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="glass-card rounded-2xl p-6 flex items-center justify-center gap-4"
          style={{
            border: '1px solid rgba(34, 197, 94, 0.3)',
            boxShadow: '0 0 40px rgba(34, 197, 94, 0.15)',
            background: 'linear-gradient(135deg, rgba(15,15,28,0.95) 0%, rgba(10,10,20,0.98) 100%)',
          }}
        >
          <motion.div
            className="flex items-center justify-center w-8 h-8"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <span className="text-2xl">✅</span>
          </motion.div>
          <span className="font-mono text-sm text-green-400 font-semibold tracking-wide">
            Model Ready • Let's decode your personality
          </span>
        </div>
      </motion.div>
    );
  }

  if (status === 'checking' || status === 'sleeping') {
    const currentMessage = WAKE_UP_MESSAGES[messageIndex];
    const isReady = messageIndex === WAKE_UP_MESSAGES.length - 1 && status === 'awake';

    return (
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="glass-card rounded-2xl p-8 flex flex-col items-center gap-6"
          style={{
            border: '1px solid rgba(99,102,241,0.25)',
            boxShadow: '0 0 50px rgba(99,102,241,0.12)',
            background: 'linear-gradient(135deg, rgba(15,15,28,0.95) 0%, rgba(20,15,35,0.98) 100%)',
          }}
        >
          {/* Neural wake-up spinner */}
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid transparent',
                borderTopColor: '#6366f1',
                borderRightColor: 'rgba(99,102,241,0.3)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                border: '1.5px solid transparent',
                borderBottomColor: '#a78bfa',
                borderLeftColor: 'rgba(167,139,250,0.3)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Pulsing core */}
            <motion.div
              className="absolute inset-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.1) 100%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <div className="w-1 h-1 rounded-full bg-indigo-300" />
            </motion.div>
          </div>

          {/* Animated message with icon */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.span
                className="text-3xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {currentMessage.icon}
              </motion.span>
              <span className="font-mono text-sm text-indigo-300 tracking-wide font-medium">
                {currentMessage.text}
              </span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs h-1 rounded-full overflow-hidden" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
              }}
              animate={{
                width: ['0%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Status label */}
          <span className="text-xs text-indigo-400/60 font-mono tracking-widest uppercase">
            Initializing neural engine…
          </span>
        </div>
      </motion.div>
    );
  }

  return null;
};
