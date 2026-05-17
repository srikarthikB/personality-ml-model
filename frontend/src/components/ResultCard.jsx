import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMbtiInfo, mbtiDimensions } from '../data/mbtiData';

export const ResultCard = ({ result, onReset }) => {
  const info       = getMbtiInfo(result.personality);
  const type       = result.personality.toUpperCase();
  const confidence = result.confidence;
  const barRef     = useRef(null);

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.setProperty('--target-width', `${confidence}%`);
    }
  }, [confidence]);

  return (
    <motion.div
      className="relative z-10 w-full max-w-2xl mx-auto px-4 mt-8"
      initial={{ opacity: 0, scale: 0.93, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
    >
      <div
        className="relative glass-card rounded-2xl overflow-hidden"
        style={{
          border:     `1px solid ${info.accent}28`,
          boxShadow:  `0 0 0 1px ${info.accent}10, 0 32px 80px rgba(0,0,0,0.65), 0 0 60px ${info.glow}`,
        }}
      >
        {/* Top gradient line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${info.accent}70, transparent)` }}
        />

        {/* Accent color band */}
        <div className={`h-[3px] w-full bg-gradient-to-r ${info.color}`} style={{ opacity: 0.85 }} />

        <div className="p-7 sm:p-9">
          {/* ── Header row ──────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div className="flex-1">
              {/* Badge label */}
              <div className="mb-4">
                <span
                  className="section-label px-3 py-1.5 rounded-full inline-block"
                  style={{
                    color:       info.accent,
                    background:  `${info.accent}12`,
                    border:      `1px solid ${info.accent}22`,
                  }}
                >
                  Personality Type
                </span>
              </div>

              {/* Giant type letters */}
              <TypeLetters type={type} info={info} />

              {/* Title + tagline */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-3"
              >
                <h2
                  className="text-[22px] font-[700] text-white leading-tight"
                  style={{ textShadow: `0 0 28px ${info.glow}` }}
                >
                  {info.icon} {info.title}
                </h2>
                <p
                  className="text-[13px] text-[#6a6a90] mt-1.5 leading-relaxed italic font-[300]"
                  style={{ letterSpacing: '0.01em' }}
                >
                  &ldquo;{info.tagline}&rdquo;
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── Dimension breakdown ──────────────────────────── */}
          <DimensionBreakdown type={type} info={info} />

          {/* Divider */}
          <div className="h-px my-7" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* ── Confidence bar ───────────────────────────────── */}
          <ConfidenceBar confidence={confidence} info={info} barRef={barRef} />

          {/* Divider */}
          <div className="h-px my-7" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* ── Personality description ──────────────────────── */}
          <PersonalityDescription info={info} />

          {/* ── Strengths & Weaknesses ───────────────────────── */}
          <StrengthsWeaknesses info={info} />

          {/* ── Compatibility / Communication style ─────────── */}
          <CompatibilityInsight info={info} />

          {/* ── Trait badges ─────────────────────────────────── */}
          <TraitBadges traits={info.traits} info={info} />

          {/* ── Reset button ─────────────────────────────────── */}
          <motion.button
            onClick={onReset}
            className="btn-ghost mt-8 w-full py-3.5 rounded-xl text-[13px] font-[500]"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border:     '1px solid rgba(255,255,255,0.07)',
              color:      '#55558a',
            }}
            whileHover={{
              background: 'rgba(255,255,255,0.07)',
              color:      '#8888bb',
              borderColor: 'rgba(255,255,255,0.12)',
            }}
            whileTap={{ scale: 0.99 }}
          >
            ↩ Try Another
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Sub-components ────────────────────────────────────────── */

const TypeLetters = ({ type, info }) => (
  <div className="flex gap-0.5 items-baseline">
    {type.split('').map((letter, i) => (
      <motion.span
        key={i}
        className="font-[800] leading-none"
        style={{
          fontSize:               'clamp(3rem, 9vw, 4.5rem)',
          backgroundImage:        `linear-gradient(135deg, ${info.accent}, ${info.accent}99)`,
          WebkitBackgroundClip:   'text',
          WebkitTextFillColor:    'transparent',
          backgroundClip:         'text',
          filter:                 `drop-shadow(0 0 18px ${info.glow})`,
          letterSpacing:          '-0.02em',
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 + i * 0.07, type: 'spring', stiffness: 280 }}
      >
        {letter}
      </motion.span>
    ))}
  </div>
);

