// chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export function ItemContent(props: { message: string }) {
  const textColor = useColorModeValue("orange.700", "white");

  return (
    <>
      <Flex
        justify="center"
        align="center"
        borderRadius="16px"
        minH={{ base: "29.4px", md: "34.3px" }} // 70% of 42px and 49px
        h={{ base: "29.4px", md: "34.3px" }}
        minW={{ base: "29.4px", md: "34.3px" }}
        w={{ base: "29.4px", md: "34.3px" }}
        me="9.8px" // 70% of 14px
        bg="linear-gradient(135deg, #FFA500 0%, #FF4500 100%)"
      />

      <Flex flexDirection="column" maxW="60%" maxH="70%"> {/* Added maxWidth */}
        <Text
          mb="1.5px" // 70% of 5px
          fontWeight="bold"
          color={textColor}
          fontSize={{ base: "sm", md: "sm" }} // 70% of md
        >
          From Jennie
        </Text>

        <Flex alignItems="center" padding="7px" margin="7px 0" maxW="100%"> {/* Added maxWidth */}
          <Text
            fontSize={{ base: "xs", md: "xs" }} // 70% of sm
            lineHeight="100%"
            color={textColor}
            whiteSpace="pre-wrap" // Ensures the text wraps
            wordBreak="break-word" // Ensures long words are wrapped
            overflowWrap="break-word" // Ensures unbreakable strings wrap properly
            maxW="100%" // Limits the width to prevent overflow
          >
            {props.message}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
