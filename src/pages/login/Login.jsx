import React from "react";
import './login.scss';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useToast } from '@chakra-ui/react'
export default function Login() {
  const toast = useToast();  
    const Login = async (data) => {
      try {
        const response = await api.post("/login", data)
        if (response.status === 200) {
          localStorage.setItem("authToken", response?.data?.token);
          toast({
            title: 'Usuário Logado!',
            description: "Aproveite nosso sistema.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
        return response;
      } catch (error) {
        JSON.stringify(error)
        console.log(error.data)
        toast({
          title: 'Deu algo errado',
          status: 'error',
          isClosable: true,
        })
        return error;
      }
    };
  
  return (
    <Flex
      maxH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              
              <Button
               onClick={Login}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

