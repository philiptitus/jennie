//NativeInterview
import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

interface InterviewCompletionDialogProps {
  isOpen: boolean;
  cancelRef: React.RefObject<HTMLButtonElement>;
  handleClose: () => void;
}

const InterviewCompletionDialog: React.FC<InterviewCompletionDialogProps> = ({
  isOpen,
  cancelRef,
  handleClose,
}) => {
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Interview Completed
          </AlertDialogHeader>

          <AlertDialogBody>
            Your interview session is finished. We will send your results to you very soon.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose} colorScheme="blue">
              Finish
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default InterviewCompletionDialog;
