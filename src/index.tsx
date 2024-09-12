import './assets/css/App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
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

const Root = () => {
  useEffect(() => {
    loadResponsiveVoiceScript();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
