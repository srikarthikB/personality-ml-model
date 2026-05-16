import { AnimatePresence } from 'framer-motion';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { LoadingOverlay } from './components/LoadingOverlay';
import { ResultCard } from './components/ResultCard';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { usePrediction } from './hooks/usePrediction';

export default function App() {
  const { result, loading, error, predict, reset } = usePrediction();

  return (
    <div className="noise min-h-screen relative">
      <BackgroundOrbs />

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 w-full max-w-3xl mx-auto pb-4">
          {/* Input — hide when result is shown */}
          <AnimatePresence>
            {!result && (
              <TextInput onSubmit={predict} loading={loading} />
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
