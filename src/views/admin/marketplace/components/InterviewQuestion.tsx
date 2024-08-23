import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ChatIcon, QuestionIcon } from '@chakra-ui/icons';

import VideoPlayer from './VideoPlayer';
import SliderModal from './SliderModal';
import QuestionInputModal from './QuestionInput';
import InterviewTimer from './InterviewQuestion/InterviewTimer';
import InterviewSpeech from './InterviewQuestion/InterviewSpeech';

type InterviewQuestionProps = {
  question: any;
  questionType: string;
  onNextQuestion: () => void;
};

const InterviewQuestion: React.FC<InterviewQuestionProps> = ({ question, questionType, onNextQuestion }) => {
  const [answer, setAnswer] = useState('');
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isSliderOpen2, setIsSliderOpen2] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const buttonColorScheme = useColorModeValue('teal', 'orange');
  const iconButtonColorScheme = useColorModeValue('blue', 'orange');

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

  const handleSkip = () => {
    onNextQuestion();
  };

  const handleSubmit = () => {
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
      <InterviewTimer onNextQuestion={onNextQuestion} />
      <InterviewSpeech question={question} onNextQuestion={onNextQuestion} />
      <Box flex="1" position="relative" bg="gray.800" overflow="hidden">
        <VideoPlayer isSpeaking={isSpeaking} />
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
      <QuestionInputModal
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

export default InterviewQuestion;
