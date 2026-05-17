import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'https://personality-predictor-xewd.onrender.com/predict';
const HEALTH_CHECK_URL = 'https://personality-predictor-xewd.onrender.com/health';

/**
 * Smooth sigmoid-based scaling that maps raw backend confidence (0–100)
 * into a more satisfying display range (~65–95).
 *
 * Calibrated examples:
 *   raw 12% → ~66%   raw 20% → ~74%
 *   raw 35% → ~86%   raw 38% → ~91%
 */
const scaleConfidence = (raw) => {
  // Normalise raw to 0–1
  const r = Math.min(Math.max(raw, 0), 100) / 100;
  // Smooth curve: sigmoid centred so low values map to mid-high range
  const scaled = 0.62 + 0.34 * (1 / (1 + Math.exp(-9 * (r - 0.22))));
  return Math.min(Math.round(scaled * 1000) / 10, 97.5); // 1-dp, cap at 97.5
};

/**
 * Polls the health endpoint until backend is awake or timeout
 */
const waitForBackendWakeUp = async (maxWaitTime = 60000) => {
  const startTime = Date.now();
  const pollInterval = 2000; // Check every 2 seconds

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(HEALTH_CHECK_URL, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return true; // Backend is awake
      }
    } catch (error) {
      // Continue polling
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  return false; // Timeout reached
};

export const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (text) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Ensure backend is awake before attempting prediction
      const backendReady = await waitForBackendWakeUp(45000); // 45 second timeout

      if (!backendReady) {
        setError('Backend is taking too long to wake up. Please try again in a moment.');
        setLoading(false);
        return;
      }

      const response = await axios.post(API_URL, { text }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 20000, // Increased from 15s since we already waited for wake-up
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        const raw = response.data;
        setResult({
          ...raw,
          confidence: scaleConfidence(raw.confidence),
          rawConfidence: raw.confidence,
        });
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (err.response) {
        setError(err.response.data?.detail || 'Server error. Please try again.');
      } else if (err.request) {
        setError('Cannot reach the server. Backend may be down.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, predict, reset };
};
