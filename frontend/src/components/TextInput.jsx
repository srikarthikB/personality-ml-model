import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_WORDS  = 5;
const CHAR_WARN  = 800;
const CHAR_MAX   = 1000;

const PLACEHOLDERS = [
  "I've always been fascinated by how systems work — whether it's code, psychology, or the patterns hidden in everyday conversations...",
  "People often say I overthink things. Maybe they're right. Or maybe they just don't think deeply enough...",
  "I find it hard to explain, but I live most vividly inside my own head. Ideas feel more real than most conversations I have...",
  "There's nothing I love more than a good debate — not to win, but to find the truth together...",
];

export const TextInput = ({ onSubmit, loading }) => {
  const [text,           setText]          = useState('');
  const [focused,        setFocused]       = useState(false);
  const [placeholderIdx]                   = useState(() => Math.floor(Math.random() * PLACEHOLDERS.length));
  const textareaRef = useRef(null);

  const wordCount     = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount     = text.length;
  const hasEnoughWords = wordCount >= MIN_WORDS;
  const isNearLimit   = charCount > CHAR_WARN;
  const canSubmit     = hasEnoughWords && !loading && text.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
  };

  /* ── bar fill ratio for progress indicator ── */
  const fillRatio = Math.min(charCount / CHAR_MAX, 1);

  return (
    <motion.div
      className="relative z-10 w-full max-w-2xl mx-auto px-4"
      style={{ pointerEvents: 'auto' }}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Textarea card ───────────────────────────────── */}
      <div
        className="gradient-border glass-card rounded-2xl transition-all duration-300"
        style={{
          pointerEvents: 'auto',
          border: focused
            ? '1px solid rgba(99,102,241,0.45)'
            : '1px solid rgba(26,26,46,0.9)',
          boxShadow: focused
            ? '0 0 0 4px rgba(99,102,241,0.07), 0 24px 64px rgba(0,0,0,0.55)'
            : '0 12px 48px rgba(0,0,0,0.45)',
        }}
      >
        {/* ── Card header (replaces traffic-light bar) ── */}
        <div
          className="flex items-center justify-between px-5 pt-4 pb-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          {/* Left: file label */}
          <div className="flex items-center gap-2.5">
            {/* Minimal status dot */}
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: focused ? '#6366f1' : '#2a2a45' }}
              animate={focused ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span
              className="font-mono text-[11px] tracking-wide"
              style={{ color: focused ? '#6666a8' : '#2e2e4a' }}
            >
              personality_input.txt
            </span>
          </div>

          {/* Right: shortcut hint */}
          <span
            className="font-mono text-[10px] hidden sm:block"
            style={{ color: '#24243a' }}
          >
            ⌘↵ predict
          </span>
        </div>

        {/* ── Textarea ─────────────────────────────────── */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => { if (e.target.value.length <= CHAR_MAX) setText(e.target.value); }}
          onFocus={() => setFocused(true)}
          onBlur={()  => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDERS[placeholderIdx]}
          rows={7}
          className="w-full bg-transparent px-5 py-4 text-[#c8c8e6] placeholder-[#28283e] text-[15px] leading-[1.75] resize-none focus:outline-none"
          disabled={loading}
          maxLength={CHAR_MAX}
        />

        {/* ── Bottom status bar ────────────────────────── */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          {/* Word + char counts */}
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {!hasEnoughWords && text.length > 0 ? (
                <motion.span
                  key="warn"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-[11px] text-amber-400/75"
                >
                  {MIN_WORDS - wordCount} more {MIN_WORDS - wordCount === 1 ? 'word' : 'words'} needed
                </motion.span>
              ) : (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`font-mono text-[11px] ${hasEnoughWords ? 'text-indigo-400/55' : 'text-[#28283e]'}`}
                >
                  {wordCount} {wordCount === 1 ? 'word' : 'words'}
                </motion.span>
              )}
            </AnimatePresence>

            <span className="text-[#1e1e30] text-xs">·</span>

            <span
              className={`font-mono text-[11px] transition-colors ${
                isNearLimit ? 'text-amber-400/65' : 'text-[#28283e]'
              }`}
            >
              {charCount}/{CHAR_MAX}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: isNearLimit
                  ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                  : 'linear-gradient(90deg, #6366f1, #a78bfa)',
              }}
              animate={{ width: `${fillRatio * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* ── Submit button ─────────────────────────────── */}
      <motion.button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="btn-primary mt-4 w-full relative overflow-hidden rounded-xl py-4 px-6 disabled:opacity-35 disabled:cursor-not-allowed text-white"
        style={{
          background: canSubmit
            ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)'
            : 'rgba(20,20,36,0.8)',
          border: canSubmit ? 'none' : '1px solid rgba(26,26,46,0.9)',
          boxShadow: canSubmit
            ? '0 0 32px rgba(99,102,241,0.45), 0 4px 24px rgba(0,0,0,0.35)'
            : 'none',
        }}
        whileHover={canSubmit ? { scale: 1.012, boxShadow: '0 0 48px rgba(99,102,241,0.6), 0 8px 32px rgba(0,0,0,0.4)' } : {}}
        whileTap={canSubmit ? { scale: 0.988 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {/* Shimmer layer */}
        {canSubmit && <div className="absolute inset-0 shimmer pointer-events-none" />}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="flex items-center justify-center gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <LoadingDots />
              <span>Analyzing patterns…</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              className="flex items-center justify-center gap-2.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <span>Decode Personality</span>
              <svg className="w-4 h-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

const LoadingDots = () => (
  <div className="flex gap-1">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-white/70"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);
