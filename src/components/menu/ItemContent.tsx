// chakra imports
import { Icon, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { MdUpgrade } from "react-icons/md"; 

export function ItemContent(props: { message: string }) {
  const textColor = useColorModeValue("orange.700", "white");
  return (
    <>
<Flex
  justify='center'
  align='center'
  borderRadius='16px'
  minH={{ base: "42px", md: "49px" }}  // 70% of 60px and 70px
  h={{ base: "42px", md: "49px" }}
  minW={{ base: "42px", md: "49px" }}
  w={{ base: "42px", md: "49px" }}
  me='14px'
  bg='linear-gradient(135deg, #FFA500 0%, #FF4500 100%)'> 
</Flex>

      <Flex flexDirection='column'>
        <Text
          mb='5px'
          fontWeight='bold'
          color={textColor}
          fontSize={{ base: "md", md: "md" }}>
          From Jennie
        </Text>
        <Flex alignItems='center' padding='10px' margin='10px 0'>
      <Text
        fontSize={{ base: "sm", md: "sm" }}
        lineHeight='100%'
        color={textColor}
        whiteSpace='pre-wrap' // This ensures that the text wraps to the next line
      >
        {props.message}
      </Text>
    </Flex>
      </Flex>
    </>
  );
}
