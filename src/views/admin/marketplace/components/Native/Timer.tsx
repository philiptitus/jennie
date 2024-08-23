//Native
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type TimerProps = {
  onTimeUp: () => void;
  onNextQuestion: () => void;
};

const Timer: React.FC<TimerProps> = ({ onTimeUp, onNextQuestion }) => {
  const [timer, setTimer] = useState(0);
  const globalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    globalTimerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 1800) { // 30 minutes
          clearInterval(globalTimerRef.current as NodeJS.Timeout);
          onTimeUp();
        } else if (prevTimer >= 750) { // 12.5 minutes
          speak("We have used up half of our time here, please try to be a little quicker")
            .then(onNextQuestion);
        }
        return prevTimer + 1;
      });
    }, 1000);

    return () => {
      if (globalTimerRef.current) {
        clearInterval(globalTimerRef.current);
      }
    };
  }, []);

  const speak = (text: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  const showTimeUpAlert = () => {
    toast({
      title: "Time's up!",
      description: "Sorry, but your time is up. I am currently marking your work right now. Please be faster next time.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      onCloseComplete: () => navigate('/admin/default/'),
    });
  };

  return null;
};

export default Timer;