const DimensionBreakdown = ({ type, info }) => {
  const dims = type.split('').map(letter => ({
    letter,
    label:         mbtiDimensions[letter]?.label        || letter,
    opposite:      mbtiDimensions[letter]?.opposite      || '',
    oppositeLabel: mbtiDimensions[letter]?.oppositeLabel || '',
  }));

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {dims.map((dim, i) => (
        <motion.div
          key={dim.letter}
          className="flex items-center gap-3 rounded-xl px-4 py-3.5"
          style={{
            background: `${info.accent}07`,
            border:     `1px solid ${info.accent}14`,
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22 + i * 0.07 }}
        >
          <span
            className="font-[800] text-xl w-7 leading-none"
            style={{ color: info.accent }}
          >
            {dim.letter}
          </span>
          <div>
            <div className="text-[13px] font-[600] text-white/80 leading-tight">{dim.label}</div>
            <div className="section-label text-[#3a3a5a] mt-0.5">vs {dim.oppositeLabel}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ConfidenceBar = ({ confidence, info, barRef }) => (
  <div>
    <div className="flex items-center justify-between mb-3">
      <span className="section-label text-[#44447a]">Model Confidence</span>
      <motion.span
        className="font-[700] text-[26px] leading-none"
        style={{ color: info.accent, letterSpacing: '-0.02em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        {confidence.toFixed(1)}%
      </motion.span>
    </div>

    {/* Track */}
    <div
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <motion.div
        ref={barRef}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${info.accent}70, ${info.accent})`,
          boxShadow:  `0 0 10px ${info.glow}`,
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${confidence}%` }}
        transition={{ delay: 0.55, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>

    {/* Scale */}
    <div className="flex justify-between mt-1.5">
      <span className="section-label text-[#222238]">0%</span>
      <span className="section-label text-[#222238]">100%</span>
    </div>
  </div>
);

const PersonalityDescription = ({ info }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.75 }}
    className="mb-6"
  >
    <span className="section-label text-[#44447a] mb-2.5 block">About this Type</span>
    <p className="text-[14px] leading-[1.8] text-[#8888b0] font-[300]">
      {info.description}
    </p>
  </motion.div>
);

const StrengthsWeaknesses = ({ info }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.85 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
  >
    {/* Strengths */}
    <div
      className="rounded-xl p-4"
      style={{ background: `${info.accent}08`, border: `1px solid ${info.accent}18` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: info.accent, fontSize: 13 }}>▲</span>
        <span className="section-label" style={{ color: info.accent }}>Strengths</span>
      </div>
      <ul className="space-y-1.5">
        {info.strengths.map((s, i) => (
          <motion.li
            key={s}
            className="flex items-start gap-2 text-[12.5px] text-[#7a7aa8]"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.06 }}
          >
            <span style={{ color: info.accent, marginTop: 2, flexShrink: 0 }}>·</span>
            {s}
          </motion.li>
        ))}
      </ul>
    </div>

    {/* Weaknesses */}
    <div
      className="rounded-xl p-4"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#444468]" style={{ fontSize: 13 }}>▼</span>
        <span className="section-label text-[#444468]">Blind Spots</span>
      </div>
      <ul className="space-y-1.5">
        {info.weaknesses.map((w, i) => (
          <motion.li
            key={w}
            className="flex items-start gap-2 text-[12.5px] text-[#55556a]"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.06 }}
          >
            <span className="text-[#333350] mt-0.5 flex-shrink-0">·</span>
            {w}
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const CompatibilityInsight = ({ info }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0 }}
    className="rounded-xl p-5 mb-7"
    style={{
      background: `linear-gradient(135deg, ${info.accent}06, rgba(255,255,255,0.015))`,
      border: `1px solid ${info.accent}16`,
    }}
  >
    <div className="flex items-center gap-2 mb-2.5">
      <span style={{ color: info.accent, fontSize: 13 }}>◈</span>
      <span className="section-label" style={{ color: info.accent }}>Communication Style</span>
    </div>
    <p className="text-[13px] leading-[1.8] text-[#6a6a8a] font-[300]">
      {info.compatibility}
    </p>
  </motion.div>
);

const TraitBadges = ({ traits, info }) => (
  <div className="mt-2">
    <span className="section-label text-[#44447a] mb-3 block">Key Traits</span>
    <div className="flex flex-wrap gap-2">
      {traits.map((trait, i) => (
        <motion.span
          key={trait}
          className="px-3.5 py-1.5 rounded-lg text-[12px] font-[600]"
          style={{
            color:      info.accent,
            background: `${info.accent}10`,
            border:     `1px solid ${info.accent}1e`,
            letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.72 + i * 0.07, type: 'spring', stiffness: 380 }}
        >
          {trait}
        </motion.span>
      ))}
    </div>
  </div>
);
