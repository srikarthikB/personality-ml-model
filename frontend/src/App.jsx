import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ResultCard } from './components/ResultCard';
import { ErrorMessage } from './components/ErrorMessage';
import { BackendStatus } from './components/BackendStatus';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { usePrediction } from './hooks/usePrediction';
import { useBackendHealth } from './hooks/useBackendHealth';

/* ─── Futuristic About nav button ─── */
const AboutNavButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono overflow-hidden"
    style={{
      background: 'rgba(99,102,241,0.06)',
      border: '1px solid rgba(99,102,241,0.18)',
      fontSize: 11,
      letterSpacing: '0.14em',
      color: '#818cf8',
      textTransform: 'uppercase',
    }}
    whileHover={{
      scale: 1.04,
      boxShadow: '0 0 24px rgba(99,102,241,0.3), 0 0 48px rgba(99,102,241,0.1)',
      borderColor: 'rgba(99,102,241,0.45)',
    }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.2 }}
  >
    <motion.span
      className="absolute inset-0 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(192,132,252,0.05))',
      }}
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
    />
    <motion.span
      className="relative z-10 w-1.5 h-1.5 rounded-full bg-indigo-400"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <span className="relative z-10">About / Developer</span>
    <motion.span
      className="relative z-10 text-indigo-400"
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      →
    </motion.span>
  </motion.button>
);

export default function App() {
  const { result, loading, error, predict, reset } = usePrediction();
  const { status: backendStatus } = useBackendHealth();
  const [page, setPage] = useState('home');

  if (page === 'about') {
    return <AboutPage onBack={() => setPage('home')} />;
  }

  return (
    <div className="noise min-h-screen relative">
      <BackgroundOrbs />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ── Top About button ── */}
        <motion.div
          className="flex justify-center pt-5"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <AboutNavButton onClick={() => setPage('about')} />
        </motion.div>

        <Header />

        <main className="flex-1 w-full max-w-3xl mx-auto pb-4">
          {/* Backend Status — always show when not awake */}
          <AnimatePresence>
            {backendStatus !== 'awake' && (
              <BackendStatus status={backendStatus} />
            )}
          </AnimatePresence>

          {/* Ready indicator — show when backend is awake */}
          <AnimatePresence>
            {backendStatus === 'awake' && !result && !loading && !error && (
              <BackendStatus status={backendStatus} />
            )}
          </AnimatePresence>

          {/* Input — hide when result is shown */}
          <AnimatePresence>
            {!result && (
              <TextInput onSubmit={predict} loading={loading} backendStatus={backendStatus} />
            )}
          </AnimatePresence>

          {/* Loading */}
          <AnimatePresence>
            {loading && <LoadingOverlay active={loading} />}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && !loading && (
              <ErrorMessage message={error} onDismiss={reset} />
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && !loading && (
              <ResultCard result={result} onReset={reset} />
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
}
