import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from 'server/constants/API';

const Test: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
        setLoading(true);
        // Make a request to your backend, which will forward the request to the external API
        const response = await axios.get(`${API_URL}/api/v1/answers/?name=moon`, config);
        setResults(response.data.results);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return null; // Error message is already shown via toast, so we can return null here.
  }

  return (
    <Box maxW="600px" mx="auto" mt="20">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Results</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map((result, index) => (
            <Tr key={index}>
              <Td>{result}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Test;
