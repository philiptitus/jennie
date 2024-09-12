import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useDispatch, useSelector } from 'react-redux';
import { getPreparationMaterialDetail, resetPreparationMaterialDetail } from 'server/actions/actions1'; // Update the path accordingly

export default function CheckTable({ materialId }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const toast = useToast();

  const dispatch = useDispatch();
  const preparationMaterialDetail = useSelector((state) => state.preparationMaterialDetail);
  const { loading, error, material } = preparationMaterialDetail;

  useEffect(() => {
    dispatch(getPreparationMaterialDetail(materialId));

    return () => {
      dispatch(resetPreparationMaterialDetail());
    };
  }, [dispatch, materialId]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while fetching the data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    if (!loading && material && material?.google_search_results && material.google_search_results?.length === 0) {
      toast({
        title: 'No Results',
        description: 'No Google search results found.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [loading, error, material, toast]);

  const data = useMemo(() => {
    if (material && material.google_search_results) {
      return material.google_search_results.map(result => ({
        id: result.id,
        title: result.title,
        snippet: result.snippet,
        link: result.link,
        attempted: result.attempted,
      }));
    }
    return [];
  }, [material]);

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }} h="auto">
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Some useful links for you
        </Text>
        <Menu />
      </Flex>
      <Box overflowY="auto">
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th borderColor={borderColor}>
                <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                  TITLE
                </Text>
              </Th>
              <Th borderColor={borderColor}>
                <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
                  ACTION
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((result) => (
              <Tr key={result.id}>
                <Td borderColor="transparent">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    {result.title}
                  </Text>
                </Td>
                <Td borderColor="transparent">
                  <IconButton
                    icon={<ExternalLinkIcon />}
                    aria-label="Open Link"
                    onClick={() => window.open(result.link, '_blank')}
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
