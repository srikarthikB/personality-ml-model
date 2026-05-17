import { AnimatePresence } from 'framer-motion';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ResultCard } from './components/ResultCard';
import { ErrorMessage } from './components/ErrorMessage';
import { BackendStatus } from './components/BackendStatus';
import { Footer } from './components/Footer';
import { usePrediction } from './hooks/usePrediction';
import { useBackendHealth } from './hooks/useBackendHealth';

export default function App() {
  const { result, loading, error, predict, reset } = usePrediction();
  const { status: backendStatus } = useBackendHealth();

  return (
    <div className="noise min-h-screen relative">
      <BackgroundOrbs />

      <div className="relative z-10 min-h-screen flex flex-col">
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
