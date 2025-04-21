import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import illustration from "assets/img/auth/auth.png";
import { useSelector, useDispatch } from 'react-redux';
import { reset_password } from '../../../server/actions/userAction';
import { NavLink } from "react-router-dom";

function ResetPassword() {
  const textColor = useColorModeValue("orange.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("orange.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const dispatch = useDispatch();

  const resetPassword = useSelector((state) => state.resetPassword);
  const { error, loading, success } = resetPassword;

  const clientId = '6pul2opu2dt6i086o3deg4nis9'; // Replace with your Cognito App Client ID
  const redirectUri = encodeURIComponent('https://jennie-steel.vercel.app/auth/callback'); // Always use encodeURIComponent
  const cognitoDomain = 'https://philip.auth.eu-north-1.amazoncognito.com'; // Your Cognito domain
  
  const cognitoLoginUrl = `https://philip.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
  const cognitoLogin = useSelector((state) => state.cognitoLogin);
  const { userInfo: cognitoInfo } = cognitoLogin;

  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    const newErrors = {};
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const data = {
        password,
        confirm_password: confirmPassword,
        uidb64: uid,
        token,
      };

      dispatch(reset_password(data));
    }
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: "Password reset successful! Redirecting to sign in...",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        if (cognitoInfo) {
          window.location.reload();
        } else {
          navigate(cognitoLoginUrl);
        }
      }, 5000);
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [success, error, navigate, toast, cognitoInfo, cognitoLoginUrl]);

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Reset Password
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your new password below.
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl isInvalid={!!errors.password}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              New Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={showPassword ? "text" : "password"}
                variant="auth"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handlePasswordClick}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <Text color="red.500" fontSize="sm" mb="8px">
                {errors.password}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Re-enter your new password"
                mb="24px"
                size="lg"
                type={showConfirmPassword ? "text" : "password"}
                variant="auth"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={
                    showConfirmPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye
                  }
                  onClick={handleConfirmPasswordClick}
                />
              </InputRightElement>
            </InputGroup>
            {errors.confirmPassword && (
              <Text color="red.500" fontSize="sm" mb="8px">
                {errors.confirmPassword}
              </Text>
            )}
          </FormControl>

          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Reset Password
          </Button>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          maxW="100%"
          mt="0px"
        >
          <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Remembered your password?
            <span
              style={{ color: textColorBrand, cursor: 'pointer', marginLeft: '5px', fontWeight: 500 }}
              onClick={() => {
                if (cognitoInfo) {
                  window.location.reload();
                } else {
                  window.location.href = cognitoLoginUrl;
                }
              }}
            >
              Sign In
            </span>
          </Text>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ResetPassword;
