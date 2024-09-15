import React, { useState } from 'react';
import { Box, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ChatIcon, QuestionIcon, ViewIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import VideoPlayer from './VideoPlayer';
import SliderModal from './SliderModal';
import QuestionInputModal from './QuestionInput';
import Active from './Active';
import NativeAgent from './NativeAgent';
import Timer from './Native/ITimer';
import SpeechRecognition from './Native/SpeechRecognition';
import ExitModal from './Native/ExitModal';
import CodeEditorModal from 'views/admin/prep/components/CodingTable/CodeEditor';

type InterviewQuestionNativeProps = {
  question: any;
  questionType: string;
  onNextQuestion: () => void;
};

const InterviewQuestionNative: React.FC<InterviewQuestionNativeProps> = ({ question, questionType, onNextQuestion }) => {
  const [answer, setAnswer] = useState('');
  const [isSliderOpen, setIsSliderOpen] = useState(true);
  const [isSliderOpen2, setIsSliderOpen2] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const buttonColorScheme = useColorModeValue('teal', 'orange');
  const iconButtonColorScheme = useColorModeValue('blue', 'orange');
  const navigate = useNavigate();

  const { handleSpeakAnswer } = SpeechRecognition({ setAnswer });

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const toggleSlider2 = () => {
    setIsSliderOpen2(!isSliderOpen2);
  };

  const toggleVideoPlayer = () => {
    setShowVideoPlayer(!showVideoPlayer);
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
        onSubmit={onNextQuestion}
        onSkip={onNextQuestion}
        onSpeakAnswer={handleSpeakAnswer}
        onClose={toggleSlider}
      />
      <NativeAgent
        isOpen={isSliderOpen2}
        question={question}
        questionType={questionType}
        answer={answer}
        setAnswer={setAnswer}
        onSkip={onNextQuestion}
        onSpeakAnswer={handleSpeakAnswer}
        onClose={toggleSlider2}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
      />
      <ExitModal isOpen={isExitModalOpen} onClose={closeExitModal} onConfirm={confirmExit} />
      <Timer question={question} onNextQuestion={onNextQuestion} isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />
    </Box>
  );
};

export default InterviewQuestionNative;
