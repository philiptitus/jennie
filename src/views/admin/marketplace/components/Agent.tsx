import React, { useEffect, useRef, useCallback } from 'react';

type AgentProps = {
  onSkipQuestion: () => void;
  onEndSession: () => void;
  onStartSession: () => void;
  isSpeaking: boolean;
  totalTime: number;
  currentQuestionTime: number;
};

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;

  function debounced(this: any, ...args: any[]) {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(context, args), wait);
  }

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

const Agent: React.FC<AgentProps> = ({
  onSkipQuestion,
  onEndSession,
  onStartSession,
  isSpeaking,
  totalTime,
  currentQuestionTime,
}) => {
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const endSessionMessageSpokenRef = useRef<boolean>(false);
  const skipQuestionMessageSpokenRef = useRef<boolean>(false);

  const speak = useCallback(
    debounce((text: string, voice: string, options: any) => {
      if (!isSpeaking) {
        window.responsiveVoice.speak(text, voice, options);
      }
    }, 500),
    [isSpeaking]
  );

  useEffect(() => {
    // Start the session
    onStartSession();

    // End the session after 25 minutes
    sessionTimeoutRef.current = setTimeout(() => {
      if (!endSessionMessageSpokenRef.current) {
        speak("We have come to the end of our session. Thanks for attending. I will be sharing the results with you soon.", "Australian Female", {
          onend: () => {
            onEndSession();
            endSessionMessageSpokenRef.current = true;
          },
        });
      }
    }, 25 * 60 * 1000); // 25 minutes

    return () => {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
      speak.cancel();
    };
  }, [onEndSession, onStartSession, speak]);

  useEffect(() => {
    if (currentQuestionTime >= 60 && !isSpeaking && !skipQuestionMessageSpokenRef.current && !endSessionMessageSpokenRef.current) {
      speak("Let's just skip that question for now.", "Australian Female", {
        onend: () => {
          onSkipQuestion();
          skipQuestionMessageSpokenRef.current = true;
        },
      });
    }

    if (currentQuestionTime < 60) {
      skipQuestionMessageSpokenRef.current = false;
    }
  }, [currentQuestionTime, isSpeaking, onSkipQuestion, speak]);

  return null;
};

export default Agent;
