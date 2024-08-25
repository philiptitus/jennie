import React, { useState } from 'react';
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

interface StartSessionModalProps {
  interviewId: string; // or number, depending on your interview ID type
}

export default function StartSessionModal({ interviewId }: StartSessionModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [job_id, setJobId] = useState(interviewId);
  const toast = useToast();

  const handleContinue = () => {
    console.log(`Starting interview session for ID: ${interviewId}`);
    // Implement the logic to start the interview session here

    toast({
      title: "Starting Interview Session",
      description: `I am making the interview session for interview ID ${interviewId}. Please be patient; you will get a notification when it's ready.`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });

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
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleContinue}>
              Continue
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
