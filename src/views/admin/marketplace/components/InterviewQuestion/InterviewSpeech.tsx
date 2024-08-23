//InterviewQuestion
import React, { useState, useEffect, useRef } from 'react';
import 'responsivevoice';

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

interface InterviewSpeechProps {
  question: any;
  onNextQuestion: () => void;
}

const InterviewSpeech: React.FC<InterviewSpeechProps> = ({ question, onNextQuestion }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(0);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    speak("Welcome to the interview. Let's begin.")
      .then(() => startQuestionTimer());

    return () => {
      window.responsiveVoice.cancel();
      stopQuestionTimer();
    };
  }, []);

  useEffect(() => {
    setQuestionTimer(0);
    stopQuestionTimer();

    speak(question.question)
      .then(() => startQuestionTimer());

    return () => {
      window.responsiveVoice.cancel();
      stopQuestionTimer();
    };
  }, [question]);

  const speak = (text: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (isSpeaking) {
        window.responsiveVoice.cancel();
      }

      setIsSpeaking(true);
      window.responsiveVoice.speak(text, "Australian Female", {
        onstart: () => setIsSpeaking(true),
        onend: () => {
          setIsSpeaking(false);
          resolve();
        }
      });
    });
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

  return null;
};

export default InterviewSpeech;
