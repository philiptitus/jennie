import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ChatIcon, QuestionIcon } from '@chakra-ui/icons';

import VideoPlayer from './VideoPlayer';
import SliderModal from './SliderModal'; // Import the SliderModal component
import QuestionInputModal from './QuestionInput';
import Active from './Active';
import NativeAgent from './NativeAgent';

type InterviewQuestionNativeProps = {
  question: any;
  questionType: string;
  onNextQuestion: () => void;
};

const InterviewQuestionNative: React.FC<InterviewQuestionNativeProps> = ({ question, questionType, onNextQuestion }) => {
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isSliderOpen2, setIsSliderOpen2] = useState(false);

  const globalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const buttonColorScheme = useColorModeValue('teal', 'orange');
  const iconButtonColorScheme = useColorModeValue('blue', 'orange');

  useEffect(() => {
    speak("Welcome to the interview. Let's begin.")
      .then(() => startTimer());

    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    setAnswer('');
    setQuestionTimer(0);
    stopQuestionTimer();

    speak(question.question)
      .then(() => startQuestionTimer());

    return () => {
      stopQuestionTimer();
    };
  }, [question]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setAnswer(transcript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  }, []);

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
        if (prevTimer >= 60) {
          clearInterval(globalTimerRef.current as NodeJS.Timeout);
          speak("The interview has ended. Thank you.")
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
            .then(handleSkip);
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

  const handleSkip = () => {
    stopQuestionTimer();
    onNextQuestion();
  };

  const handleSubmit = () => {
    stopQuestionTimer();
    onNextQuestion();
  };

  const handleSpeakAnswer = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };
  const toggleSlider2 = () => {
    setIsSliderOpen2(!isSliderOpen2);
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box flex="1" position="relative" bg="gray.800" overflow="hidden">
        {/* <VideoPlayer isSpeaking={isSpeaking} /> */}
        <Active/>
        <Box position="absolute" bottom="20px" right="20px" display="flex" gap="10px">
          <IconButton
            icon={<ChatIcon color="orange.500" />}
            onClick={toggleSlider}
            aria-label="Open Comment Slider"
            bg="transparent"
            _hover={{ bg: 'gray.700' }}
          />
          <IconButton
            icon={<QuestionIcon color="orange.500" />}
            onClick={toggleSlider2}
            aria-label="Open Agent Slider"
            bg="transparent"
            _hover={{ bg: 'gray.700' }}
          />
        </Box>
      </Box>
      <SliderModal
        isOpen={isSliderOpen}
        question={question}
        questionType={questionType}
        answer={answer}
        setAnswer={setAnswer}
        onSubmit={handleSubmit}
        onSkip={handleSkip}
        onSpeakAnswer={handleSpeakAnswer}
        onClose={toggleSlider}
      />
      <NativeAgent
        isOpen={isSliderOpen2}
        question={question}
        questionType={questionType}
        answer={answer}
        setAnswer={setAnswer}
        onSkip={handleSkip}
        onSpeakAnswer={handleSpeakAnswer}
        onClose={toggleSlider2}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
      />
    </Box>
  );
};

export default InterviewQuestionNative;
