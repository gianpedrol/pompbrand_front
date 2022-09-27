import React, { useState, useEffect } from "react";
import Header  from "../../components/Header/Header";
import { getUserInfo, updateUserApi } from "../../services/api";
import { useParams } from "react-router-dom";
import {
    Flex,
    Box,
    Center,
    Text,
    Stack,
    Button,
    useToast,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
  } from '@chakra-ui/react';

export default function MyAccount(){
    const toast = useToast();
    const { id: userId } = useParams();
    const [spinner, setSpinner] = useState(false);
    const [user, setUser] = useState();

    const [inputEmail, setInputEmail] = useState('')
    const [inputName, setInputName]  = useState('');
    const [inputCpf, setInputCpf]  = useState('');
    const [inputPhone, setInputPhone]  = useState('');

    const handleInputEmailChange = (e) => setInputEmail(e.target.value);
    const handleInputNameChange = (e) => setInputName(e.target.value);
    const handleInputCPFChange = (e) => setInputCpf(e.target.value);
    const handleInputPhoneChange = (e) => setInputPhone(e.target.value);

    const isError = inputEmail === ''


    async function getUser() {
        setSpinner(true);
        try {
          const user = await getUserInfo(userId); 
          console.log(user);          
          setUser(user.data?.data);  
          setInputEmail(user.data?.data?.email);
          setInputName(user.data?.data?.name);
          setInputCpf(user.data?.data?.cpf);
          setInputPhone(user.data?.data?.phone)
          } catch (error) {
          console.log(error);
        }      
        setTimeout(() => {
          setSpinner(false)
        }, 2000) ;
      }


      
  useEffect(() => {
    getUser();
  }, [userId]);

  async function  updateUser(userId){
    const id = userId;
    const data = {
      name : inputName,
      email : inputEmail,
      cpf : inputCpf,
      phone : inputPhone
     }

    try {
      const userApi = await updateUserApi(id,data);               

      if (userApi.status === 200) {
       toast({
         title: 'Usuário Editado!',
         status: 'success',
         duration: 9000,
         isClosable: true,
       })
     }  
      } catch (error) {
       toast({
         title: 'Deu algo errado',
         status: 'error',
         isClosable: true,
       })
      console.log(error);
    }
    
    setSpinner(false)
 };
    return (

        <>
      
        <Flex width="100%" minHeight="100vh">   
        <Flex>
          <Header/>
        </Flex>

        <Flex>
        <Center py={6}>
            {user && (
                    <Box
                    maxW={'100vw'}
                    w={'80vw'}
                    mt={105}
                    ml={55}
                   
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Stack
                    textAlign={'center'}
                    p={6}
                    
                    align={'center'}>
                    <Stack direction={'row'} align={'center'} justify={'center'}>
                        <Text fontSize={'6xl'} fontWeight={800}>
                        {user.name}
                        </Text>
                    </Stack>
                    </Stack>

                    <Box px={6} py={10}> 




                        <FormControl isRequired isInvalid={isError}>
                          <FormLabel>Email</FormLabel>
                          <Input
                            type='email'
                            value={inputEmail}
                            onChange={handleInputEmailChange}
                          />
                          {!isError ? (
                            ''
                          ) : (
                            <FormErrorMessage>Email is required.</FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl isRequired>

                        <FormLabel pt={5}>Nome </FormLabel>
                        <Input
                        placeholder={inputName}
                        onChange={handleInputNameChange} />

                        <FormLabel pt={5}>CPF/CNPJ </FormLabel>
                        <Input
                        placeholder={inputCpf}
                        onChange={handleInputCPFChange} />

                        <FormLabel pt={5}>Telefone</FormLabel>
                            <Input
                            placeholder={inputPhone}
                            onChange={handleInputPhoneChange} />
                        </FormControl>


                    <Button
                        mt={10}
                        onClick={()=>updateUser(user.id)}
                        w={'full'}
                        bg={'green.400'}
                        color={'white'}
                        rounded={'xl'}
                        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                        _hover={{
                        bg: 'green.500',
                        }}
                        _focus={{
                        bg: 'green.500',
                        }}>
                        Atualizar informações
                    </Button>
                    </Box>
                    </Box>
            )}
               
                </Center>
        </Flex>
               
        </Flex>

      
       </>

    )
}