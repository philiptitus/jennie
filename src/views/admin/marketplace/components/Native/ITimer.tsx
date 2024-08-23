
//Native
import React, { useRef, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type TimerProps = {
  question: any;
  onNextQuestion: () => void;
  isSpeaking: boolean;
  setIsSpeaking: (isSpeaking: boolean) => void;
};

const Timer: React.FC<TimerProps> = ({ question, onNextQuestion, isSpeaking, setIsSpeaking }) => {
  const [timer, setTimer] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(0);
  const globalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const speak = (text: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  const startTimer = () => {
    globalTimerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 1800) { // 30 minutes
          clearInterval(globalTimerRef.current as NodeJS.Timeout);
          speak("Sorry But you have exceeded your time limit")
          showTimeUpAlert();
        } else if (prevTimer >= 750) { // 12.5 minutes
          speak("We have used up half of our time here, please try to be a little quicker")
            .then(onNextQuestion);
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

  const startQuestionTimer = () => {
    questionTimerRef.current = setInterval(() => {
      setQuestionTimer((prevTimer) => {
        if (prevTimer >= 15) {
          clearInterval(questionTimerRef.current as NodeJS.Timeout);
          speak("I will just move on to the next question.")
            .then(onNextQuestion);
        }
        return prevTimer + 1;
      });
    }, 1000);
  };

  const stopQuestionTimer = () => {
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
    }
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

  useEffect(() => {
    speak("Welcome to the interview. Let's begin.")
      .then(() => startTimer());

    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    setQuestionTimer(0);
    stopQuestionTimer();

    speak(question.question)
      .then(() => startQuestionTimer());

    return () => {
      stopQuestionTimer();
    };
  }, [question]);

  return null;
};

export default Timer;
