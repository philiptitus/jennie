import React, { useState } from 'react';
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

interface ScheduleInterviewModalProps {
  jobId: string; // or number, depending on your job ID type
}

export default function ScheduleInterviewModal({ jobId }: ScheduleInterviewModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [job, setjob] = useState(jobId);

  const [interview_datetime, setinterview_datetime] = useState('');
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinterview_datetime(e.target.value);
  };

  const handleSubmit = () => {
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

    console.log({
      interview_datetime: interview_datetime,
      job: jobId,
    });

    toast({
      title: "Interview Scheduled",
      description: `Interview scheduled for ${interview_datetime}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onClose();
  };

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
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleSubmit}>
              Save Interview
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
