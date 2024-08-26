import React, { useEffect } from 'react';
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
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, resetJobDelete } from 'server/actions/actions1'; // Update the path accordingly

interface DeleteJobModalProps {
  jobId: string; // or number, depending on your job ID type
}

export default function DeleteJobModal({ jobId }: DeleteJobModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const jobDelete = useSelector((state) => state.jobDelete);
  const { loading, error, success } = jobDelete;

  const handleDelete = () => {
    dispatch(deleteJob(jobId));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Job Deleted",
        description: `The job with ID ${jobId} was successfully deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
      dispatch(resetJobDelete());
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      dispatch(resetJobDelete());
    }
  }, [success, error, toast, onClose, dispatch, jobId]);

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardColor = useColorModeValue('white', 'orange.700');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'unset');
  const buttonColorScheme = useColorModeValue('red', 'orange');

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
            icon={<DeleteIcon />}
            onClick={onOpen}
            colorScheme={buttonColorScheme}
            aria-label="Delete Job"
            size="sm"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor}>Are you sure you want to delete this job?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleDelete} isLoading={loading}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
