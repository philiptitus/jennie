import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import Lottie from "react-lottie-player";
// Import the Lottie animation
import lottie404 from "../../../../src/assets/lotties/404.json";

function NotFoundPage() {
  const textColor = useColorModeValue("orange.700", "white");
  const textColorSecondary = "gray.400";

  return (
      <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex="0"
        >
          <Lottie
            loop
            animationData={lottie404}
            play
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Flex
          zIndex="1"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
          alignItems="center"
          justifyContent="center"
        >

        </Flex>
      </Flex>
  );
}

export default NotFoundPage;
