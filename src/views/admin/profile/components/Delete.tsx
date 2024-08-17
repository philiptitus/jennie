import { Box, Button, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';

export default function DeleteAccountCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Account deleted');
    onClose();
  };

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
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
