import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Spinner, useToast, Tooltip } from '@chakra-ui/react';
import { FaMicrophone } from 'react-icons/fa';

const Analyze = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const toast = useToast();
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const email = 'mrphilipowade@gmail.com'; // Dummy email for the form data

  // Helper to stop recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Helper to handle form submission
  const handleSubmit = (videoBlob) => {
    const formData = new FormData();
    formData.append('video', videoBlob, 'recording.webm'); // Append video
    formData.append('email', email); // Append email

    // Dummy fetch request to an action (Replace with actual API endpoint)
    fetch('http://13.61.2.18:8000/analyze/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: 'Video submitted successfully!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch((error) => {
        toast({
          title: 'Error submitting video',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Trigger video recording for 1 minute
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setStream(stream);

      recorder.ondataavailable = (event) => {
        const videoBlob = new Blob([event.data], { type: 'video/webm' });
        console.log('Video Blob recorded:', videoBlob);
        handleSubmit(videoBlob); // Automatically submit after recording
      };

      recorder.onstop = () => {
        setIsRecording(false);
        toast({
          title: 'Recording stopped',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      };

      recorder.start();
      setIsRecording(true);

      // Stop recording after 1 minute
      timerRef.current = setTimeout(() => {
        mediaRecorder.stop();
      }, 60000);

    } catch (error) {
      toast({
        title: 'Permission denied or an error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle scroll visibility, stop recording if out of view
  const handleVisibility = () => {
    if (containerRef.current) {
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      const isVisible = top >= 0 && bottom <= window.innerHeight;
      if (!isVisible && isRecording) {
        stopRecording();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisibility);
    return () => {
      window.removeEventListener('scroll', handleVisibility);
      if (isRecording) {
        stopRecording();
      }
    };
  }, [isRecording]);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(tooltipTimer);
  }, []);

  // UI rendering
  return (
    <Box ref={containerRef} textAlign="center" p={4}>
      <Tooltip
        label="Click this icon if you want to measure your calmness during the interview. This is powered by the Gamma API."
        isOpen={showTooltip}
        placement="top"
      >
        <IconButton
          icon={<FaMicrophone />}
          colorScheme={isRecording ? 'green' : 'red'}
          aria-label="Record Video"
          onClick={isRecording ? stopRecording : startRecording}
          isRound
          size="lg"
          _hover={{ transform: 'scale(1.1)', transition: '0.2s' }}
        />
      </Tooltip>
      {/* {isRecording && (
        <Box mt={2} color="green.500">
          <Spinner />
        </Box>
      )} */}
    </Box>
  );
};

export default Analyze;
