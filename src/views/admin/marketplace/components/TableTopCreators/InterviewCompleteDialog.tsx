//TableTopCreators
import React from 'react';
import {
  AlertDialog, AlertDialogBody, AlertDialogFooter,
  AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function InterviewCompleteDialog({
  isOpen, cancelRef, onClose
}: {
  isOpen: boolean;
  cancelRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/admin/default');
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={handleClose}>
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
}
