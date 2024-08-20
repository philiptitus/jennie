import React, { useEffect, useState } from "react";
import { Box, Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import { ChatIcon, QuestionIcon, ViewIcon, ExternalLinkIcon, RepeatIcon } from '@chakra-ui/icons';
// Import the Lottie animation
import newAnimation from "../../../../../src/assets/lotties/welcome.json";

type InterviewIntroductionProps = {
  onStart: () => void;
};

function NewInterview({ onStart }: InterviewIntroductionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (showModal) {
      onOpen();
    }
  }, [showModal, onOpen]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleStartInterview = () => {
    onStart();
    handleClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" alignItems="center" justifyContent="center">
              <Box mb="4">
                <Lottie
                  loop
                  animationData={newAnimation}
                  play
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
              <Text textAlign="center" mb="4">
                Hi, I hope you are ready! We are about to start our session.
              </Text>
              {showInstructions ? (
                <VStack spacing={4} mb="4">
                  <Text>Instructions:</Text>
                  <Flex alignItems="center">
                    <IconButton
                      icon={<ChatIcon color="orange.500" />}
                      aria-label="Open Comment Slider"
                      bg="transparent"
                      _hover={{ bg: 'gray.700' }}
                      isDisabled
                    />
                    <Text ml="2">To answer A Question</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <IconButton
                      icon={<RepeatIcon color="orange.500" />}
                      aria-label="Open Comment Slider"
                      bg="transparent"
                      _hover={{ bg: 'gray.700' }}
                      isDisabled
                    />
                    <Text ml="2">To Use Your Voice To answer Questions</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <IconButton
                      icon={<QuestionIcon color="orange.500" />}
                      aria-label="Open Agent Slider"
                      bg="transparent"
                      _hover={{ bg: 'gray.700' }}
                      isDisabled
                    />
                    <Text ml="2">To ask Me any Clarifications</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <IconButton
                      icon={<ViewIcon color="orange.500" />}
                      aria-label="Toggle Video Player"
                      bg="transparent"
                      _hover={{ bg: 'gray.700' }}
                      isDisabled
                    />
                    <Text ml="2">To See Me In Person During the Interview (beta)</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <IconButton
                      icon={<ExternalLinkIcon color="orange.500" />}
                      aria-label="Exit Interview Room"
                      bg="transparent"
                      _hover={{ bg: 'gray.700' }}
                      isDisabled
                    />
                    <Text ml="2">Exit Interview Room</Text>
                  </Flex>
                  <Button onClick={handleStartInterview} colorScheme="teal">
                    Start Interview
                  </Button>
                </VStack>
              ) : (
                <Button onClick={handleShowInstructions} colorScheme="teal">
                  Let's Go
                </Button>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewInterview;
