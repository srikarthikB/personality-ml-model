import { motion } from 'framer-motion';

const SCAN_LINES = [
  'Tokenizing input…',
  'Extracting linguistic features…',
  'Running TF-IDF transform…',
  'Querying LinearSVC model…',
  'Calibrating confidence…',
];

export const LoadingOverlay = ({ active }) => {
  if (!active) return null;

  return (
    <motion.div
      className="relative z-10 w-full max-w-2xl mx-auto px-4 mt-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="glass-card rounded-2xl p-8 flex flex-col items-center gap-7"
        style={{
          border:     '1px solid rgba(99,102,241,0.18)',
          boxShadow:  '0 0 60px rgba(99,102,241,0.08)',
        }}
      >
        {/* Neural spinner */}
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1.5px solid transparent', borderTopColor: '#6366f1', borderRightColor: 'rgba(99,102,241,0.25)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{ border: '1.5px solid transparent', borderTopColor: '#a78bfa', borderLeftColor: 'rgba(167,139,250,0.25)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-6 rounded-full"
            style={{ background: 'rgba(192,132,252,0.15)' }}
            animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/80" />
          </div>
        </div>

        {/* Scan lines */}
        <ScanText lines={SCAN_LINES} />
      </div>
    </motion.div>
  );
};

const ScanText = ({ lines }) => (
  <div className="w-full max-w-xs space-y-2.5">
    {lines.map((line, i) => (
      <motion.div
        key={line}
        className="flex items-center gap-2.5"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: [0, 1, 1, 0.25], x: 0 }}
        transition={{
          delay: i * 0.38,
          duration: 0.4,
          times: [0, 0.15, 0.7, 1],
          repeat: Infinity,
          repeatDelay: lines.length * 0.38,
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: '#6366f1' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: i * 0.38, duration: 0.4, repeat: Infinity, repeatDelay: lines.length * 0.38 }}
        />
        <span className="font-mono text-[11px] text-indigo-300/55 tracking-wide">{line}</span>
      </motion.div>
    ))}
  </div>
);
