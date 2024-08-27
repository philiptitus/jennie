import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import store from 'server/store';
import { Provider } from 'react-redux';
import App from './App';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

// Function to dynamically load the responsiveVoice script with the key
const loadResponsiveVoiceScript = () => {
  const responsiveVoiceKey = process.env.REACT_APP_SPEECH_KEY;
  if (responsiveVoiceKey) {
    const script = document.createElement('script');
    script.src = `https://code.responsivevoice.org/responsivevoice.js?key=${responsiveVoiceKey}`;
    document.body.appendChild(script);
  } else {
    console.error("REACT_APP_SPEECH_KEY is not defined in the .env file");
  }
};

// Function to detect if the user is on a mobile device
const isMobileDevice = () => {
  return /Mobi|Android|iPhone/i.test(navigator.userAgent);
};

const Root = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadResponsiveVoiceScript();

    if (isMobileDevice()) {
      setIsMobile(true);
      onOpen();
    }
  }, [onOpen]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {isMobile ? (
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent maxW="90%" mx="auto" p={4}>
              <ModalHeader>Platform Not Available</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                This Platform is not available on mobile just yet. Check back soon.
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          <App />
        )}
      </BrowserRouter>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
