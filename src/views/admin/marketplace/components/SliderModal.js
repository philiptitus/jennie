import React from 'react';
import { Box, Button, Text, Input, Flex, IconButton, useColorModeValue, useToast, Spinner } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import TimerDisplay from './TimerDisplay'; // Import the TimerDisplay component
import CodeEditorModal from 'views/admin/prep/components/CodingTable/CodeEditor';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateInterviewBlock,
  resetInterviewBlockUpdate,
  updateInterviewCodingQuestion,
  resetInterviewCodingQuestionUpdate,
} from '../../../../server/actions/actions2'; // Update the path to your actions

const SliderModal = ({
  isOpen,
  question,
  questionType,
  answer,
  setAnswer,
  onSubmit,
  onSkip,
  onSpeakAnswer,
  onClose,
}) => {
  // Chakra Color Mode
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const inputBgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.500');
  const buttonColorScheme = useColorModeValue('teal', 'orange');
  const iconButtonColorScheme = useColorModeValue('blue', 'orange');

  const dispatch = useDispatch();
  const toast = useToast();

  const { loading: blockLoading, error: blockError, success: blockSuccess } = useSelector(
    (state) => state.interviewBlockUpdate
  );
  const { loading: codingLoading, error: codingError, success: codingSuccess } = useSelector(
    (state) => state.interviewCodingQuestionUpdate
  );

  const handleSubmit = () => {
    if (question.type === 'block') {
      dispatch(updateInterviewBlock(question.id, { my_answer: answer }));
    } else if (question.type === 'coding_question') {
      dispatch(updateInterviewCodingQuestion(question.id, { my_answer: answer }));
    }
  };

  React.useEffect(() => {
    if (blockSuccess || codingSuccess) {
      toast({
        title: 'Success',
        description: 'Answer saved.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      dispatch(resetInterviewBlockUpdate());
      dispatch(resetInterviewCodingQuestionUpdate());
      onSkip(); // Trigger onSkip on success
    }

    if (blockError || codingError) {
      toast({
        title: 'Error',
        description: blockError || codingError,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [blockSuccess, codingSuccess, blockError, codingError, dispatch, toast, onSkip]);

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
          {questionType === 'interview' ? 'Interview Question' : 'Coding Question'}
        </Text>
        <Text fontSize="lg" mb={4} color={textColor}>
          {question.question}
        </Text>
        <TimerDisplay /> {/* Use TimerDisplay to show the time */}
        <Flex direction="column" mb={4}>
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            mb={2}
            bg={inputBgColor}
            color={textColor}
          />
          <IconButton
            aria-label="Speak Answer"
            icon={<RepeatIcon />}
            colorScheme={iconButtonColorScheme}
            onClick={onSpeakAnswer}
          />
        </Flex>
        <Button colorScheme={buttonColorScheme} onClick={handleSubmit} mb={2}>
          {blockLoading || codingLoading ? <Spinner size="sm" /> : <CheckIcon />}
        </Button>
        <Button colorScheme="gray" onClick={onSkip}>
          <CloseIcon />
        </Button>
        <Button colorScheme={buttonColorScheme} mr={3} onClick={onClose}>
          Close
        </Button>
        <Button colorScheme={buttonColorScheme} mr={3}>
          <CodeEditorModal/>
        </Button>
      </Box>
    </Box>
  );
};

export default SliderModal;
