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
  Text,
  Flex,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createInterview, resetInterviewCreate } from 'server/actions/actions1'; // Update the path accordingly

interface ScheduleInterviewModalProps {
  jobId: string; // or number, depending on your job ID type
}

export default function ScheduleInterviewModal({ jobId }: ScheduleInterviewModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [interview_datetime, setInterview_datetime] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const interviewCreate = useSelector((state) => state.interviewCreate);
  const { loading, error, success, redirectUrl, authRequired } = interviewCreate;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterview_datetime(e.target.value);
  };

  const handleSubmit = () => {
    if (authRequired && redirectUrl) {
      // Redirect to Google authentication page
      window.open(redirectUrl, '_blank');
      return;
    }

    if (!interview_datetime) {
      toast({
        title: "Error",
        description: "Please select an interview date and time.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const interviewDate = new Date(interview_datetime);

    if (interviewDate <= new Date()) {
      toast({
        title: "Invalid Date",
        description: "Please select a date later than today.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const interviewData = {
      interview_datetime: interviewDate.toISOString(), // Convert to ISO string with timezone info
      job: jobId,
    };

    dispatch(createInterview(interviewData));
  };

  useEffect(() => {
    if (authRequired && redirectUrl) {
      // Redirect to Google authentication page immediately
      window.open(redirectUrl, '_blank');
      return;
    }

    if (success) {
      toast({
        title: "Interview Scheduled",
        description: `Interview scheduled for ${interview_datetime}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form values
      setInterview_datetime('');
      onClose();
      dispatch(resetInterviewCreate());
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch(resetInterviewCreate());
    }
  }, [success, error, authRequired, redirectUrl, toast, onClose, dispatch, interview_datetime]);
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const buttonColorScheme = useColorModeValue('orange', 'orange');

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
            icon={<AddIcon />}
            onClick={onOpen}
            colorScheme={buttonColorScheme}
            aria-label="Schedule Interview"
            size="sm"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader color={textColor}>Schedule an Interview</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Box mb={4} p={4} bg={cardColor} borderRadius="md" boxShadow="md">
        <Text fontSize="sm" color="gray.600">
          <strong>Note:</strong> If you are redirected to a Google page, please follow the prompts and return here to try creating the interview again. My developer is working on automating this process soon! 😊
        </Text>
        <Text fontSize="sm" color="gray.600" mt={2}>
          I am trying to add the interview to your calendar and need your permission to make this possible, so you can get reminders. 😊
        </Text>
        <Text fontSize="sm" color="gray.600" mt={2}>
          You may not experience the Google flow when adding your first interview since you will be integrated into the calendar system within a few hours. We recommend waiting at least 5 hours after adding your first interview before scheduling another one to ensure proper integration. This only applies to your first two interviews.
        </Text>
      </Box>
      <FormControl mb={4} isInvalid={!interview_datetime}>
        <FormLabel color={textColor}>Interview Date & Time</FormLabel>
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
        Save Interview
      </Button>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </>
  );
}
