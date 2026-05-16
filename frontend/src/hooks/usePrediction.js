import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'https://personality-predictor-xewd.onrender.com/predict';

export const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (text) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(API_URL, { text }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (err.response) {
        setError(err.response.data?.detail || 'Server error. Please try again.');
      } else if (err.request) {
        setError('Cannot reach the server. Make sure the backend is running on port 8000.');
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
