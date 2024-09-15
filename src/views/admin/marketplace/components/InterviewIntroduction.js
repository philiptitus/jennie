import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Flex, Image, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import NewInterview from './New';
import ExpiredSessionModal from './ExpiredSessionModal';
import { getLatestInterviewSession, resetLatestInterviewSession } from '../../../../server/actions/actions1';

const InterviewIntroduction = ({ onStart }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const { loading, error, session } = useSelector(state => state.latestInterviewSession);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
  const bgColor = useColorModeValue('white', 'gray.800');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expiredTime, setExpiredTime] = useState(null);

  useEffect(() => {
    dispatch(getLatestInterviewSession());

    // return () => {
    //   dispatch(resetLatestInterviewSession());
    // };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      dispatch(resetLatestInterviewSession());
    }

    if (session) {
      const currentTime = new Date();
      const sessionStartTime = new Date(session.start_time);
      const timeDifference = (currentTime - sessionStartTime) / (1000 * 60 * 60); // in hours

      if (timeDifference > 2) {
        setExpiredTime(timeDifference.toFixed(2));
        setIsModalOpen(true);

        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/admin/default');
        }, 5000);
      } else {
        toast({
          title: 'Success',
          description: 'Latest interview session found.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      }
    }
  }, [error, session, toast, navigate, dispatch]);

  if (loading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg={bgColor}
        borderRadius="md"
        p="6"
        boxShadow="lg"
        textAlign="center"
        w="100%"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg={bgColor}
        borderRadius="md"
        p="6"
        boxShadow="lg"
        textAlign="center"
        w="100%"
      >
        <Text color={textColor}>You don't have any session with me right now or it may not be ready yet. Please check in later.</Text>
      </Flex>
    );
  }

  if (session) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg={bgColor}
        borderRadius="md"
        p="6"
        boxShadow="lg"
        textAlign="center"
        w="100%"
      >
        <NewInterview onStart={onStart} />
        <ExpiredSessionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} expiredTime={expiredTime} />
      </Flex>
    );
  }

  return null;
};

export default InterviewIntroduction;
