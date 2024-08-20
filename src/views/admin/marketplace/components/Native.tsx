import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, useColorModeValue, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import { ChatIcon, QuestionIcon, ViewIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

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
  const [showVideoPlayer, setShowVideoPlayer] = useState(false); // State to toggle between Active and VideoPlayer
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // State to manage the exit modal

  const globalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const buttonColorScheme = useColorModeValue('teal', 'orange');
  const iconButtonColorScheme = useColorModeValue('blue', 'orange');
  const navigate = useNavigate();
  const toast = useToast();

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

  const toggleVideoPlayer = () => {
    setShowVideoPlayer(!showVideoPlayer);
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

  const openExitModal = () => {
    setIsExitModalOpen(true);
  };

  const closeExitModal = () => {
    setIsExitModalOpen(false);
  };

  const confirmExit = () => {
    closeExitModal();
    navigate('/admin/default/');
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box flex="1" position="relative" bg="gray.800" overflow="hidden">
        {showVideoPlayer ? (
          <VideoPlayer isSpeaking={isSpeaking} />
        ) : (
          <Active />
        )}
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
          <IconButton
            icon={<ViewIcon color="orange.500" />}
            onClick={toggleVideoPlayer}
            aria-label="Toggle Video Player"
            bg="transparent"
            _hover={{ bg: 'gray.700' }}
          />
          <IconButton
            icon={<ExternalLinkIcon color="orange.500" />}
            onClick={openExitModal}
            aria-label="Exit Interview Room"
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
      <Modal isOpen={isExitModalOpen} onClose={closeExitModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exit Interview Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to leave the interview room?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmExit}>
              Yes
            </Button>
            <Button variant="ghost" onClick={closeExitModal}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InterviewQuestionNative;
