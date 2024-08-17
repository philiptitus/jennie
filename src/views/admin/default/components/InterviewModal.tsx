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
  useColorModeValue 
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface ScheduleInterviewModalProps {
  jobId: string; // or number, depending on your job ID type
}

export default function ScheduleInterviewModal({ jobId }: ScheduleInterviewModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [interviewDateTime, setInterviewDateTime] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterviewDateTime(e.target.value);
  };

  const handleSubmit = () => {
    console.log({
      interview_datetime: interviewDateTime,
      job: jobId
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
            <FormControl mb={4}>
              <FormLabel color={textColor}>Interview Date & Time</FormLabel>
              <Input 
                type="datetime-local" 
                value={interviewDateTime} 
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
