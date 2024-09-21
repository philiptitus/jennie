import { Box, SimpleGrid, Button, Icon, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Menu, MenuButton, MenuList, MenuItem, useToast, Spinner } from '@chakra-ui/react';
import { FaCheckCircle, FaBars } from 'react-icons/fa';  // Icon import
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import { useDispatch, useSelector } from 'react-redux';
import DevelopmentTable from 'views/admin/prep/components/DevelopmentTable';
import CheckTable from 'views/admin/prep/components/CheckTable';
import YouTubeTable from './components/YouTubeTable';
import CodingTable from './components/CodingTable';
import { markPreparationMaterial, resetPreparationMaterialMarking } from 'server/actions/actions1';
import PrepTable from './components/DevelopmentTable';
import InstructionModal from './components/InstructionModal';  // Import the InstructionModal

export default function Settings() {
  const { id = '1' } = useParams();  // Fetch id from URL parameters, default to '1' if not provided
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();  // Hook for toast notifications
  const dispatch = useDispatch();

  const preparationMaterialMarking = useSelector((state) => state.preparationMaterialMarking);
  const { loading, error } = preparationMaterialMarking;

  const [activeComponent, setActiveComponent] = useState('DevelopmentTable');
  const [showInstructionModal, setShowInstructionModal] = useState(true);  // State for the instruction modal

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loading) {
      timeoutId = setTimeout(() => {
        if (!error) {
          toast({
            title: "Submission Successful",
            description: "Your submission was a success. If you don't get your results notification within 5 minutes, please come back and submit again.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          onClose(); // Close the dialog after submission
        }
      }, 5000);
    }

    if (error) {
      toast({
        title: "Submission Failed",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(resetPreparationMaterialMarking());
      clearTimeout(timeoutId);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading, error, dispatch, toast, onClose]);

  const handleSubmit = () => {
    dispatch(markPreparationMaterial(id));
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'DevelopmentTable':
        return <PrepTable materialId={id} />;
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
        isLoading={loading}
        spinner={<Spinner size="sm" />}
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
          More Materials
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

      {/* Instruction Modal */}
      <InstructionModal
        isOpen={showInstructionModal}
        onClose={() => setShowInstructionModal(false)}
      />
    </Box>
  );
}
