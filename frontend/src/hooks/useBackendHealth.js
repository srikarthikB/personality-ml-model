import { useState, useEffect, useCallback } from 'react';

const HEALTH_CHECK_URL = 'https://personality-predictor-xewd.onrender.com/health';
const INITIAL_CHECK_DELAY = 500;   // Check immediately on mount
const ACTIVE_POLL_INTERVAL = 2000; // Poll every 2s when sleeping
const IDLE_POLL_INTERVAL = 5000;   // Poll every 5s when awake (to catch sleep)

export const useBackendHealth = () => {
  const [status, setStatus] = useState('checking'); // 'checking' | 'awake' | 'sleeping'
  const [checkCount, setCheckCount] = useState(0);

  const performHealthCheck = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(HEALTH_CHECK_URL, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setStatus('awake');
        return true;
      } else {
        setStatus('sleeping');
        return false;
      }
    } catch (error) {
      setStatus('sleeping');
      return false;
    }
  }, []);

  useEffect(() => {
    // Initial check after brief delay
    const initialTimer = setTimeout(() => {
      performHealthCheck();
      setCheckCount(1);
    }, INITIAL_CHECK_DELAY);

    return () => clearTimeout(initialTimer);
  }, [performHealthCheck]);

  useEffect(() => {
    // Polling logic: aggressive when sleeping, relaxed when awake
    const interval = setInterval(() => {
      performHealthCheck().then((isAwake) => {
        setCheckCount((prev) => prev + 1);
      });
    }, status === 'sleeping' ? ACTIVE_POLL_INTERVAL : IDLE_POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [status, performHealthCheck]);

  return { status, checkCount };
};
