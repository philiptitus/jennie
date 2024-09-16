import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { markInterviewRoom, resetInterviewRoomMarking } from '../../../../../server/actions/actions2'; // Adjust the path as necessary

const InterviewCompletionDialog = ({ isOpen, cancelRef, handleClose, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { loading, error, success } = useSelector((state) => state.interviewRoomMarking);

  useEffect(() => {
    if (isOpen && id) {
      dispatch(markInterviewRoom(id));
    }
  }, [dispatch, isOpen, id]);

  useEffect(() => {
    if (success) {
      toast({
        title: 'Success',
        description: 'Interview response is being marked please check your notifications any moment from now for further updates and your email too.',
        status: 'success',
        duration: 10000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate('/admin/default');
      }, 2000);

      dispatch(resetInterviewRoomMarking());
    }
  }, [success, dispatch, navigate, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      dispatch(resetInterviewRoomMarking());
    }
  }, [error, dispatch, toast]);

  return (
    <>
      {loading && <Spinner size="xl" />}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Interview Completed
            </AlertDialogHeader>

            <AlertDialogBody>
              Your interview session with ID {id} is finished. We will send your results to you very soon.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose} colorScheme="blue">
                Finish
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default InterviewCompletionDialog;
