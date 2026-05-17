import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BackgroundOrbs } from '../components/BackgroundOrbs';

/* ─── Reusable fade-in-up wrapper ─── */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Glow card ─── */
const GlowCard = ({ children, className = '', glowColor = 'rgba(99,102,241,0.18)' }) => (
  <motion.div
    className={`relative rounded-2xl p-6 glass-card ${className}`}
    style={{ border: '1px solid rgba(99,102,241,0.12)' }}
    whileHover={{ scale: 1.02, borderColor: 'rgba(99,102,241,0.35)' }}
    transition={{ duration: 0.25 }}
  >
    <motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{ background: `radial-gradient(ellipse at 50% 0%, ${glowColor}, transparent 70%)` }}
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

/* ─── Tech stack items ─── */
const techStack = [
  { label: 'React', icon: '⚛️', color: '#61dafb', desc: 'Frontend UI' },
  { label: 'FastAPI', icon: '⚡', color: '#009688', desc: 'Backend API' },
  { label: 'Python', icon: '🐍', color: '#f7cc42', desc: 'Core Language' },
  { label: 'TF-IDF', icon: '📊', color: '#a78bfa', desc: 'Feature Extraction' },
  { label: 'LinearSVC', icon: '🧠', color: '#f472b6', desc: 'ML Classifier' },
  { label: 'Framer Motion', icon: '✨', color: '#c084fc', desc: 'Animations' },
  { label: 'scikit-learn', icon: '🔬', color: '#f97316', desc: 'ML Pipeline' },
  { label: 'Tailwind CSS', icon: '🎨', color: '#38bdf8', desc: 'Styling' },
];

/* ─── How it works steps ─── */
const pipeline = [
  {
    step: '01',
    title: 'Text Input',
    desc: 'User submits free-form text — thoughts, opinions, personal reflections.',
    icon: '📝',
    color: '#6366f1',
  },
  {
    step: '02',
    title: 'NLP Preprocessing',
    desc: 'Text is cleaned, tokenized, and normalized — URLs, punctuation, and noise stripped.',
    icon: '🔤',
    color: '#8b5cf6',
  },
  {
    step: '03',
    title: 'TF-IDF Vectorization',
    desc: 'Words are transformed into numerical feature vectors capturing linguistic frequency patterns.',
    icon: '📐',
    color: '#a78bfa',
  },
  {
    step: '04',
    title: 'LinearSVC Prediction',
    desc: 'The trained Support Vector Classifier maps the vector to one of 16 MBTI types.',
    icon: '🧬',
    color: '#c084fc',
  },
  {
    step: '05',
    title: 'Confidence Scoring',
    desc: 'Decision function distances are converted into probability scores per personality type.',
    icon: '📈',
    color: '#e879f9',
  },
  {
    step: '06',
    title: 'Results Rendered',
    desc: 'Rich personality profile, cognitive functions, and insight cards surface in real time.',
    icon: '🎯',
    color: '#f472b6',
  },
];

/* ─── Features ─── */
const features = [
  {
    icon: '🧠',
    title: 'Hybrid ML Model',
    desc: 'TF-IDF + LinearSVC pipeline trained on real MBTI text datasets — compact, fast, and accurate.',
    color: '#6366f1',
  },
  {
    icon: '⚡',
    title: 'FastAPI Backend',
    desc: 'Async Python backend built with FastAPI — lightning-fast inference with clean REST endpoints.',
    color: '#8b5cf6',
  },
  {
    icon: '🎯',
    title: 'Confidence Prediction',
    desc: 'Beyond a single label — every response exposes scored confidence across all 16 personality types.',
    color: '#c084fc',
  },
  {
    icon: '🔄',
    title: 'Backend Wake-Up System',
    desc: 'Intelligent cold-start detection with real-time status feedback while the server initializes.',
    color: '#f472b6',
  },
  {
    icon: '📊',
    title: 'NLP Analytics',
    desc: 'Text is analyzed through a full preprocessing pipeline capturing semantic and syntactic patterns.',
    color: '#a78bfa',
  },
  {
    icon: '🌐',
    title: 'Real-Time Analysis',
    desc: 'End-to-end personality analysis from raw text to rich interactive results in milliseconds.',
    color: '#818cf8',
  },
];

