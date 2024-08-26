import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'assets/css/MiniCalendar.css';
import {
  Text,
  Icon,
  Box,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Card from 'components/card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInterviewList, resetUserInterviewList } from 'server/actions/actions1'; // Update the path accordingly

export default function MiniCalendar(props) {
  const { selectRange, ...rest } = props;
  const [value, setValue] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvents, setSelectedEvents] = useState(null);

  const dispatch = useDispatch();
  const userInterviewList = useSelector((state) => state.userInterviewList);
  const { loading, error, interviews } = userInterviewList;

  const toast = useToast();

  useEffect(() => {
    dispatch(getUserInterviewList());

    return () => {
      dispatch(resetUserInterviewList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading interviews.",
        description: "There was an error while loading the interview list. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleChange = (value) => {
    setValue(value);

    const formattedDate = value instanceof Date ? value.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    const dayEvents = interviews.filter(event => {
      const eventDate = new Date(event.interview_datetime).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return eventDate === formattedDate;
    });

    if (dayEvents.length > 0) {
      setSelectedEvents({ date: formattedDate, events: dayEvents.map(event => ({ job_name: event.job_name, interview_datetime: event.interview_datetime })) });
      onOpen();
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      if (interviews.some(event => {
        const eventDate = new Date(event.interview_datetime).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        return eventDate === formattedDate;
      })) {
        return 'highlight';
      }
    }
    return null;
  };

  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Heading as="h3" size="lg" mb="20px">
        My Calendar
      </Heading>
      
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Calendar
          onChange={handleChange}
          value={value}
          selectRange={selectRange}
          view={'month'}
          tileClassName={tileClassName}
          prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
          nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
        />
      )}

      {selectedEvents && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Interviews on {selectedEvents.date}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <List spacing={3}>
                {selectedEvents.events.map((event, index) => (
                  <ListItem key={index}>
                    <Text fontWeight="bold">{new Date(event.interview_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:</Text> {event.job_name}
                  </ListItem>
                ))}
              </List>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
}
