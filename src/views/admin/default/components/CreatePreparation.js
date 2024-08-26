import React, { useState, useEffect } from 'react';
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
import { EditIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createPreparationMaterial, resetPreparationMaterialCreate } from 'server/actions/actions1'; // Update the path accordingly

interface CreatePreparationModalProps {
  jobId: string; // or number, depending on your job ID type
}

export default function CreatePreparationModal({ jobId }: CreatePreparationModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const preparationMaterialCreate = useSelector((state) => state.preparationMaterialCreate);
  const { loading, error, success } = preparationMaterialCreate;

  const handleContinue = () => {
    dispatch(createPreparationMaterial(jobId));
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Preparation Material Is being Created",
        description: "Heads Up I will Notify you when your material is ready.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
      dispatch(resetPreparationMaterialCreate());
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [success, error, toast, onClose, dispatch]);

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
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme={buttonColorScheme}
            aria-label="Create Preparation Material"
            size="sm"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={textColor}>Proceed with Preparation Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={textColor}>Do you wish to proceed with creating preparation material for this job?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={buttonColorScheme} mr={3} onClick={handleContinue} isLoading={loading}>
              Continue
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
