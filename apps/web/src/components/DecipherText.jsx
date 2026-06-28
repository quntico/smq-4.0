import React, { useState, useEffect } from 'react';

const DecipherText = ({ text, delay = 0, speed = 30 }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let active = true;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-=';
    let iterations = 0;
    
    const interval = setInterval(() => {
      if (!active) return;
      
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 2; // Speed up deciphering by incrementing half-steps
    }, speed);
    
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [text, started, speed]);

  return <span>{displayText || ' '}</span>;
};

export default DecipherText;
