import React from "react";
import { getUsers } from "../../services/api";
import { Link } from "react-router-dom";
import { Flex, Box, Spinner, Container } from '@chakra-ui/react';
import Header  from "../../components/Header/Header";
import './HomeMaster.scss';
import { useEffect, useState } from "react";
import {
SimpleGrid,
Stack,
Text,
List,
ListItem,
Button,
ButtonGroup
} from '@chakra-ui/react';

export default function HomeMaster() {
    const [users, setUsers] = useState();
    const [spinner, setSpinner] = useState(false);

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


    return (

        <>
      
     <Flex  minHeight="100vh">   
     <Flex>
       <Header/>
     </Flex>

              <Container mt='155' maxW={'100ch'}>
               <h1>Meus Clientes</h1>
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
                                  <Stack direction={'row'} align={'center'} justify={'center'}>
                                  <Text fontSize='18px' fontWeight={600}>
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
                                        <Button colorScheme='blackAlpha'>Excluir</Button>
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
                </Flex>
        </>
    );
}