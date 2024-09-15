import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Input, Flex, IconButton, useColorModeValue, Spinner, useToast } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import TimerDisplay from './TimerDisplay'; // Import the TimerDisplay component
import { useDispatch, useSelector } from 'react-redux';
import { getAgent, askAgent, resetAskAgent, resetGetAgent } from '../../../../server/actions/actions2'; // Import the actions
import 'responsivevoice';

const NativeAgent = ({
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

  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, room } = useSelector(state => state.interviewRoomDetail);
  const { session } = useSelector(state => state.latestInterviewSession);
  const { response, success, loading: agentLoading, error: agentError } = useSelector(state => state.askAgent);
  const { loading: loadingGet, success: getSuccess, agent: agentResponse, error: getError } = useSelector(state => state.getAgent);

  const [aiResponse, setAiResponse] = useState('');
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!session || !session.id) {
      toast({
        title: 'Error',
        description: 'Session ID is missing',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const queryData = {
      question: question.question,
      query: answer,
    };

    dispatch(askAgent(session.id, queryData));
    setIsProcessing(true);

    setTimeout(() => {
      dispatch(getAgent());
    }, 10000);
  };

  useEffect(() => {
    if (getSuccess && agentResponse) {
      console.log(agentResponse);
      setAiResponse(agentResponse.response);
      setDisplayedResponse('');
      setIsProcessing(false);
    } else if (getError) {
      setIsProcessing(false);
      speak('Sorry, I am currently experiencing technical difficulties.');
    }
  }, [getSuccess, agentResponse, getError]);

  useEffect(() => {
    if (aiResponse) {
      setDisplayedResponse(aiResponse);
      speak(aiResponse);
    }
  }, [aiResponse]);

  const speak = (text) => {
    setIsSpeaking(true);
    window.responsiveVoice.speak(text, "Australian Female", {
      onstart: () => setIsSpeaking(true),
      onend: () => {
        setIsSpeaking(false);
        dispatch(resetGetAgent()); // Dispatch resetGetAgent action after speaking ends
      },
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
          {isProcessing && (
            <Box mt={4}>
              <Text fontSize="lg" color={textColor}>
                Jennie is thinking...
              </Text>
              <Spinner />
            </Box>
          )}
          {agentLoading && <Spinner />}
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

export default NativeAgent;