/* ─── Developer skills ─── */
const devSkills = [
  { label: 'Machine Learning', level: 80, color: '#6366f1' },
  { label: 'NLP & Text Analytics', level: 75, color: '#8b5cf6' },
  { label: 'Backend Systems', level: 78, color: '#a78bfa' },
  { label: 'React & Frontend', level: 72, color: '#c084fc' },
  { label: 'Data Engineering', level: 68, color: '#e879f9' },
  { label: 'API Design', level: 74, color: '#f472b6' },
];

/* ─── Skill bar ─── */
const SkillBar = ({ label, level, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#b0b0d0]">{label}</span>
        <span className="font-mono text-xs" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

/* ─── Main component ─── */
export const AboutPage = ({ onBack }) => {
  return (
    <div className="noise min-h-screen relative">
      <BackgroundOrbs />

      <div className="relative z-10 min-h-screen">
        {/* ── Nav bar ── */}
        <motion.nav
          className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
          style={{
            background: 'rgba(5,5,8,0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(99,102,241,0.08)',
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#7a7a9e] hover:text-indigo-400 transition-colors duration-200 text-sm font-mono tracking-wide"
          >
            <span className="text-lg">←</span>
            <span>back to app</span>
          </button>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.14)',
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="eyebrow-text text-indigo-400">About / Developer</span>
          </div>
        </motion.nav>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">

          {/* ══════════════════════════════════════════════
              HERO — Project intro
          ══════════════════════════════════════════════ */}
          <div className="text-center pt-20 pb-16">
            <Reveal>
              <div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(99,102,241,0.06)',
                  border: '1px solid rgba(99,102,241,0.18)',
                }}
              >
                <span className="eyebrow-text text-indigo-400">Neural Personality Engine</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="hero-title mb-5">
                <span className="block text-white">Mind</span>
                <span
                  className="block"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 35%, #c084fc 65%, #f472b6 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradientShift 5s ease infinite',
                  }}
                >
                  Reader
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-[#7a7a9e] text-lg max-w-xl mx-auto leading-relaxed">
                An AI-powered MBTI personality predictor — combining NLP preprocessing, 
                TF-IDF feature extraction, and a LinearSVC model to decode who you are from what you write.
              </p>
            </Reveal>
          </div>

          {/* ══════════════════════════════════════════════
              PROJECT OVERVIEW — 3 highlight cards
          ══════════════════════════════════════════════ */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="section-label text-indigo-500/60">01 — Project</div>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
            {[
              {
                icon: '🎭',
                title: '16 Personality Types',
                desc: 'Full MBTI coverage — from INTJ to ESFP. Every type decoded with cognitive functions and traits.',
                color: '#6366f1',
                delay: 0,
              },
              {
                icon: '🔬',
                title: 'ML + NLP Pipeline',
                desc: 'Text flows through a preprocessing pipeline, TF-IDF vectorization, then into a trained LinearSVC model.',
                color: '#a78bfa',
                delay: 0.08,
              },
              {
                icon: '📡',
                title: 'Real-Time Analysis',
                desc: 'FastAPI backend delivers sub-second predictions with confidence scores for all personality types.',
                color: '#f472b6',
                delay: 0.16,
              },
            ].map(({ icon, title, desc, color, delay }) => (
              <Reveal key={title} delay={delay}>
                <GlowCard glowColor={`${color}22`} className="h-full">
                  <div
                    className="text-3xl mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-[#6e6e8e] text-sm leading-relaxed">{desc}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>

          {/* ══════════════════════════════════════════════
              HOW IT WORKS — Pipeline timeline
          ══════════════════════════════════════════════ */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="section-label text-indigo-500/60">02 — Pipeline</div>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            </div>
          </Reveal>

          <div className="relative mb-20">
            {/* Vertical connector line */}
            <div
              className="absolute left-8 top-6 bottom-6 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #6366f1, #f472b6, transparent)' }}
            />

            <div className="space-y-4">
              {pipeline.map(({ step, title, desc, icon, color }, i) => (
                <Reveal key={step} delay={i * 0.07}>
                  <div className="flex gap-6 items-start md:pl-4">
                    {/* Step number bubble */}
                    <div
                      className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono text-xs font-bold"
                      style={{
                        background: `${color}14`,
                        border: `1px solid ${color}35`,
                        color,
                      }}
                    >
                      <span className="text-lg">{icon}</span>
                      <span style={{ fontSize: 9, opacity: 0.7 }}>{step}</span>
                    </div>
                    {/* Content */}
                    <div
                      className="flex-1 rounded-2xl p-5"
                      style={{
                        background: 'rgba(10,10,20,0.7)',
                        border: '1px solid rgba(99,102,241,0.08)',
                      }}
                    >
                      <h4 className="text-white font-semibold mb-1">{title}</h4>
                      <p className="text-[#6e6e8e] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              FEATURES — 6-card grid
          ══════════════════════════════════════════════ */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="section-label text-indigo-500/60">03 — Features</div>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {features.map(({ icon, title, desc, color }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <GlowCard glowColor={`${color}1a`} className="h-full">
                  <div className="text-2xl mb-3">{icon}</div>
                  <h4 className="text-white font-semibold text-base mb-2">{title}</h4>
                  <p className="text-[#6e6e8e] text-sm leading-relaxed">{desc}</p>
                  <div
                    className="mt-4 h-0.5 rounded-full w-8"
                    style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                  />
                </GlowCard>
              </Reveal>
            ))}
          </div>

          {/* ══════════════════════════════════════════════
              TECH STACK
          ══════════════════════════════════════════════ */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="section-label text-indigo-500/60">04 — Stack</div>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-20">
            {techStack.map(({ label, icon, color, desc }, i) => (
              <Reveal key={label} delay={i * 0.05}>
                <motion.div
                  className="rounded-xl p-4 text-center cursor-default"
                  style={{
                    background: 'rgba(10,10,20,0.8)',
                    border: `1px solid ${color}20`,
                  }}
                  whileHover={{
                    scale: 1.04,
                    borderColor: `${color}50`,
                    boxShadow: `0 0 24px ${color}20`,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="font-semibold text-sm text-white mb-0.5">{label}</div>
                  <div className="text-xs" style={{ color: `${color}99` }}>{desc}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* ══════════════════════════════════════════════
              DEVELOPER SECTION
          ══════════════════════════════════════════════ */}
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="section-label text-indigo-500/60">05 — Developer</div>
              <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            </div>
          </Reveal>

          {/* Developer hero card */}
          <Reveal>
            <div
              className="relative rounded-3xl overflow-hidden mb-8 p-8 md:p-12"
              style={{
                background: 'linear-gradient(135deg, rgba(15,15,30,0.97) 0%, rgba(8,8,18,0.99) 100%)',
                border: '1px solid rgba(99,102,241,0.15)',
              }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(99,102,241,0.08), transparent 70%)',
                  transform: 'translate(30%, -30%)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(192,132,252,0.06), transparent 70%)',
                  transform: 'translate(-30%, 30%)',
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                {/* Avatar / identity */}
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(192,132,252,0.12))',
                      border: '1px solid rgba(99,102,241,0.25)',
                    }}
                    animate={{ boxShadow: ['0 0 20px rgba(99,102,241,0.2)', '0 0 40px rgba(99,102,241,0.35)', '0 0 20px rgba(99,102,241,0.2)'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    👤
                  </motion.div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {['ML Aspirer', 'AI Builder', 'NLP Explorer'].map((tag, i) => (
                      <div
                        key={tag}
                        className="px-3 py-1 rounded-full text-center font-mono"
                        style={{
                          fontSize: 10,
                          background: `rgba(${i === 0 ? '99,102,241' : i === 1 ? '139,92,246' : '192,132,252'},0.1)`,
                          border: `1px solid rgba(${i === 0 ? '99,102,241' : i === 1 ? '139,92,246' : '192,132,252'},0.22)`,
                          color: i === 0 ? '#818cf8' : i === 1 ? '#a78bfa' : '#c084fc',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <h2 className="text-white font-bold text-3xl mb-1" style={{ letterSpacing: '-0.02em' }}>
                    The Developer
                  </h2>
                  <div className="section-label text-indigo-400/70 mb-5">Building intelligence, one model at a time</div>

                  <p className="text-[#8a8ab0] leading-relaxed mb-4">
                    I build intelligent systems at the intersection of machine learning, natural language processing,
                    and backend engineering. My work is driven by a singular obsession: making AI applications that
                    feel less like tools and more like experiences.
                  </p>
                  <p className="text-[#7a7a9e] leading-relaxed mb-6">
                    MindReader isn't just a project — it's a working proof of concept for how NLP pipelines and
                    classical ML models can be packaged into production-grade, responsive applications.
                    Every design decision, from the confidence scoring system to the backend wake-up detection,
                    was made with purpose.
                  </p>

                  {/* Interest tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'NLP', 'Backend Systems', 'AI Applications', 'Data Analytics', 'Intelligent UX'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-sm"
                        style={{
                          background: 'rgba(99,102,241,0.08)',
                          border: '1px solid rgba(99,102,241,0.16)',
                          color: '#9090c0',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Skills + Vision grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Skill bars */}
            <Reveal delay={0.05}>
              <GlowCard>
                <div className="section-label text-indigo-500/60 mb-5">Expertise Areas</div>
                {devSkills.map(({ label, level, color }, i) => (
                  <SkillBar key={label} label={label} level={level} color={color} delay={i * 0.07} />
                ))}
              </GlowCard>
            </Reveal>

            {/* Vision / philosophy */}
            <Reveal delay={0.1}>
              <GlowCard glowColor="rgba(192,132,252,0.15)" className="h-full">
                <div className="section-label text-purple-500/60 mb-5">Vision & Philosophy</div>
                <div className="space-y-4">
                  {[
                    {
                      icon: '🎯',
                      heading: 'Build to understand',
                      text: 'Every project I build is an attempt to understand something deeper about how data, language, and intelligence intersect.',
                    },
                    {
                      icon: '🔭',
                      heading: 'Eyes on the horizon',
                      text: 'Currently exploring LLM fine-tuning, agentic systems, and production ML deployment patterns.',
                    },
                    {
                      icon: '⚙️',
                      heading: 'Systems thinking',
                      text: 'Great AI products aren\'t just models — they\'re engineered systems with reliable APIs, clean UX, and thoughtful error handling.',
                    },
                  ].map(({ icon, heading, text }) => (
                    <div key={heading} className="flex gap-3">
                      <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5">{heading}</div>
                        <div className="text-[#6e6e8e] text-sm leading-relaxed">{text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          </div>

          {/* ── CTA — back to app ── */}
          <Reveal>
            <div className="text-center mt-8">
              <p className="text-[#555570] text-sm mb-6 font-mono tracking-wide">
                // ready to try it yourself?
              </p>
              <motion.button
                onClick={onBack}
                className="relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(192,132,252,0.2))',
                  border: '1px solid rgba(99,102,241,0.3)',
                  fontSize: 15,
                  letterSpacing: '0.02em',
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 40px rgba(99,102,241,0.35), 0 0 80px rgba(99,102,241,0.15)',
                  borderColor: 'rgba(99,102,241,0.6)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(192,132,252,0.08))' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <span className="relative z-10">Launch Mind Reader</span>
                <motion.span
                  className="relative z-10 text-indigo-400"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
};
