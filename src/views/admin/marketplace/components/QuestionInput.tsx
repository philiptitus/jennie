import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Input, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import TimerDisplay from './TimerDisplay'; // Import the TimerDisplay component

type SliderModalProps = {
  isOpen: boolean;
  question: any;
  questionType: string;
  answer: string;
  setAnswer: (value: string) => void;
  onSkip: () => void;
  onSpeakAnswer: () => void;
  onClose: () => void;
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
};

const QuestionInputModal: React.FC<SliderModalProps> = ({
  isOpen,
  question,
  questionType,
  answer,
  setAnswer,
  onSkip,
  onSpeakAnswer,
  onClose,
  isSpeaking,
  setIsSpeaking,
}) => {
  // Chakra Color Mode
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const inputBgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.500');
  const buttonColorScheme = useColorModeValue('teal', 'orange');
  const iconButtonColorScheme = useColorModeValue('blue', 'orange');

  const [aiResponse, setAiResponse] = useState('');
  const [displayedResponse, setDisplayedResponse] = useState('');

  const dummyResponses = [
    "Sure, I can help with that.",
    "Let me clarify that for you.",
    "I understand your concern.",
    "Here's what you need to know.",
    "I'll provide the details you need."
  ];

  const handleSubmit = () => {
    const randomResponse = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
    setAiResponse(randomResponse);
    setDisplayedResponse('');
  };

  useEffect(() => {
    if (aiResponse) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedResponse(aiResponse.slice(0, i));
        i++;
        if (i > aiResponse.length) {
          clearInterval(interval);
          speak(aiResponse);
        }
      }, 50); // Adjust the interval to control the typing speed

      return () => clearInterval(interval);
    }
  }, [aiResponse]);

  const speak = (text: string) => {
    setIsSpeaking(true);
    window.responsiveVoice.speak(text, "Australian Female", {
      onend: () => setIsSpeaking(false),
    });
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={bgColor}
      backdropFilter="blur(10px)"
      maxH={isOpen ? '50vh' : '0'}
      overflowY="auto"
      borderRadius="md"
      transition="max-height 0.3s ease-in-out"
      zIndex={10}
    >
      <Box p={4}>
        <Text fontSize="xl" mb={4} color={textColor}>
          Should I clarify something on the question?
        </Text>
        <Text fontSize="lg" mb={4} color={textColor}>
          {question.question}
        </Text>
        <TimerDisplay /> {/* Use TimerDisplay to show the time */}
        <Flex direction="column" mb={4}>
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your issue here..."
            mb={2}
            bg={inputBgColor}
            color={textColor}
          />
          {aiResponse && (
            <Box mt={4}>
              <Text fontSize="lg" color={textColor}>
                Jennie's Response: {displayedResponse}
              </Text>
            </Box>
          )}
          <IconButton
            aria-label="Speak Answer"
            icon={<RepeatIcon />}
            colorScheme={iconButtonColorScheme}
            onClick={onSpeakAnswer}
          />
        </Flex>
        <Button colorScheme={buttonColorScheme} onClick={handleSubmit} mb={2}>
          <CheckIcon />
        </Button>
        <Button colorScheme={buttonColorScheme} mr={3} onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionInputModal;
