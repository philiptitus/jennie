import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createInterviewRoom, resetCreateInterviewRoom } from 'server/actions/actions1'; // Update the path accordingly

interface StartSessionModalProps {
  interviewId: string; // or number, depending on your interview ID type
}

export default function StartSessionModal({ interviewId }: StartSessionModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const interviewRoomCreate = useSelector((state) => state.interviewRoomCreate);
  const { loading, error } = interviewRoomCreate;

  const handleContinue = () => {
    const roomData = {
      job_id: interviewId,
    };

    dispatch(createInterviewRoom(roomData));
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loading) {
      timeoutId = setTimeout(() => {
        if (!error) {
          toast({
            title: "Starting Interview Session",
            description: `I am making the interview session for interview ID ${interviewId}. Please be patient; you will get a notification when it's ready, if you don't within 3 minutes try again.`,
            status: "info",
            duration: 10000,
            isClosable: true,
          });
          onClose();
        }
      }, 5000);
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch(resetCreateInterviewRoom());
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading, error, toast, onClose, dispatch, interviewId]);

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const buttonColorScheme = useColorModeValue('blue', 'orange');

  return (
    <>
      <Box
        p="20px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow={cardShadow}
        bg={cardColor}
        maxW="sm"
        mb={6}
        alignItems="center"
        flexDirection="column"
      >
        <Flex justify="center">
          <IconButton
            icon={<ArrowForwardIcon />}
            onClick={onOpen}
            colorScheme={buttonColorScheme}
            aria-label="Start Interview Session"
            size="sm"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Start Interview Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor}>Do you want to start your interview session now?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleContinue} isLoading={loading}>
              Continue
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
 