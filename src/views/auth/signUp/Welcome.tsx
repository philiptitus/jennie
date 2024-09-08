import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
// Import the Lottie animation
import newAnimation from "../../../../src/assets/lotties/new.json";

function WelcomeComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (showModal) {
      onOpen();
    }
  }, [showModal, onOpen]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
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
                Hi, welcome! My name is Jennie. I am here to help you ace your interviews...
              </Text>
              <Button onClick={handleClose} colorScheme="teal">
                Proceed
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WelcomeComponent;
