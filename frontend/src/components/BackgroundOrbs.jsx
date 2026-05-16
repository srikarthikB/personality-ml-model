import { motion } from 'framer-motion';

const orbs = [
  { cx: '12%',  cy: '18%',  r: 300, color: 'rgba(99,102,241,0.065)', delay: 0 },
  { cx: '88%',  cy: '72%',  r: 340, color: 'rgba(139,92,246,0.055)',  delay: 1 },
  { cx: '72%',  cy: '12%',  r: 200, color: 'rgba(192,132,252,0.045)', delay: 2 },
  { cx: '22%',  cy: '82%',  r: 240, color: 'rgba(99,102,241,0.035)',  delay: 1.5 },
];

export const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Neural grid */}
    <div className="absolute inset-0 bg-neural-grid" />

    {/* Subtle scan line */}
    <div className="scan-line" />

    {/* Orbs */}
    {orbs.map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full blur-3xl"
        style={{
          left:      orb.cx,
          top:       orb.cy,
          width:     orb.r * 2,
          height:    orb.r * 2,
          background: orb.color,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }}
        transition={{
          duration:    7 + i * 1.8,
          repeat:      Infinity,
          delay:       orb.delay,
          ease:        'easeInOut',
        }}
      />
    ))}

    {/* Edge vignettes */}
    <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050508] to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050508] to-transparent" />
  </div>
);
