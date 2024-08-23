//INterviewQuestion


import React, { useState, useEffect, useRef } from 'react';

interface InterviewTimerProps {
  onNextQuestion: () => void;
}

const InterviewTimer: React.FC<InterviewTimerProps> = ({ onNextQuestion }) => {
  const [timer, setTimer] = useState(0);
  const globalTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    globalTimerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 60) {
          clearInterval(globalTimerRef.current as NodeJS.Timeout);
          onNextQuestion();
        }
        return prevTimer + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (globalTimerRef.current) {
      clearInterval(globalTimerRef.current);
    }
  };

  return null;
};

export default InterviewTimer;
