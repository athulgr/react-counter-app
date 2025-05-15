"use client";

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000); // every 1 second
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const decrement = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  const reset = () => {
    pauseTimer();
    setCount(0);
  };

  // Clean up timer if component is unmounted
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Next.js Timer Counter</h1>
      <h2>{count}</h2>
      <div style={styles.buttons}>
        <button onClick={startTimer} style={styles.button}>Start Timer</button>
        <button onClick={pauseTimer} style={styles.button}>Pause Timer</button>
        <button onClick={decrement} style={styles.button}>Decrement</button>
        <button onClick={reset} style={styles.button}>Reset</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    fontFamily: 'Arial',
  },
  buttons: {
    marginTop: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
  },
};
