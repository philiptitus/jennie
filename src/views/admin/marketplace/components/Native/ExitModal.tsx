//Native
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

type ExitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Exit Interview Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to leave the interview room?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExitModal;
