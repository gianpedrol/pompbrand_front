import React from "react";
import { getUsers, createNewUserApi, deleteUserApi } from "../../services/api";
import { Link } from "react-router-dom";
import { Flex, Box, Spinner, Container } from '@chakra-ui/react';
import Header  from "../../components/Header/Header";
import './HomeMaster.scss';
import { useEffect, useState } from "react";
import {
SimpleGrid,
Stack,
Text,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
useDisclosure,
Button,
ButtonGroup,
FormControl,
FormLabel,
FormErrorMessage,
Input,
useToast,
} from '@chakra-ui/react';

export default function HomeMaster() {
    const [users, setUsers] = useState();
    const toast = useToast();
    const [spinner, setSpinner] = useState(false);

    const [inputEmail, setInputEmail] = useState('')
    const [inputName, setInputName]  = useState('');
    const [inputCpf, setInputCpf]  = useState('');
    const [inputPhone, setInputPhone]  = useState('');

    const handleInputEmailChange = (e) => setInputEmail(e.target.value);
    const handleInputNameChange = (e) => setInputName(e.target.value);
    const handleInputCPFChange = (e) => setInputCpf(e.target.value);
    const handleInputPhoneChange = (e) => setInputPhone(e.target.value);
    const isError = inputEmail === '';

    const { isOpen, onOpen, onClose } = useDisclosure();


    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    async function getUsersList() {
      setSpinner(true);
      try {
        const users = await getUsers();               
        setUsers(users.data?.data);

      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setSpinner(false)
      }, 5000)  ;
    }
    
  useEffect(() => {

      getUsersList();

  }, []);

  async function createNewUser(){
    setSpinner(true);
    const data = {
      name : inputName,
      email : inputEmail,
      cpf : inputCpf,
      phone : inputPhone
     }
    try {
      const createNewPhase = await createNewUserApi(data);           
      
      if (createNewPhase.status === 200) {
        toast({
          title: 'Usuário criado com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }); 
        getUsersList()
      }  
    
      } catch (error) {
        toast({
          title: 'Deu algo errado',
          status: 'error',
          isClosable: true,
        })
      console.log(error);
    }      
    setTimeout(() => {
      setSpinner(false)
    }, 2000) ;
  }

  async function deleteUser(id){
    setSpinner(true);
    try {
      const deleteUser = await deleteUserApi(id);               
      
      if (deleteUser.status === 200) {
        toast({
          title: 'Usuário excluido!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }); 
        getUsersList();
        
      }  
    
      } catch (error) {
        toast({
          title: 'Deu algo errado',
          status: 'error',
          isClosable: true,
        })
      console.log(error);
    }      
    setTimeout(() => {
      setSpinner(false)
    }, 2000) ;

    setSpinner(false)
  }




    return (

        <>
      
     <Flex  minHeight="100vh">   
     <Flex>
       <Header/>
     </Flex>

              <Container mt='155' maxW={'110ch'}>
               <h1>Meus Clientes</h1>
               <ButtonGroup gap='4' mt='5'>
                    <Button onClick={onOpen} colorScheme='whatsapp'>Criar novo usuário</Button>
                </ButtonGroup>   
                <Box>                  
                <Box maxHeight='350px'>         
                          
                        
                       <SimpleGrid
                       width={'80vw'}
                       ml={0}
                        columns={3} 
                        spacing={10}  
 
                        >
                        {users?.map((user, index) => (   
                            <Box
                            m={6}
                            maxWidth={'98%'}
                              key={index}
                              bg={'white'}
                                boxShadow={'2xl'}
                              rounded={'md'}
                              overflow={'hidden'}>
                              <Stack
                                textAlign={'center'}
                                p={6}
                                color=""
                                align={'center'}>
                                <Stack direction={'column'} align={'center'} justify={'center'}>
                                  <Text fontSize='24px' fontWeight={800}>
                                  {user?.name}
                                  </Text>
                                <Stack direction={'row'} align={'center'} justify={'center'}  > 
                                
                                <Text fontSize='16px' fontWeight={600} p={2} >
                                  {user?.email}
                                  </Text>


                                
                                </Stack>

                              </Stack>                   
                              <Box  px={6} py={1}>
                                  <Box>
                                    <ButtonGroup gap='4' mt={2}>
                                        <Link to={`/user/${user?.id}`}>
                                              <Button
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
                                                  Ver 
                                              </Button>
                                          </Link>
                                        <Button colorScheme='blackAlpha' onClick={()=> deleteUser(user?.id)}>Excluir</Button>
                                      </ButtonGroup>
                                    </Box>
                                   </Box> 
                                  </Stack>
                              </Box>
                              ))}             
                        </SimpleGrid>  
                      </Box>               
                </Box>
              
                </Container>


                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Crie um novo usuário</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                      <FormControl isRequired isInvalid={isError}>
                        
                      <FormLabel pt={5}>Nome </FormLabel>
                        <Input
                        placeholder={inputName}
                        onChange={handleInputNameChange} />

                          <FormLabel pt={5}>Email</FormLabel>
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
                        <FormLabel pt={5}>CPF/CNPJ </FormLabel>
                        <Input
                        placeholder={inputCpf}
                        onChange={handleInputCPFChange} />

                        <FormLabel pt={5}>Telefone</FormLabel>
                            <Input
                            placeholder={inputPhone}
                            onChange={handleInputPhoneChange} />
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button onClick={()=>createNewUser()} mr={3}>
                          Criar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
        </>
    );
}