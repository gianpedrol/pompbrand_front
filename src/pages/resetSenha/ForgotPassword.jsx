import React,{useContext, useState} from "react";
import {forgotPasswordApi} from "../../services/api";
import '../login/login.scss';
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
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { AuthContext } from "../../contexts/Auth";
import Logo from '../../images/logo-sidebar.png'
import {useNavigate } from "react-router-dom";


const  ForgotPassword = () => {

  const {login, loading} = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
    const [email, setEmail] = useState("");

       async function SendForgotPassword(){
          const data = {
            email : email,
           }

          try {
            const ForgotPassword = await forgotPasswordApi(data);           
            if (ForgotPassword.status === 200) {
              toast({
                title: 'E-mail enviado com sucesso!',
                status: 'success',
                duration: 9000,
                isClosable: true,
              }); 
              navigate("/");
            }  
          
            } catch (error) {
              toast({
                title: 'Deu algo errado',
                status: 'error',
                isClosable: true,
              })
            console.log(error);
          }      
        }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg='#6E7C7C'>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>
          <img src={Logo} alt="" srcset="" />
            </Heading>
        </Stack>
        <Box
          as="form"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
              <FormControl id="email">
              <FormLabel>coloque seu email</FormLabel>
              <Input type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>             
              <Button
              onClick={() => SendForgotPassword()}
                bg='#B4FE5B'
                color='#6E7C7C'
                _hover={{
                  bg: '#6E7C7C',
                  color : 'white'
                }}>
                Solicitar Reset de Senha
              </Button>
            </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;