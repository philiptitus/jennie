import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, OrderedList, ListItem } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function InstructionModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Instructions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrderedList>
            <ListItem mb="4">
              Always click "Send" immediately after answering the question for your answer to be saved.
            </ListItem>
            <ListItem mb="4">
              The correct answer shown in some of the questions is not a completely correct answer but an AI suggestion of what the answer to the question might be.
            </ListItem>
            <ListItem mb="4">
              Clicking on "View Answer" will automatically disqualify you from submitting an answer for the question. So make sure you submit your response before checking the correct answer.
            </ListItem>
            <ListItem mb="4">
              In the code section, you can click on the <ChevronRightIcon /> icon to open the code editor if you need to test your code.
            </ListItem>
          </OrderedList>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Got it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
