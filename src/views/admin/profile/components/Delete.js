import React, { useEffect } from "react";
import { Box, Button, Text, useColorModeValue, useDisclosure, useToast, Spinner } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, resetAccountDelete } from "server/actions/userAction"; // Update the path accordingly
import { useNavigate } from "react-router-dom";

export default function DeleteAccountCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const accountDelete = useSelector((state) => state.accountDelete);
  const { error, loading, success } = accountDelete;

	const clientId = '6pul2opu2dt6i086o3deg4nis9'; // Replace with your Cognito App Client ID
	const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback'); // Always use encodeURIComponent
	const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com'; // Your Cognito domain
  
	const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
  const handleDelete = () => {
    dispatch(deleteAccount());
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(cognitoLoginUrl); // Redirect to the sign-in page
      dispatch(resetAccountDelete()); // Reset the state
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
  }, [success, error, navigate, toast, dispatch]);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  return (
    <Card mb={{ base: '0px', lg: '20px' }} alignItems='center'>
      <Box textAlign="center" p="6">
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mb="4">
          Delete Account
        </Text>
        <Text color={textColorSecondary} fontSize="md" mb="8">
          If you delete your account, all your data will be permanently removed. This action cannot be undone.
        </Text>
        <Button colorScheme="red" onClick={onOpen}>
          Delete Account
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to delete your account? This action is irreversible.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={loading}>
              {loading ? <Spinner /> : "Confirm Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
