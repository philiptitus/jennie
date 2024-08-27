import { Box, SimpleGrid, Button, Icon, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Menu, MenuButton, MenuList, MenuItem, useToast } from '@chakra-ui/react';
import { FaCheckCircle, FaBars } from 'react-icons/fa';  // Icon import
import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import DevelopmentTable from 'views/admin/prep/components/DevelopmentTable';
import CheckTable from 'views/admin/prep/components/CheckTable';
import YouTubeTable from './components/YouTubeTable';
import CodingTable from './components/CodingTable';

export default function Settings() {
  const { id = '1' } = useParams<{ id?: string }>();  // Fetch id from URL parameters, default to '1' if not provided
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();  // Hook for toast notifications

  const [activeComponent, setActiveComponent] = useState('DevelopmentTable');

  const handleSubmit = () => {
    // Add your submit logic here, using the id
    console.log("Marked as Submitted with ID:", id);

    // Show toast message
    toast({
      title: "Submission Successful",
      description: "Your submission was a success. If you don't get your results within 10 minutes, please come back and submit again.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    onClose(); // Close the dialog after submission
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'DevelopmentTable':
        return <DevelopmentTable materialId={id} />;
      case 'CodingTable':
        return <CodingTable materialId={id} />;
      case 'CheckTable':
        return <CheckTable materialId={id} />;
      case 'YouTubeTable':
        return <YouTubeTable materialId={id}  />;
      default:
        return <DevelopmentTable materialId={id} />;
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Button
        leftIcon={<Icon as={FaCheckCircle} />}  // Icon with text
        colorScheme="orange"  // Adjust to your brand color
        mb="20px"  // Margin below the button
        onClick={onOpen}
      >
        Submit for Marking
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Submit for Marking
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to submit this for marking? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={handleSubmit} ml={3}>
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Box mb="20px">
        <Menu>
          <MenuButton as={Button} leftIcon={<Icon as={FaBars} />} colorScheme="orange">
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setActiveComponent('DevelopmentTable')}>
              Normal Questions
            </MenuItem>
            <MenuItem onClick={() => setActiveComponent('CodingTable')}>
              Code Quiz
            </MenuItem>
            <MenuItem onClick={() => setActiveComponent('CheckTable')}>
              Useful Links
            </MenuItem>
            <MenuItem onClick={() => setActiveComponent('YouTubeTable')}>
              YouTube Videos
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <SimpleGrid mb="20px" columns={{ sm: 1, md: 2, lg: 1 }} spacing={{ base: '20px', xl: '20px' }}>
        {renderActiveComponent()}
      </SimpleGrid>
    </Box>
  );
}
