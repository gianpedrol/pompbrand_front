import React,{useContext, useState} from "react";
import {resetPasswordApi } from "../../services/api";
import '../login/login.scss';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  InputGroup,
  InputRightElement,
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
import {useNavigate, useSearchParams } from "react-router-dom";


const  ResetPassword = () => {

  const {login, loading} = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [searchParams] = useSearchParams({});
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const handleClick = () => setShow(!show)

       async function resetPassword(){

        if(password !== confirmPassword){
            toast({
                title: 'Senhas Não conferem',
                status: 'error',
                isClosable: true,
              })
        } else{
            const key = searchParams.get("key");
            const token = searchParams.get("token");
            const data = {
                key : key,
                token : token,
                password : password,
                password_confirmation : confirmPassword
               }
            try {
                const resetPassword = await resetPasswordApi(data);           
                if (resetPassword.status === 200) {
                  toast({
                    title: 'Senha Alterada com sucesso!',
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
          <label>Digite sua Senha</label>
          <InputGroup size='md'>
           
                <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
                </InputRightElement>
            </InputGroup>            
            </Stack>

            <Stack spacing={4} pt={5}>
          <label>Confirme sua Senha</label>
          <InputGroup size='md'>
           
                <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
                </InputRightElement>
            </InputGroup>            
              <Button
              onClick={() => resetPassword()}
                bg='#B4FE5B'
                color='#6E7C7C'
                _hover={{
                  bg: '#6E7C7C',
                  color : 'white'
                }}>
                Alterar Senha
              </Button>
            </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ResetPassword;