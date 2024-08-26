import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateInterview, resetInterviewUpdate } from 'server/actions/actions1'; // Update the path accordingly

interface ChangeInterviewDateTimeModalProps {
  interviewId: string; // or number, depending on your interview ID type
}

export default function ChangeInterviewDateTimeModal({ interviewId }: ChangeInterviewDateTimeModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [interview_datetime, setInterviewDateTime] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const interviewUpdate = useSelector((state) => state.interviewUpdate);
  const { loading, error, success } = interviewUpdate;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterviewDateTime(e.target.value);
  };

  const handleSubmit = () => {
    if (!interview_datetime) {
      toast({
        title: "Error",
        description: "Please select a new interview date and time.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (new Date(interview_datetime) <= new Date()) {
      toast({
        title: "Invalid Date",
        description: "Please select a date later than today.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const interviewDate = new Date(interview_datetime);

    const interviewData = {
      new_interview_datetime: interviewDate.toISOString(),
    };

    dispatch(updateInterview(interviewId, interviewData));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Interview Date & Time Updated",
        description: `The new interview date and time is: ${interview_datetime}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
      dispatch(resetInterviewUpdate());
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      dispatch(resetInterviewUpdate());
    }
  }, [success, error, toast, onClose, dispatch, interview_datetime]);

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
            icon={<CalendarIcon />}
            onClick={onOpen}
            colorScheme={buttonColorScheme}
            aria-label="Change Interview Date & Time"
            size="sm"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Change Interview Date & Time</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel color={textColor}>New Interview Date & Time</FormLabel>
              <Input
                type="datetime-local"
                value={interview_datetime}
                onChange={handleInputChange}
                bg={cardColor}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleSubmit} isLoading={loading}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
