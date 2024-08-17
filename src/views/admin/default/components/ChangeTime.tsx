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
  Flex,
  useColorModeValue 
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

interface ChangeInterviewDateTimeModalProps {
  interviewId: string; // or number, depending on your interview ID type
}

export default function ChangeTime({ interviewId }: ChangeInterviewDateTimeModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newDateTime, setNewDateTime] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDateTime(e.target.value);
  };

  const handleSubmit = () => {
    console.log({
      interview_id: interviewId,
      new_interview_datetime: newDateTime,
    });
    // Implement the API call or logic to update the interview datetime
    onClose();
  };

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
                value={newDateTime} 
                onChange={handleInputChange} 
                bg={cardColor}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
