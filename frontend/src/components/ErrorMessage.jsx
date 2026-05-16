import { motion } from 'framer-motion';

export const ErrorMessage = ({ message, onDismiss }) => (
  <motion.div
    className="relative z-10 w-full max-w-2xl mx-auto px-4 mt-6"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <div
      className="glass-card flex items-start gap-4 rounded-xl px-5 py-4"
      style={{
        background: 'rgba(239,68,68,0.05)',
        border:     '1px solid rgba(239,68,68,0.18)',
        boxShadow:  '0 0 28px rgba(239,68,68,0.05)',
      }}
    >
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: 'rgba(239,68,68,0.12)' }}
      >
        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-[600] text-red-400 mb-1">Prediction Failed</p>
        <p className="text-[13px] text-[#7a7a9e] leading-relaxed font-[400]">{message}</p>
      </div>

      <button
        onClick={onDismiss}
        className="text-[#383858] hover:text-[#7777a0] transition-colors flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </motion.div>
);
